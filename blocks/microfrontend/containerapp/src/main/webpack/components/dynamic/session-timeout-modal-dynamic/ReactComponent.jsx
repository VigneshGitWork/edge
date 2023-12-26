/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import sessionTimeoutModalRenderer from "./SessionTimeoutModalRenderer";
import { getPersonaBasedLogoRedirectHomePage } from "../../../utils/functions/utils";
import Cookies from "../../../utils/functions/cookies";
import {
	BASE_API_URL,
	CONTENT_TYPE_HEADER,
	KEEP_ALIVE_AUTH_TOKEN,
} from "../../../utils/constants";
import {
	COOKIE_KEYS,
	REFRESH_TOKEN_API_ERROR_MSG,
	REFRESH_TOKEN_IDLE_TIME,
} from "../../../utils/constants/common";
import { addExpirationDataToToken } from "../../../utils/functions/userToken";
import { getErrorMsgForCode } from "../../../utils/functions/errorHandling";
import { setAuthTokenCookie } from "../common-logic-container/helpers";

function ReactComponent(props) {
	const { mfData } = props;
	const ref = useRef(null);
	const timeoutRef = useRef(null);
	const [showSessionTimeoutModal, setShowSessionTimeoutModal] = useState(false);

	const genericToastMessageEvent = (eventData) =>
		new CustomEvent("genericToastMessageEvent", eventData);

	let labels = {};
	try {
		labels = JSON.parse(mfData);
	} catch (ex) {
		labels = {};
	}

	const initTimeout = (timeoutDelay = 0.2) => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
		timeoutRef.current = setTimeout(() => {
			setShowSessionTimeoutModal((prev) => true);
		}, timeoutDelay * 60 * 1000);
	};

	const initTimeoutWithTimeoutDuration = () => {
		const timeoutDuration = parseInt(labels?.sessionTimeoutDuration);
		initTimeout(timeoutDuration);
	};

	const showErrorToast = (code, message) => {
		const infoDetail = {
			type: "error",
			code,
			title: "Error",
			message,
		};
		document.dispatchEvent(
			genericToastMessageEvent({
				bubbles: true,
				detail: infoDetail,
			})
		);
		setTimeout(() => {
			window.location.href = getPersonaBasedLogoRedirectHomePage();
		}, 3000);
	};

	const refreshToken = async () => {
		const authToken = Cookies.get(COOKIE_KEYS.AUTH, true);
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
					idleTimeoutInMinutes: REFRESH_TOKEN_IDLE_TIME,
				};
				const _token = addExpirationDataToToken(object);
				const { roleName = "", roleCode = "" } = roleDetails;
				setAuthTokenCookie(_token, roleName, roleCode, user);
				window.location.href = labels?.continueCtaPath || "#";
			} else if (apiResponse?.data?.errors) {
				const { code } = apiResponse?.data?.errors;
				let authoredMsg = getErrorMsgForCode(code);
				showErrorToast(code, authoredMsg);
			}
		} catch (error) {
			showErrorToast("", getErrorMsgForCode());
		}
	};

	useEffect(() => {
		initTimeoutWithTimeoutDuration();

		const onMouseMove = (mouseMoveEvent) => {
			if (!showSessionTimeoutModal) {
				initTimeoutWithTimeoutDuration();
			}
		};

		const onKeyPress = (keyPressEvent) => {
			if (!showSessionTimeoutModal) {
				initTimeoutWithTimeoutDuration();
			}
		};

		document.addEventListener("keypress", onKeyPress);
		document.addEventListener("mousemove", onMouseMove);

		document.addEventListener("hurryupSessionExpiredEvent", (event) => {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
			setShowSessionTimeoutModal((prev) => true);
		});

		return () => {
			document.removeEventListener("keypress", onKeyPress);
			document.removeEventListener("mousemove", onMouseMove);
		};
	}, []);

	useEffect(() => {
		if (ref.current) {
			sessionTimeoutModalRenderer(ref.current, {
				...{
					labels,
					startAfreshCtaPath: getPersonaBasedLogoRedirectHomePage(),
					onAfreshClick: () => {
						setShowSessionTimeoutModal(false);
						initTimeoutWithTimeoutDuration();
					},
					onContinueClick: () => {
						setShowSessionTimeoutModal(false);
						initTimeoutWithTimeoutDuration();
						refreshToken();
					},
					onCloseHandler: () => {
						setShowSessionTimeoutModal(false);
						initTimeoutWithTimeoutDuration();
						refreshToken();
						window.location.reload();
					},
					showPopup: showSessionTimeoutModal,
				},
			});
		}
	}, [showSessionTimeoutModal]);

	return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
	mfData: JSON.stringify({
		sessionTimeoutDuration: 0,
		continueCtaLabel: "Continue",
		startAfreshCtaLabel: "Start Afresh",
		noteText: "<p>Fares may get affected..</p>\n",
		titleText: "<p>Still there? Session has timed out</p>\n",
		startAfreshCtaPath:
			"/content/skyplus6e/language-masters/en/home/homepage.html",
		continueCtaPath:
			"/content/skyplus6e/language-masters/en/home/homepage.html",
		timerImage:
			"https://www.goindigo.in/etc/designs/indigo-reservation-v2/clientlibs-react/images/Session-Timed-Out.gif",
	}),
};

export default ReactComponent;
