import * as Constants from "../constants";
import axios from "axios";
import Cookies from "./cookies";
import { COOKIE_KEYS } from "../constants/common";
const {
	BASE_API_URL,
	CONTENT_TYPE_HEADER,
	ANONYMOUS_USER_BODY,
	KEEP_ALIVE_AUTH_TOKEN,
	CREATE_SESSION_API_ENDPOINT,
	dotRezAgentroleCk,
	dotRezUserCurrencyCk,
	BASE_API_URL_OLD,
	SUB_BASE_API_URL_OLD,
	SUB_DOMAIN,
	MEMBER_LOGOUT_OLD,
	AGENT_LOGOUT_OLD,
} = Constants;

const genericToastMessageEvent = (eventData) =>
	new CustomEvent("genericToastMessageEvent", eventData);

const mainLoaderEvent = (data) => new CustomEvent("mainLoaderEvent", data);

export const getUserToken = (config = {}, userType, username, password) => {
	const createMemberRequestBody = ({
		username = "",
		password = "",
		userType,
	}) => ({
		nskTokenRequest: {
			applicationName: "SkyplusWeb",
			credentials: {
				domain: "WW2",
				location: "WWW",
				channelType: "Web",
				password: password,
				username: username,
				alternateIdentifier: "",
			},
		},
		usertype: userType,
		...ANONYMOUS_USER_BODY,
	});

	let requestBody = null;
	if (!userType || userType === "anonymous") {
		requestBody = config.ANONYMOUS_USER_BODY;
	} else {
		if (!username || !password) {
			throw new Error(`username or password is missing for ${userType} user.`);
		}
		requestBody = createMemberRequestBody({ userType, username, password });
	}
	return fetch(`${config.BASE_API_URL}${config.CREATE_SESSION_API_ENDPOINT}`, {
		method: "POST",
		body: JSON.stringify(requestBody),
		headers: CONTENT_TYPE_HEADER,
	});
};

export const getUserTokenOld = (config = {}, userType, username, password) => {
	const createRequestBody = (userType, username, password) => {
		switch (userType) {
			case "Agent":
				return {
					"agentLogin.Username": username,
					"agentLogin.Password": password,
					isEncrypred: true,
				};
			case "Member":
				return {};
			default:
				return null;
		}
	};

	const requestBody = createRequestBody(userType, username, password);
	if (!requestBody) {
		throw new Error(`Please proivde a valid usertype`);
	}

	const uri = `${
		config.BASE_API_URL_OLD
	}${config.LOGIN_API_ENDPOINT_OLD.replace("--1--", userType)}`;
	return fetch(uri, {
		method: "POST",
		body: JSON.stringify(requestBody),
		headers: config.CONTENT_TYPE_HEADER,
	});
};

export const anonymousUserToken = () => {
	const anonymousApiHeaders = {
		...CONTENT_TYPE_HEADER,
	};
	return getUserToken(
		{
			ANONYMOUS_USER_BODY,
			BASE_API_URL,
			CREATE_SESSION_API_ENDPOINT,
			anonymousApiHeaders,
		},
		""
	);
};

export const refreshAccessToken = async (authToken) => {
	console.log("authToken: ", authToken);
	if (!authToken || !authToken.token) {
		return null;
	}

	const url = `${BASE_API_URL}${KEEP_ALIVE_AUTH_TOKEN}`;
	const apiResponse = await axios.put(url, null, {
		headers: {
			Authorization: authToken.token,
			"Content-Type": "application/json",
		},
	});

	const { errors, data, status, statusText } = apiResponse;

	return { ...data, status, statusText, errors, token: authToken.token };
};

export const addExpirationDataToToken = (apiTokenObject) => {
	if (
		!apiTokenObject ||
		!apiTokenObject.token ||
		!apiTokenObject.idleTimeoutInMinutes
	) {
		throw new Error(
			"ADD_EXPIRATION_INFO_TO_THE_TOKEN: Invalid token object, required information is missing",
			apiTokenObject
		);
	}
	const { token, idleTimeoutInMinutes } = apiTokenObject;
	const createdAtMilliSeconds = new Date().getTime();
	const expiresInMilliSeconds = +idleTimeoutInMinutes * 60 * 1000;
	const validTillMilliSeconds = createdAtMilliSeconds + expiresInMilliSeconds;
	const tokenWithExpirationData = {
		token,
		createdAtMilliSeconds,
		expiresInMilliSeconds,
		validTillMilliSeconds,
	};
	return tokenWithExpirationData;
};

export const isTokenExpired = (tokenStoredInCookies) => {
	if (
		!tokenStoredInCookies ||
		!tokenStoredInCookies.createdAtMilliSeconds ||
		!tokenStoredInCookies.expiresInMilliSeconds ||
		!tokenStoredInCookies.validTillMilliSeconds
	) {
		throw new Error(
			"CHECK_TOKEN_EXPIRATION: Invalid token object, required information is missing",
			tokenStoredInCookies
		);
	}
	const { validTillMilliSeconds } = tokenStoredInCookies;
	return validTillMilliSeconds <= new Date().getTime();
};

export const deleteBrowserCookie = (sKey, sPath, sDomain) => {
	document.cookie =
		encodeURIComponent(sKey) +
		"=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
		(sDomain ? "; domain=" + sDomain : "") +
		(sPath ? "; path=" + sPath : "");
};

export const oldLogoutHandler = async (userType) => {
	let logout_url = "";
	if (userType === "Member" || userType === "member") {
		logout_url = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}${MEMBER_LOGOUT_OLD}`; // Old Logout api url for Member
	} else {
		logout_url = `${BASE_API_URL_OLD}${SUB_BASE_API_URL_OLD}${AGENT_LOGOUT_OLD}`; // Old Logout api url for Agent and other personas
	}

	console.log("logout_url", logout_url);
	const headerOLD = {
		"Content-type":
			"application/x-www-form-urlencoded; text/html; charset=UTF-8",
	};
	try {
		const oldLogoutApi = await fetch(logout_url, {
			method: "GET",
			mode: "cors",
			redirect: "follow",
			credentials: "include",
			headers: headerOLD,
			body: null,
		});
		const oldLogoutApiResponse = await oldLogoutApi.json();
		if (oldLogoutApiResponse?.statusText) {
			if (Cookies.get(COOKIE_KEYS.PERSONA_TYPE)) {
				deleteBrowserCookie(COOKIE_KEYS.PERSONA_TYPE, "/", "");
			}
			if (Cookies.get(COOKIE_KEYS.ROLE)) {
				deleteBrowserCookie(COOKIE_KEYS.ROLE, "/", SUB_DOMAIN);
			}
			if (Cookies.get(dotRezAgentroleCk)) {
				deleteBrowserCookie(dotRezAgentroleCk, "/", SUB_DOMAIN);
			}
			if (Cookies.get(dotRezUserCurrencyCk)) {
				deleteBrowserCookie(dotRezUserCurrencyCk, "/", SUB_DOMAIN);
			}
		}
	} catch (error) {
		return Promise.reject(error);
	}
};
