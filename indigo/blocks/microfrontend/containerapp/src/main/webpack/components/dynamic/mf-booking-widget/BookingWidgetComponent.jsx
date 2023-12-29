import React, { useRef } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { bookingAppInit as booking } from "booking/BookingMainApp";
import {
	variationCodes,
	COOKIE_KEYS,
	localStorageKeys,
} from "../../../utils/constants/common";
import Cookies from "../../../utils/functions/cookies";
import * as Constants from "../../../utils/constants";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";
import { logEntry } from "../../../utils/functions/kibanaLog";
import {
	ifDeepLinkCall,
	getSrpDeeplinkParms,
	getPayloadFromDeepLinkData,
} from "./functions/utils";
import { setLocalStorage } from "../../../utils/storage";

const { BOOKING_BASE_URL, WIDGET_API, MS_BW_USER_KEY } = Constants;

// container should expose this variable in window object
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";

const localeValue = window.locale;
const ModifyBookingEvent = (config) =>
	new CustomEvent("ModifyBookingEvent", config);

const getFormatedCookie = (keyValue) => {
	return Cookies.get(keyValue) && typeof Cookies.get(keyValue) === "string"
		? JSON.parse(Cookies.get(keyValue))
		: Cookies.get(keyValue);
};

function BookingWidgetComponent(props) {
	const ref = useRef(null);
	const authTokenCookieValue = getFormatedCookie(COOKIE_KEYS.AUTH);
	const roleDetailCookieValue = getFormatedCookie(COOKIE_KEYS.ROLE_DETAILS);
	const [aemConfigData, setAemConfigData] = React.useState(null);
	const [widgetApiData, setWidgetApiData] = React.useState(null);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(false);
	const [authToken, setAuthToken] = React.useState(authTokenCookieValue);
	const [roleDetail, setRoleDetail] = React.useState(roleDetailCookieValue);

	const fetchWidgetData = () => {
		const apiPath = `${BOOKING_BASE_URL}${WIDGET_API}?roleName=${roleDetail?.roleName}&roleCode=${roleDetail?.roleCode}`;
		const widgetRequestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: authToken?.token,
				...(MS_BW_USER_KEY?.trim() ? { user_key: MS_BW_USER_KEY.trim() } : {}),
			},
		};
		fetch(apiPath, widgetRequestOptions)
			.then((response) => response.json())
			.then((res) => {
				if (res && res.data) {
					const resData = res.data;
					if (resData) {
						setWidgetApiData(resData);
						setRenderConfigDataFlag(true);
					}
				} else {
					// Adobe Analytic
					pushAnalytic({
						event: "bookingMFDataLoad",
						isLoaded: false,
						error: {
							code: "500",
							message: "AA: Something went wrong",
						},
					});
				}
			})
			.catch((err) => {
				// Adobe Analytic
				pushAnalytic({
					event: "bookingMFDataLoad",
					isLoaded: false,
					error: {
						code: "500",
						message: `AA: Something went wrong::: ${err}`,
					},
				});
			});
	};

	const fetchGraphQlData = () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};
		fetch(
			`${aemGraphQlEndpoint}/${props?.component};locale=${localeValue};variation=${props?.pageType};.json`,
			requestOptions
		)
			.then((response) => {
				if (!response.ok) {
					return Promise.reject(response);
				}
				return response.json();
			})
			.then((result) => {
				if (result) {
					setAemConfigData(result);
					setRenderConfigDataFlag(true);
				}
			})
			.catch((response) => {
				// console.log("Graph_QL_Error##", response);
				setAemConfigData(null);
				setRenderConfigDataFlag(true);

				let customMessage = JSON.parse(
					localStorage.getItem("generic_data_container_app")
				).info_errorMessageItemList.items[0]; // ERROR MESSAGE TO KIBANA

				let kibanObj = {
					url: response.url,
					displayMessage: customMessage.message, // custom message from localstorage if not avialble then API message
					errorType: "network", // Starting with 5x or 4x(API) -> API :: 5x or 4x(AEM) -> AEM
					errorCode: customMessage.code.toString(),
					errorMessage: "Failded from AEM Graph_QL for homepage", // API message after failing
					errorSource: "AEM", // type of error source tobe passed by developer.
					statusCode: response.status.toString(),
				};

				let errorOBJ = {
					apiURL: response.url,
					displayMessage: customMessage.message,
					statusMessage: "Failded from AEM Graph_QL for homepage ", // API message after failing
					code: customMessage.code.toString(),
					type: "network", // Starting with 5x or 4x(API) -> API :: 5x or 4x(AEM) -> AEM
					statusCode: response.status.toString(),
					source: "MS-API/AEM/MF",
				}; // log entry to Kibana
				logEntry(kibanObj);
				pushAnalytic({
					data: {
						_event: "pageload",
						isLoaded: true,
					},
					event: "click",
					error: { ...errorOBJ },
				});
			});
	};

	const fetchWidgetDataByDataAttribute = () => {
		const resData = JSON.parse(props.mfData)?.jsonResponse;
		if (resData && resData.data) {
			setWidgetApiData(resData.data);
			setRenderConfigDataFlag(true);
		} else {
			// Adobe Analytic

			pushAnalytic({
				event: "bookingMFDataLoad",
				isLoaded: false,
				error: {
					code: "500",
					message: "AA: Something went wrong",
				},
			});
		}
	};

	React.useEffect(() => {
		// call data from data attribute if home page
		if (
			props?.mfData &&
			props.pageType === variationCodes.HOME &&
			!widgetApiData
		) {
			fetchWidgetDataByDataAttribute();
		} else if (
			authToken &&
			roleDetail &&
			typeof authToken === "object" &&
			typeof roleDetail === "object" &&
			!widgetApiData
		) {
			const getBookingApiData = async () => {
				await fetchWidgetData();
			};
			getBookingApiData();
		} else {
			// error scenario - no token and no data attribute available
		}
	}, [authToken]);

	React.useEffect(() => {
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			booking(ref.current, {
				...props,
				configJson: aemConfigData,
				widgetApiData,
			});
			// Remove placeholder in home variation of booking widget
			if (!props?.pageType || props?.pageType === variationCodes.HOME) {
				let root = document.getElementsByClassName(
					"placeholder-booking-widget"
				)[0];
				if (root) {
					root.classList.remove("placeholder-booking-widget");
				}
			}
			setRenderConfigDataFlag(false);
		}

		// Deep linking SRP Flight Search. Booking context is set with Values from URL query params
		if (
			widgetApiData &&
			aemConfigData &&
			props?.pageType === variationCodes.SRP &&
			ifDeepLinkCall()
		) {
			// to do: get params from url
			const containerConfigData =
				aemConfigData?.data?.bookingWidgetList?.items[0]; // fixed keys for AEM GraphQL response
			const srpDeeplinkParams = getSrpDeeplinkParms(
				containerConfigData?.deepLinkData
			);
			const searchPayloadData = getPayloadFromDeepLinkData(
				srpDeeplinkParams,
				widgetApiData
			);
			if (!isEmpty(searchPayloadData)) {
				setLocalStorage(
					localStorageKeys.BOOKING_CONTEXT_VALUES,
					searchPayloadData
				);
				document.dispatchEvent(
					ModifyBookingEvent({
						bubbles: true,
						detail: { bookingData: searchPayloadData, token: authToken },
					})
				);
				const currentURLWithoutHash = window.location.href.split("#")[0];
				window.history.replaceState(
					null,
					document.title,
					currentURLWithoutHash
				);
			}
		}
	}, [aemConfigData, widgetApiData]);

	// For cookie set after the container has expose cookie in storage
	React.useEffect(() => {
		const getBookingAemData = async () => {
			await fetchGraphQlData();
		};
		getBookingAemData();
		document.addEventListener("authTokenSetEvent", (event) => {
			setAuthToken(event.detail.token);
			setRoleDetail(getFormatedCookie(COOKIE_KEYS.ROLE_DETAILS));
		});
		return () => {
			document.removeEventListener("authTokenSetEvent", {});
		};
	}, []);

	return <div ref={ref}></div>;
}

BookingWidgetComponent.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

BookingWidgetComponent.propTypes = {
	pageType: PropTypes.string,
	component: PropTypes.string,
};
export default BookingWidgetComponent;
