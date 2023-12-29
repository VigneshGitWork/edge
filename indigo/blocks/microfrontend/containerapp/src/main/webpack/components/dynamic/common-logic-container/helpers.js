import {
	anonymousUserToken,
	refreshAccessToken,
	addExpirationDataToToken,
} from "../../../utils/functions/userToken";
import Cookies from "../../../utils/functions/cookies";
import { COOKIE_KEYS } from "../../../utils/constants/common";
import { isValidURL, pushAnalytic } from "../../../utils/functions/analyticEvents";
import { events } from "../../../utils/custom-events";

const authTokenSetEvent = (data) => new CustomEvent("authTokenSetEvent", data);
const tokenCookieExpiryPopupUpdate = (eventData) =>
	new CustomEvent(events.TOKEN_COOKIE_UPDATE, eventData);

export const setAuthTokenCookie = (
	token,
	roleName = "",
	roleCode = "",
	user = null
) => {
	// token
	const cookieExpiredTime = token.expiresInMilliSeconds;
	Cookies.set(COOKIE_KEYS.AUTH, token, "", cookieExpiredTime);
	// role details
	Cookies.set(
		COOKIE_KEYS.ROLE_DETAILS,
		{ roleName, roleCode },
		"",
		cookieExpiredTime
	);

	// personas Type
	// Cookies.set(COOKIE_KEYS.PERSONA_TYPE, roleName, "", cookieExpiredTime);
	// document.cookie = `${COOKIE_KEYS.PERSONA_TYPE}=${roleName}${cookieExpiredTime}${""};path=/`;
	let now = new Date();
	let time = now.getTime();
	let expirationTime = time + token.expiresInMilliSeconds;
	now.setTime(expirationTime);
	document.cookie = `${
		COOKIE_KEYS.PERSONA_TYPE
	}=${roleName}; expires=${now.toUTCString()}; path=/`;
	/**
	 * we are doing directly document.cookie instead of util method -
	 * because of avoiding double quotes getting added for string
	 *
	 *  */
	// User details
	if (user) {
		Cookies.set(COOKIE_KEYS.USER, user, "", cookieExpiredTime, true);
	}
	// fire event for token have been set for microfrontends
	console.log("TOKEN EVENT FIRED");
	document.dispatchEvent(
		authTokenSetEvent({
			bubbles: true,
			detail: { token },
		})
	);
};

export const setAuthTokenCookieForOldSession = (
	token,
	roleName = "",
	aemOrgCurrency,
	aemOrgRole
) => {
	let now = new Date();
	let time = now.getTime();
	let expirationTime = time + token.expiresInMilliSeconds;
	now.setTime(expirationTime);
	// aemLoginStatus
	// Cookies.set(COOKIE_KEYS.ROLE, roleName, "", cookieExpiredTime);
	document.cookie = `${
		COOKIE_KEYS.ROLE
	}=${roleName}; expires=${now.toUTCString()}; path=/; domain=.goindigo.in`;
	// aemOrgCurrency
	// Cookies.set(COOKIE_KEYS.AEM_ORG_CURRENCY, aemOrgCurrency, "", cookieExpiredTime);
	document.cookie = `${
		COOKIE_KEYS.AEM_ORG_CURRENCY
	}=${aemOrgCurrency}; expires=${now.toUTCString()}; path=/; domain=.goindigo.in`;
	// aemOrgRole
	if (aemOrgRole) {
		// Cookies.set(COOKIE_KEYS.AEM_ORG_ROLE, aemOrgRole, "", cookieExpiredTime);
		document.cookie = `${
			COOKIE_KEYS.AEM_ORG_ROLE
		}=${aemOrgRole}; expires=${now.toUTCString()}; path=/; domain=.goindigo.in`;
	}
};

export const setAnonymousAuth = () => {
	return anonymousUserToken()
		.then((response) => response.json())
		.catch((err) => {
			pushAnalytic({
				event: "error",
				error: {
					code: "500",
					message: `AA: Something went wrong: create api:: ${err}`,
				},
			});
		});
};

export const refreshAuthToken = async () => {
	const authToken = Cookies.get(COOKIE_KEYS.AUTH, true);
	const response = await refreshAccessToken(authToken);
	if (
		response &&
		response.status == 200 &&
		response.errors === undefined &&
		response.statusText.toLowerCase() == "ok"
	) {
		const { token } = response;
		const idleTimeoutInMinutes = 10;
		const object = { token, idleTimeoutInMinutes };
		const _token = addExpirationDataToToken(object);
		return _token;
	} else {
		throw new Error("Auth Token expired please refresh or login again.");
	}
};

/**
* isExternal - to check if url is external or internal
* @param {String} href | Anchor href
* @returns {Boolean} | returns true or false
*/
export const isExternal = (href) => {
	if (!isValidURL(href)) return false;
	// check for internal url - return false if url is internal
	const siteUrl = (new URL(href));
	const siteUrlDomain = siteUrl.hostname;
	const rootDomain = '.goindigo.in';
	return (!(siteUrlDomain.indexOf(rootDomain) > -1));
}
