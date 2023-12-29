import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { events } from "../../../utils/custom-events";
import { getLocalStorage } from "../../../utils/storage";
import { localStorageKeys } from "../../../utils/constants/localStorageConstants";
// import { srpAppInit } from "srp/SearchResultsApp";
// import { passengerEditAppInit as passengerEdit } from "passengerEdit/PassengerEditApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";
import { PE_PAGETYPE } from "../../../utils/constants/common";

// Container should expose this variable in window object :: aemGraphqlApiEndpoint, localeValue
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: // : "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";
	  "http://localhost:4502/graphql/execute.json/skyplus6e";

const localeValue = window.locale;

const openUrlWithPostFormObj = (url, params = {}) => {
	let form = document.createElement("form");
	form.target = "_self";
	form.method = "POST";
	form.action = url;

	for (let i in params) {
		// eslint-disable-next-line no-prototype-builtins
		if (params.hasOwnProperty(i)) {
			let input = document.createElement("input");
			input.type = "hidden";
			input.name = i;
			input.value = params[i];
			form.appendChild(input);
		}
	}

	document.body.appendChild(form);
	form.submit();
};
export const getEnvObj = (key) => {
	const defaultObj = {};
	const envKey = key;
	try {
		return window[envKey] || defaultObj;
	} catch (error) {
		console.log(error);
		return defaultObj;
	}
};

