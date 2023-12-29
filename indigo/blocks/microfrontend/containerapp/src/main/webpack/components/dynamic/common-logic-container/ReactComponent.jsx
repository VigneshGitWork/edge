import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { events } from "../../../utils/custom-events";
import Cookies from "../../../utils/functions/cookies";
import {
	BASE_API_URL,
	BASE_API_URL_OLD,
	KEEP_ALIVE_AUTH_TOKEN_OLD,
	CONTENT_TYPE_HEADER,
	KEEP_ALIVE_AUTH_TOKEN,
	TOGGLE_LOGIN_POPUP,
	SUB_BASE_API_URL_OLD,
	ANONYMOUS,
} from "../../../utils/constants";
import {
	COOKIE_KEYS,
	REFRESH_TOKEN_IDLE_TIME,
	localStorageKeys,
	variationCodes,
} from "../../../utils/constants/common";
import {
	isTokenExpired,
	addExpirationDataToToken,
} from "../../../utils/functions/userToken";
import {
	getParameterByName,
	getPersonaBasedLogoRedirectHomePage,
	removeParam,
} from "../../../utils/functions/utils";

import {
	isExternal,
	setAnonymousAuth,
	setAuthTokenCookie,
	setAuthTokenCookieForOldSession,
} from "./helpers";
import { setLocalStorage, removeLocalStorage } from "../../../utils/storage";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";
import { getErrorMsgForCode } from "../../../utils/functions/errorHandling";
import PopUpModal from "../popUpModal/popUpModal";
import { createPortal } from "react-dom";
import { gtmPushAnalytic } from "../../../utils/functions/gtmAnalyticEvents";
const logoutSuccessEvent = (eventData) =>
	new CustomEvent(events.LOGOUT_SUCCESS, eventData);

const genericToastMessageEvent = (eventData) =>
	new CustomEvent("genericToastMessageEvent", eventData);
const hurryupSessionEvent = (eventData) =>
	new CustomEvent("hurryupSessionEvent", eventData);
const sessionTokenExpiredEvent = (eventData) =>
	new CustomEvent("sessionTokenExpiredEvent", eventData);

const queryParameterLogoutEvent = (config) =>
	new CustomEvent(events.QUERY_PARAM_LOGOUT_SUCCESS_EVENT, config);
const mainLoaderEvent = (data) => new CustomEvent("mainLoaderEvent", data);

