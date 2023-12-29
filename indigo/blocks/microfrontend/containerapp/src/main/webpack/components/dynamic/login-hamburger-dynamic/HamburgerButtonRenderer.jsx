import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import { events } from "../../../utils/custom-events";
import Cookies from "../../../utils/functions/cookies";
import HamburgerButton from "./HamburgerButtonComponent";
import { COOKIE_KEYS } from "../../../utils/constants/common";

let rootElement = null;
const toggleLoginPopupEvent = (config) =>
	new CustomEvent(events.LOGIN_BUTTON_DROPDOWN_TOGGLED, config);

const mainLoaderEvent = (data) => new CustomEvent("mainLoaderEvent", data);

const HeaderHamburgerButton = (props) => {
	const { mfData } = props;
	const [loggedIn, setLoggedIn] = useState();
	let labels = {};

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

	const onClick = (event) => {
		if (event.target.href.endsWith("#")) {
			event.preventDefault();
			event.target.dispatchEvent(
				toggleLoginPopupEvent({ bubbles: true, detail: event.target.dataset })
			);
		}
	};

	useEffect(() => {
		if (authUserCookie && authUserCookie.name) {
			setLoggedIn((prev) => true);
		}
		document.addEventListener(events.LOGIN_SUCCESS, (event) => {
			setLoggedIn((prev) => true);
		});
		document.addEventListener(events.LOGOUT_SUCCESS, (event) => {
			setLoggedIn((prev) => false);
		});
	}, []);

	return HamburgerButton({ labels, loggedIn, onClick, authUserCookie });
};

export const headerHamburgerButton = (ele, props) => {
	if (ele !== undefined && ele !== null) {
		if (rootElement === null) {
			rootElement = createRoot(ele);
		}
		rootElement.render(<HeaderHamburgerButton {...props} />);
	}
};