function Payment(props) {
	const ref = useRef(null);
	const [aemConfigData, setAemConfigData] = React.useState(null);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(true);
	const [isHidden, setIsHidden] = React.useState(true);
	const [stepNo, setStepNo] = React.useState(4);

	useEffect(() => {
		document.addEventListener(events.INITIATE_PAYMENT, makeHoldPnr);
		document.addEventListener(
			"EVENT_PASSENGEREDIT_TOGGLE_LOADING",
			handleToggleLoadingEvent
		);
		return () => {
			document.removeEventListener(events.INITIATE_PAYMENT, makeHoldPnr);
		};
	}, []);

	React.useEffect(() => {
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			// passengerEdit(ref.current, { ...props, configJson: aemConfigData });
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	const handleToggleLoadingEvent = (event) => {
		if (!event?.detail.isLoading) {
			setIsHidden(false);
		} else {
			setIsHidden(true);
		}
		if (event?.detail?.paymentStepNumber) {
			setStepNo(event?.detail?.paymentStepNumber);
		}
	};

	const postDataToPaymentPage = (serverToken, refUrlPath, paymentNewUrl) => {
		// const paymentNewUrl = "https://comm-uat.goindigo.in/IndiGo-Dev2/Payment/SessionTransfer?v=2";
		let refUrlPathUpdated = refUrlPath || "";
		refUrlPathUpdated = refUrlPath.startsWith("/")
			? location.origin + refUrlPath
			: refUrlPath;
		const formDataObj = {
			"indigoSessionTransfer.apiToken": serverToken,
			"indigoSessionTransfer.refUrl": refUrlPathUpdated,
			"indigoSessionTransfer.skyplusBookingComment": "",
		};
		const alreadyFiledSpecialFareDataFromStorage = getLocalStorage(
			localStorageKeys.SPECIALFARE_ID_DATA
		);
		if (alreadyFiledSpecialFareDataFromStorage?.commentText) {
			formDataObj["indigoSessionTransfer.skyplusBookingComment"] =
				alreadyFiledSpecialFareDataFromStorage?.commentText;
		}
		openUrlWithPostFormObj(paymentNewUrl, formDataObj);
	};

	const makeNewPaymentFlow = (eventPassData, refUrlPath, redirectUrl) => {
		let getserverTokenUrl =
			"https://api-dev-session-skyplus6e.goindigo.in/v1/token/get";
		let getserverTokenUrlKey = "6ef12f4a8299c033c68a4431daf670e1";

		const envObj = getEnvObj("_env_login");
		if (Object.keys(envObj).length > 0 && envObj.BASE_API_URL) {
			getserverTokenUrl = `${envObj.BASE_API_URL}/v1/token/get`;
			getserverTokenUrlKey = envObj.CONTENT_TYPE_HEADER?.user_key;
		}

		const requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
				Authorization: eventPassData.token,
				user_key: getserverTokenUrlKey,
			},
		};
		fetch(getserverTokenUrl, requestOptions)
			.then((response) => response.json())
			.then((result) => {
				console.log("---getserverContext API:::::", result);
				const serverToken = result?.data?.serverContext?.token || "";
				postDataToPaymentPage(serverToken, refUrlPath, redirectUrl);
			});
	};

	const makeHoldPnr = (event) => {
		const isBookingFlow = window.pageType === PE_PAGETYPE;
		console.log("---event Listen::::::::::::::::", event);
		const eventPassData = event?.detail || {};
		const envObj = getEnvObj("_env_passenger_edit");
		if (!eventPassData.token) return;
		// const holdUrl = "https://api-dev-itinerary-save-skyplus6e.goindigo.in/v1/booking/hold";
		// const holdUrl = "https://skyplus-dev.goindigo.in/ItinerarySave_SkyPlus/v1/booking/Hold";
		let holdurl = "";
		let userKey = "";
		if (Object.keys(envObj).length > 0 && envObj.API_HOLD_URL) {
			holdurl = envObj.API_HOLD_URL;
			userKey = envObj.USERKEY_HOLD_URL;
		} else if (location.origin.includes("qa")) {
			holdurl =
				"https://api-qa-itinerary-save-skyplus6e.goindigo.in/v1/booking/hold";
			userKey = "c5d5ef6951133b7cf43adfbb5c97e270";
		} else {
			holdurl =
				"https://api-dev-itinerary-save-skyplus6e.goindigo.in/v1/booking/hold";
			userKey = "dcf2213daf978fddf6ca759aa58dbf33";
		}
		const payload = {
			notifyContact: true,
			comments: [
				{
					type: "Default",
					text: "Updating 2March,2023",
				},
			],
		};
		var requestOptions = {
			method: "POST",
			body: JSON.stringify(payload),
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
				Authorization: eventPassData.token,
				user_key: userKey,
			},
		};
		// let redirectUrl = `https://comm-uat.goindigo.in/IndiGo-Dev2/Booking/PaymentDeepLinkApp?pl=${plKey}
		// &refurl=https://aem-preprod-skyplus6e.goindigo.in/content/skyplus6e/in/en/booking/itinerary.html`;
		let redirectUrl = `https://comm-uat.goindigo.in/IndiGo-Dev2/Booking/PaymentDeepLinkApp?pl=`;
		let refUrlPath = location.origin + "/booking/itinerary";
		const dataFromAEM = window.msd || {};
		if (dataFromAEM.paymentPagePath) {
			redirectUrl = dataFromAEM.paymentPagePath;
		}
		if (eventPassData?.refUrl) {
			refUrlPath = eventPassData?.refUrl;
		} else if (dataFromAEM.itineraryPagePath) {
			refUrlPath = dataFromAEM.itineraryPagePath;
		}
		if (isBookingFlow) {
			if (refUrlPath?.includes("?")) {
				refUrlPath += `&isBookingFlow=1`;
			} else {
				refUrlPath += `?isBookingFlow=1`;
			}
		}
		const url = new URL(redirectUrl);
		const version = url.searchParams.get("v");
		const isNewFlow = version === "2";
		console.log("--->", isNewFlow, version, redirectUrl);

		if (isNewFlow) {
			makeNewPaymentFlow(eventPassData, refUrlPath, redirectUrl);
		} else {
			fetch(holdurl, requestOptions)
				.then((response) => response.json())
				.then((result) => {
					console.log("---json hold::::", result);
					const plKey = result?.data?.bookingDetail?.pl || "";
					if (!plKey) {
						return;
					}
					redirectUrl += plKey + `&refurl=${refUrlPath}`;
					window.open(redirectUrl, "_self");
				})
				.catch((e) => {
					pushAnalytic({
						event: "error",
						error: {
							code: "500",
							message: e.message,
							url: holdurl,
							type: "api",
							source: "api",
							statusCode: "500",
							statusMessage: e.message,
						},
					});
				});
		}
	};

	return (
		<div ref={ref}>
			<p
				className={`payment-app-container ${
					isHidden ? "payment-app-displaynone" : ""
				}`}
				id="paymentapp-expand-collapse"
			>
				{stepNo}. Payment
			</p>
		</div>
	);
}

Payment.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default Payment;