const CommonLogicContainer = (props) => {
	const tokenRefreshTimeoutRef = useRef(null);
	const authChannelRef = useRef(null);
	const [token, setToken] = useState(Cookies.get(COOKIE_KEYS.AUTH, true));
	const [loggedAuthData, setLoggedAuthData] = useState(
		Cookies.get(COOKIE_KEYS.USER, true, true)
	);
	const [isNoDataFoundForPage, setIsNoDataFoundForPage] = useState(false);
	const logoutQueryParam = getParameterByName("status");
	const { pageType = "" } = window;
	const isNoDataPopupCheckRequired = window.disableDirectAccess;
	const isHomePage = [variationCodes.HOME].includes(pageType);
	let timoutRef = null;

	React.useEffect(() => {
		async function queryParameterLogout() {
			// remove parameter if logout call is triggered once
			// removeParam("status");

			await setTimeout(() => {
				/** Broadcasting a message to other tabs */
				authChannelRef?.current &&
					authChannelRef.current.postMessage("logout-complete");
				document.dispatchEvent(queryParameterLogoutEvent({ bubbles: true }));
			}, 300);
		}
		const authUser = Cookies.get(COOKIE_KEYS.USER, undefined, true);
		// trigger Logout if query parameter available
		if (logoutQueryParam === "logout" && authUser && token) {
			queryParameterLogout();
		}
	}, [logoutQueryParam]);

	const refreshOldLoginToken = async (authToken) => {
		const aemOrgCurrency = Cookies.get(COOKIE_KEYS.AEM_ORG_CURRENCY);
		const aemOrgRole = Cookies.get(COOKIE_KEYS.AEM_ORG_ROLE);
		const roleName = Cookies.get(COOKIE_KEYS.ROLE); // aemLoginStatus
		if (roleName) {
			// let url = "";
			// let flightIndexAem = "";
			let flightSessionAPI = ""; // TODO - we will remove this api call after mid of June,2023[discuss with Vignesh,Kalimuthu,Harender to remove]
			// let memberJsonAPI = ""; // TODO - we will remove this api call after mid of June,2023[discuss with Vignesh,Kalimuthu,Harender to remove]
			if (SUB_BASE_API_URL_OLD) {
				// url = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}${KEEP_ALIVE_AUTH_TOKEN_OLD}`;
				// flightIndexAem = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}/Flight/IndexAEM`;
				flightSessionAPI = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}/Flight/Session`;
				// memberJsonAPI = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}/Member/GetMemberJson`;
			} else {
				// url = `${BASE_API_URL_OLD}${KEEP_ALIVE_AUTH_TOKEN_OLD}`;
				// flightIndexAem = `${BASE_API_URL_OLD}/Flight/IndexAEM`;
				flightSessionAPI = `${BASE_API_URL_OLD}/Flight/Session`;
				// memberJsonAPI = `${BASE_API_URL_OLD}/Member/GetMemberJson`;
			}

			try {
				/* const apiResponse = await axios.get(url, { withCredentials: true });
				const flightIndexAemApiResponse = await axios.get(flightIndexAem, {
					withCredentials: true,
				});
				const memberJsonAPIApiResponse = await axios.get(memberJsonAPI, {
					withCredentials: true,
				}); */
				const apiFlightSessionResponse = await axios.post(
					flightSessionAPI,
					"{}",
					{ withCredentials: true }
				);
				// withCredentials will enable the cookies to be passed in the request header
				console.log(
					"--->>",
					// apiResponse,
					// flightIndexAemApiResponse,
					// memberJsonAPIApiResponse,
					apiFlightSessionResponse
				);
				const object = {
					token: authToken?.token || "",
					idleTimeoutInMinutes:
						authToken?.idleTimeoutInMinutes || REFRESH_TOKEN_IDLE_TIME,
				};
				const _token = addExpirationDataToToken(object);
				setAuthTokenCookieForOldSession(
					_token,
					roleName,
					aemOrgCurrency,
					aemOrgRole
				);
				// }
			} catch (error) {
				// showErrorToast("", REFRESH_TOKEN_API_ERROR_MSG);
				console.log("OLDLOGIN_REFRESH_ERROR ###", error);
			}
		}
	};

	const refreshToken = async (authToken) => {
		const roleDetails = Cookies.get(COOKIE_KEYS.ROLE_DETAILS, true);
		const user = Cookies.get(COOKIE_KEYS.USER, true, true);
		const url = `${BASE_API_URL}${KEEP_ALIVE_AUTH_TOKEN}`;
		try {
			const apiResponse = await axios.put(url, "{}", {
				headers: {
					authorization: authToken.token,
					...CONTENT_TYPE_HEADER,
				},
			});
			if (
				apiResponse &&
				apiResponse.data &&
				apiResponse.data.data &&
				apiResponse.data.data.success
			) {
				const object = {
					token: authToken?.token || "",
					idleTimeoutInMinutes:
						authToken?.idleTimeoutInMinutes || REFRESH_TOKEN_IDLE_TIME,
				};
				const _token = addExpirationDataToToken(object);
				const { roleName = "", roleCode = "" } = roleDetails;
				setAuthTokenCookie(_token, roleName, roleCode, user);
			}
		} catch (error) {
			/** Removing this error toast as it is not needed here */
			// showErrorToast("", REFRESH_TOKEN_API_ERROR_MSG);
		}
	};

	useEffect(() => {
		// handleNoDataPopupLogic();
		const authUser = Cookies.get(COOKIE_KEYS.USER, undefined, true);
		const onLoginSuccess = (event) => {
			document.dispatchEvent(
				mainLoaderEvent({
					bubbles: true,
					detail: { isMainloader: true },
				})
			);
			const { user, token, roleName, roleCode } = event.detail;
			if (token && token.token) {
				const _token = addExpirationDataToToken(token.token);
				setAuthTokenCookie(_token, token?.roleName, token?.roleCode, user);
				setToken(_token);
				const name = "Hi, " + user?.name?.first + " " + user?.name?.last;
				const infoDetail = {
					type: "info",
					code: "Login successful",
					title: name, // change title with error type like error,info
					message: "User logged in successfully",
				};
				document.dispatchEvent(
					genericToastMessageEvent({
						bubbles: true,
						detail: infoDetail,
					})
				);

				// Set indigo Cash  if available in response
				const accountDetails = token?.accountDetails;
				if (accountDetails) {
					setLocalStorage(
						localStorageKeys.USER_ACCOUNT_DETAILS,
						accountDetails
					);
				}
				/** Broadcasting a message to other tabs */
				authChannelRef.current.postMessage("login-complete");
			}
		};

		const onLogoutSuccess = (event) => {
			Cookies.remove(COOKIE_KEYS.USER);
			Cookies.remove(COOKIE_KEYS.AUTH);
			Cookies.remove(COOKIE_KEYS.ROLE_DETAILS);
			Cookies.remove(COOKIE_KEYS.ROLE);
			Cookies.remove(COOKIE_KEYS.PERSONA_TYPE);
			removeLocalStorage(localStorageKeys.USER_ACCOUNT_DETAILS);
			/** Broadcasting a message to other tabs */
			authChannelRef.current.postMessage("logout-complete");
		};

		document.addEventListener(events.LOGIN_SUCCESS, onLoginSuccess);
		document.addEventListener(events.LOGOUT_SUCCESS, onLogoutSuccess);

		// If user cookie missing generate anonymous token
		if (!authUser) {
			if (token) {
				if (isTokenExpired(token)) {
					setAnonymousAuth().then((response) => {
						if (response && response.data && response.data.token) {
							const token = addExpirationDataToToken(response.data.token);
							setAuthTokenCookie(
								token,
								response.data?.roleName,
								response.data?.roleCode
							);
							setToken(token);
						}
					});
				}
			} else {
				setAnonymousAuth().then((response) => {
					if (response && response.data && response.data.token) {
						const token = addExpirationDataToToken(response.data.token);
						setAuthTokenCookie(
							token,
							response.data?.roleName,
							response.data?.roleCode
						);
						setToken(token);
					}
				});
			}
		}

		document.addEventListener(
			TOGGLE_LOGIN_POPUP,
			(event) => {
				const {
					detail: { loginType },
				} = event;
				if (loginType === "loginPopupClosed") {
					document.querySelector("body").classList.remove("mega-menu-open");
				} else {
					document.querySelector("body").classList.add("mega-menu-open");
				}
			},
			true
		);

		// Analytic Event
		let { pageType = "" } = window;
		pageType ||=
			window.location.href
				.split("/")
				.pop()
				.replace(".html", "")
				.split("?")[0] || "";
		if (
			[
				variationCodes.HOME,
				variationCodes.SALE,
				variationCodes.HYDERABAD_EVENT,
			].includes(pageType)
		) {
			console.log(
				`%c LOG:: ${pageType} loaded ${new Date().toLocaleString()}`,
				"border: 1px solid #222; color: #f48225"
			);

			const { _satellite, adobeDataLayer, dataLayer } = window;
			if (_satellite && adobeDataLayer) {
				pushAnalytic({
					event: "pageload",
					error: {},
				});
			} else {
				const pageLoadInterval = setInterval(() => {
					const { _satellite, adobeDataLayer } = window;
					if (_satellite && adobeDataLayer) {
						pushAnalytic({
							event: "pageload",
							error: {},
						});
						clearInterval(pageLoadInterval);
					}
				}, 500);
			}
		}
		try {
			let previousUrls = sessionStorage.getItem("prevUrls");
			previousUrls = previousUrls && JSON.parse(previousUrls);
			if (previousUrls) {
				if (previousUrls.length > 2) {
					previousUrls = previousUrls.slice(previousUrls.length - 2);
				}
				previousUrls.push(document.location.pathname);
			} else {
				previousUrls = [];
				previousUrls.push(document.location.pathname);
			}
			sessionStorage.setItem("prevUrls", JSON.stringify(previousUrls));
		} catch (err) { }
		const { dataLayer } = window;
		if (dataLayer) {
			gtmPushAnalytic({
				event: "pageload",
				error: {},
			});
		} else {
			const gtmPageLoadInterval = setInterval(() => {
				const { dataLayer } = window;
				if (dataLayer) {
					gtmPushAnalytic({
						event: "pageload",
						error: {},
					});
					clearInterval(gtmPageLoadInterval);
				}
			}, 500);
		}
		return () => {
			clearTimeout(tokenRefreshTimeoutRef.current);
			document.removeEventListener(events.LOGIN_SUCCESS, onLoginSuccess);
			document.removeEventListener(events.LOGOUT_SUCCESS, onLogoutSuccess);
		};
	}, []);

	const callIndexAEM = async () => {
		let flightIndexAem = "";
		if (SUB_BASE_API_URL_OLD) {
			flightIndexAem = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}/Flight/IndexAEM`;
		} else {
			flightIndexAem = `${BASE_API_URL_OLD}/Flight/IndexAEM`;
		}
		await axios.get(flightIndexAem, {
			withCredentials: true,
		});
	};

	useEffect(() => {
		// if the token is available refresh it +15mins
		if (token && token.token) {
			refreshToken(token);
		}
		const BAULoggedInUserRole = Cookies.get(COOKIE_KEYS.ROLE);
		const BAUOrgRole = Cookies.get(COOKIE_KEYS.AEM_ORG_ROLE);
		if (BAULoggedInUserRole && BAUOrgRole) {
			refreshOldLoginToken(token);
		}
		if (pageType === variationCodes.SRP) {
			callIndexAEM();
		}

		/*
		if (
			[variationCodes.SRP, variationCodes.PASSENGER_EDIT].includes(pageType)
		) {
			validateBAUSession();
		}
		*/
		/** Logout Broadcase channel for posting message to other tabs */
		authChannelRef.current = new BroadcastChannel("authChannel");
		authChannelRef.current.onmessage = () => {
			window.location.reload();
		};

		// Clean up the logout channel when the component unmounts
		return () => {
			authChannelRef.current.close();
		};
	}, []);

	useEffect(() => {
		clearTimeout(tokenRefreshTimeoutRef.current);
		if (token && token.token) {
			const authUser = Cookies.get(COOKIE_KEYS.USER, undefined, true);
			if (authUser && isTokenExpired(token)) {
				// delete the user details and fetch auth token for anonymous user
				document.dispatchEvent(logoutSuccessEvent({ bubbles: true }));
				setAnonymousAuth().then((response) => {
					if (response && response.data && response.data.token) {
						const token = addExpirationDataToToken(response.data.token);
						setAuthTokenCookie(
							token,
							response.data?.roleName,
							response.data?.roleCode
						);
						setToken(token);
					}
				});
			}
			bindHomePageTimout();
		}

		/** ExternalApp - expose - START */
		const roleDetails = Cookies.get(COOKIE_KEYS.ROLE_DETAILS, true);
		const { roleName = "", roleCode = "" } = roleDetails || {};
		if (!window.skp) window.skp = {};
		window.skp.getSessionData = () => {
			return {
				rolename: roleName || "",
				rolecode: roleCode || "",
				token: token || {},
			};
		};
		window.skp.refreshtoken = () => refreshToken(token);
		/** ExternalApp - expose - END */
	}, [token]);

	const [showPopUp, setShowPopUp] = useState(false);
	const [url, setUrl] = useState("");
	const onClosePopup = () => {
		setShowPopUp(false);
	};
	useEffect(() => {
		try {
			const genericData = JSON.parse(
				localStorage.getItem("generic_data_container_app")
			).mainGenericDataList; // Get generic data for container app
			const isDisablePopup =
				genericData?.items &&
				genericData?.items[0]?.genericData &&
				genericData?.items[0]?.genericData[0]?.disablePopUp;
			document.addEventListener("click", function (event) {
				const aElem = event.target.closest("a");
				if (aElem) {
					if (
						isExternal(aElem.href) &&
						aElem.className !== "btn-dir" &&
						!isDisablePopup
					) {
						event.preventDefault();
						setUrl(aElem.href);
						setShowPopUp(true);
					}
				}
			});
		} catch (error) {
			console.log("---useEffect call", error);
		}
		initiateHurryUpTimer();
	}, []);

	const initiateHurryUpTimer = () => {
		const timeOutMinute =
			(token?.validTillMilliSeconds - new Date().getTime()) / 60000;
		const showPopupRemaningMinute = timeOutMinute - 2;
		setTimeout(() => {
			// dispatch
			document.dispatchEvent(
				hurryupSessionEvent({
					bubbles: true,
					detail: {
						type: "popup",
						status: "show",
					},
				})
			);
		}, showPopupRemaningMinute * 60 * 1000);
		console.log("---initiate:::::", timeOutMinute);
	};

	// const handleNoDataPopupLogic = () => {
	// 	console.log("----record::::::::::::", isNoDataFoundForPage);
	// 	if (isNoDataPopupCheckRequired) {
	// 		const skyplusToken = token?.token;
	// 		if (!skyplusToken) {
	// 			setIsNoDataFoundForPage(true);
	// 		}
	// 	}
	// };

	// this method will get called from event where the authToken Cookie has set
	const bindHomePageTimout = () => {
		if (token?.validTillMilliSeconds) {
			let timeOutMinute =
				(token?.validTillMilliSeconds - new Date().getTime()) / 60000;
			setLoggedAuthData(Cookies.get(COOKIE_KEYS.USER, true, true));
			console.log("---timer on for bindHomePageTimout", timeOutMinute, token);
			clearTimeout(timoutRef);
			timoutRef = setTimeout(function () {
				console.log(
					"-timeOutMinute:::ref:::",
					loggedAuthData,
					pageType,
					window,
					".........."
				);
				if (
					loggedAuthData?.customerNumber &&
					(pageType === variationCodes.HOME || window?.disableDirectAccess)
				) {
					setIsNoDataFoundForPage(true);
				} else if (pageType === variationCodes.HOME || !pageType) {
					location.reload();
				}
				// External app purpose - START
				// we are dispatching event once token expired.
				document.dispatchEvent(
					sessionTokenExpiredEvent({
						bubbles: true,
						detail: {
							from: "skp",
						},
					})
				);
				// External app purpose - END
			}, timeOutMinute * 60 * 1000);
		}
	};

	// validate BAU session expired and skyplus is active
	const validateBAUSession = () => {
		const skyplusUserCookie = Cookies.get(COOKIE_KEYS.ROLE_DETAILS, true);
		const skyplusRoleName = skyplusUserCookie?.roleName || "";
		const BAULoggedInUserRole = Cookies.get(COOKIE_KEYS.ROLE);
		const isNotAnonymous =
			skyplusRoleName?.toLowerCase() !== ANONYMOUS?.toLowerCase();
		console.log(
			"---validateBAUSession:::::",
			isNotAnonymous,
			skyplusRoleName,
			BAULoggedInUserRole
		);
		if (
			skyplusRoleName &&
			isNotAnonymous &&
			skyplusRoleName !== BAULoggedInUserRole
		) {
			console.log("validateBAUSession:::stage000");
			// if skyplus rolename present and BAU rolename not present then we have to logged
			setTimeout(
				() =>
					document.dispatchEvent(queryParameterLogoutEvent({ bubbles: true })),
				300
			);
		}
	};

	const renderNoDataPopup = () => {
		const config = {
			title: "No Data Available",
			desc: "You will be redirected to Home Page.",
			buttonLabel: "Ok",
			onClose: () => {
				location.href = "/";
			},
		};
		if (isHomePage) {
			const homeSessionExpiredMsg = getErrorMsgForCode("homeSessionExpiredMsg");
			config.title = homeSessionExpiredMsg.type || "";
			config.desc =
				homeSessionExpiredMsg.message || "Session Expired, Please login again";
			config.onClose = () => {
				window.location.reload();
			};
		}
		return (
			<div className="common-logic-container-popup">
				<div className="common-logic-container-popup__overlay">
					<div className="common-logic-container-popup__content">
						<div className="common-logic-container-popup__header">
							<button
								className="popup-modal-with-content__close-overlay-button "
								onClick={config.onClose}
							>
								<i
									className="popup-modal-with-content__close-overlay-button__icon 
					skp-iconmoon-icon popup-modal-with-content__close-overlay-button__icon--close"
								></i>
							</button>
						</div>
						<div className="common-logic-container-popup__container-content common-logic-info">
							<h3 className="common-logic-info__heading">{config.title}</h3>
							<div className="common-logic-info__content">{config.desc}</div>
						</div>
						<div className="buttonRight">
							<button
								type="button"
								className="custom-button custom-button"
								onClick={config.onClose}
							>
								<span className="custom-button__label">
									{config.buttonLabel}{" "}
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			{isNoDataFoundForPage ? renderNoDataPopup() : null}
			{showPopUp &&
				createPortal(
					<PopUpModal onClosePopup={onClosePopup} url={url} />,
					document.querySelector("body")
				)}
		</>
	);
};

export default CommonLogicContainer;
