import { createRoot } from "react-dom/client";
import React, { useEffect, useState, useRef } from "react";
import NavigationButton from "./Component";
import { logoutCurrentUser } from "./microservices";
import { events } from "../../../utils/custom-events";
import Cookies from "../../../utils/functions/cookies";
import { COOKIE_KEYS } from "../../../utils/constants/common";
import { oldLogoutHandler } from "../../../utils/functions/userToken";

const prefix = "skyplus6e-header__";

const toggleLoginPopupEvent = (config) =>
	new CustomEvent(events.TOGGLE_LOGIN_POPUP, config);

const loginItemToggledEvent = (config) =>
	new CustomEvent(events.LOGIN_BUTTON_DROPDOWN_TOGGLED, config);

const userLogoutEvent = (config) =>
	new CustomEvent(events.LOGOUT_SUCCESS, config);

const genericToastMessageEvent = (config) =>
	new CustomEvent(events.GENERIC_TOAST_MESSAGE_EVENT, config);

const mainLoaderEvent = (data) => new CustomEvent("mainLoaderEvent", data);

const HeaderNavLoginSection = (props) => {
	let labels = {};
	const { mfData } = props;
	const [loggedIn, setLoggedIn] = useState(false);
	const [showLoggedInPopup, setShowLoggedInPopup] = useState(false);
	const prevloggedIn = useRef();
	try {
		labels = JSON.parse(mfData);
	} catch (exception) {
		labels = {};
	}

	let authUserCookie = Cookies.get(COOKIE_KEYS.USER, undefined, true) || null;
	if (authUserCookie) {
		try {
			authUserCookie = JSON.parse(authUserCookie);
		} catch (exception) {
			authUserCookie = {};
		}
	}

	const oldLogoutApiRespnse = async () => {
		try {
			const userType = Cookies.get(COOKIE_KEYS.PERSONA_TYPE);
			const oldLogoutAPI = await oldLogoutHandler(userType);
			return Promise.resolve(oldLogoutAPI);
		} catch (error) {
			console.log(error, "Error for old Member logout api");
			return Promise.reject("Error for old Member logout api");
		}
	};

	const logoutApiResponse = async () => {
		const userToken = Cookies.get(COOKIE_KEYS.AUTH);
		try {
			const skyplusLogoutApi = await logoutCurrentUser(
				JSON.parse(userToken)?.token
			);
			const skyplusLogoutApiResponse = skyplusLogoutApi.json();
			if (skyplusLogoutApiResponse) {
				if (
					skyplusLogoutApiResponse.status == 200 ||
					skyplusLogoutApiResponse.status == 440
				) {
					document.dispatchEvent(
						mainLoaderEvent({
							bubbles: true,
							detail: { isMainloader: false },
						})
					);
					const infoDetail = {
						type: "info",
						code: "Logout successful",
						title: "Info", // change title with error type like error,info
						message: "User logged out successfully",
					};
					document.dispatchEvent(
						genericToastMessageEvent({
							bubbles: true,
							detail: infoDetail,
						})
					);
					// document.dispatchEvent(userLogoutEvent({ bubbles: true }));
					return Promise.resolve(skyplusLogoutApi);
				}
			}
		} catch (error) {
			return Promise.reject("Error for Skyplus logout api");
		}
	};

	const closeMobNav = () => {
		const hideMenuButton = document.querySelector(`.${prefix}menu-close`);
		if (hideMenuButton) {
			const overlay = document.querySelector(`.${prefix}overlay`);
			const _overlay = document.querySelector(`.${prefix}overlay-menu`);
			const _bodyEle = document.body;
			if (overlay) {
				overlay.classList.remove("show");
			}
			if (_overlay) {
				_overlay.classList.remove("show");
				_bodyEle.classList.remove("mega-menu-open");
			}
			if (hideMenuButton.parentElement) {
				hideMenuButton.parentElement.classList.remove("animate");
				setTimeout(() => {
					hideMenuButton.parentElement.classList.remove("opened");
				}, 100);
			}
		}
	};

	const handleLogoutClick = (event) => {
		console.log("--event listed::::handleLogoutClick", event);
		document.dispatchEvent(
			mainLoaderEvent({
				bubbles: true,
				detail: { isMainloader: true },
			})
		);
		const userToken = Cookies.get(COOKIE_KEYS.AUTH);
		const userType = Cookies.get(COOKIE_KEYS.PERSONA_TYPE);
		// Todo : logout func refactor

		closeMobNav();

		Promise.all([logoutApiResponse(), oldLogoutApiRespnse()])
			.then(function (responses) {
				if (responses[0] && responses[1]) {
					const logoutDataAtt = JSON.parse(
						document
							.querySelector('[data-mf-id="login-navigation-dynamic"]')
							?.getAttribute("data-mf-data")
					);
					const logOutPath = logoutDataAtt?.logOutPath;
					const infoDetail = {
						type: "info",
						code: "Logout successful",
						title: "Info", // change title with error type like error,info
						message: "User logged out successfully",
					};
					document.dispatchEvent(
						genericToastMessageEvent({
							bubbles: true,
							detail: infoDetail,
						})
					);

					document.dispatchEvent(userLogoutEvent({ bubbles: true }));
					if (logOutPath) {
						setTimeout(() => {
							window.location.href = logOutPath;
						}, 3000);
					} else {
						setTimeout(() => {
							window.location.reload();
						}, 3000);
					}
				} else if (responses[0]) {
					const logoutDataAtt = JSON.parse(
						document
							.querySelector('[data-mf-id="login-navigation-dynamic"]')
							?.getAttribute("data-mf-data")
					);
					const logOutPath = logoutDataAtt?.logOutPath;
					const infoDetail = {
						type: "info",
						code: "Logout successful",
						title: "Info", // change title with error type like error,info
						message: "User logged out successfully",
					};
					document.dispatchEvent(
						genericToastMessageEvent({
							bubbles: true,
							detail: infoDetail,
						})
					);

					document.dispatchEvent(userLogoutEvent({ bubbles: true }));
					if (logOutPath) {
						setTimeout(() => {
							window.location.href = logOutPath;
						}, 3000);
					} else {
						setTimeout(() => {
							window.location.reload();
						}, 3000);
					}
				} else {
				}
			})
			.catch(function (error) {
				const logoutDataAtt = JSON.parse(
					document
						.querySelector('[data-mf-id="login-navigation-dynamic"]')
						?.getAttribute("data-mf-data")
				);
				const logOutPath = logoutDataAtt?.logOutPath;
				const infoDetail = {
					type: "info",
					code: "Logout successful",
					title: "Info", // change title with error type like error,info
					message: "User logged out successfully",
				};
				document.dispatchEvent(
					genericToastMessageEvent({
						bubbles: true,
						detail: infoDetail,
					})
				);
				document.dispatchEvent(userLogoutEvent({ bubbles: true }));
				if (logOutPath) {
					setTimeout(() => {
						window.location.href = logOutPath;
					}, 5000);
				} else {
					setTimeout(() => {
						window.location.reload();
					}, 5000);
				}
			});
	};

	const onClick = (event) => {
		if (event.target.dataset.noclick === "true") {
			event.target.dispatchEvent(loginItemToggledEvent({ bubbles: true }));
			event.target.classList.toggle("opened");
		} else if (event.target.href.endsWith("#")) {
			event.preventDefault();
			event.target.dispatchEvent(
				toggleLoginPopupEvent({ bubbles: true, detail: event.target.dataset })
			);
			closeMobNav();
		}
		const navanchors = document.querySelectorAll(`.${prefix}nav-item a`);
		for (let a of navanchors) {
			if (
				a.classList.contains(`${prefix}link-mobile`) &&
				!a.classList.contains(`${prefix}link-no-mobile`) &&
				a !== event.target
			) {
				a.classList.remove("opened");
			}
		}
	};

	const onClickButton = (event) => {
		event.stopPropagation();
		event.target.dispatchEvent(
			toggleLoginPopupEvent({ bubbles: true, detail: event.target.dataset })
		);
	};

	const toggleLoggedInPopup = (event) => {
		setShowLoggedInPopup((prev) => !prev);
	};

	const setLoggedInEvent = (event) => setLoggedIn((prev) => true);
	const setLoggedOutEvent = (event) => {
		setLoggedIn((prev) => false);
	};

	const onOutsideClickClose = (event) => {
		let prefix = ".skyplus6e-header__link-loggedin-container";
		let loggedinElement = document.querySelector(prefix);
		let optionslistElement = document.querySelector(prefix + "__options-list");
		if (
			loggedinElement &&
			loggedinElement.contains(event.target) &&
			!optionslistElement
		) {
		} else if (!(loggedinElement && loggedinElement.contains(event.target))) {
			setShowLoggedInPopup(false);
		}
	};

	useEffect(() => {
		if (authUserCookie && authUserCookie.name) {
			setLoggedIn((prev) => true);
		}
		document.addEventListener(events.LOGOUT_SUCCESS, setLoggedOutEvent);
		document.addEventListener(events.LOGIN_SUCCESS, setLoggedInEvent);
		document.addEventListener(
			events.HAMBURGER_LOGOUT_SUCCESS_EVENT,
			handleLogoutClick
		);
		document.addEventListener(
			events.QUERY_PARAM_LOGOUT_SUCCESS_EVENT,
			handleLogoutClick
		);
		return () => {
			document.removeEventListener(events.LOGOUT_SUCCESS, setLoggedOutEvent);
			document.removeEventListener(events.LOGIN_SUCCESS, setLoggedInEvent);
			document.removeEventListener(
				events.HAMBURGER_LOGOUT_SUCCESS_EVENT,
				handleLogoutClick
			);
			// document.removeEventListener(
			// 	events.QUERY_PARAM_LOGOUT_SUCCESS_EVENT,
			// 	handleLogoutClick
			// );
		};
	}, []);

	useEffect(() => {
		if (loggedIn !== prevloggedIn) {
			document.addEventListener("click", (event) => {
				onOutsideClickClose(event);
			});
			prevloggedIn.current = loggedIn;
		}
	}, [loggedIn]);

	return NavigationButton({
		labels,
		onClick,
		loggedIn,
		onClickButton,
		authUserCookie,
		handleLogoutClick,
		showLoggedInPopup,
		toggleLoggedInPopup,
		onOutsideClickClose,
	});
};

let rootElement = null;

export const headerNavLoginSection = (ele, props) => {
	if (ele !== undefined && ele !== null) {
		if (rootElement === null) {
			rootElement = createRoot(ele);
		}
		rootElement.render(<HeaderNavLoginSection {...props} />);
	}
};
