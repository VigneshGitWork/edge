import merge from "lodash/merge";
import Cookies from "./cookies";
import { logEntry } from "./kibanaLog";

import {
	PROJECT_TYPE_BAU,
	PROJECT_TYPE_SKYPLUS,
	COOKIE_KEYS,
} from "../constants/common";
import { AESEncryptCtr } from "./aes-encryption/aes-ctr";
import {
	pageConstant,
	pageTypeConst,
	personaConstant,
} from "../constants/analytics";

/**
 * adobeAnalytic - call adobe analytic events
 * @param {object} obj - object contains common properties, state and event Properties
 */
export const adobeAnalytic = ({ ...obj }) => {
	// thorws error if adobeDatalayer object not found on window
	if (!window.adobeDataLayer) {
		console.error("Adobe Analytic Error: adobeDataLayer object not found");
		return false;
	}
	const { state, commonInfo, eventProps } = obj;
	let authUser = Cookies.get(COOKIE_KEYS.USER, undefined, true) || "";
	authUser = authUser && JSON.parse(authUser);
	const userTypeCookie = Cookies.get(COOKIE_KEYS.ROLE_DETAILS);
	const authToken =
		Cookies.get(COOKIE_KEYS.AUTH) &&
		JSON.parse(Cookies.get(COOKIE_KEYS.AUTH))?.token;
	const personasType = userTypeCookie ? JSON.parse(userTypeCookie) : "";
	const projectName = window?.skyinstance
		? PROJECT_TYPE_SKYPLUS
		: PROJECT_TYPE_BAU;

	const { persona, pageType } = window;
	const {
		PERSONA_CORP_ADMIN,
		PERSONA_CORP_USER,
		PERSONA_MEMBER,
		PERSONA_AGENT,
	} = personaConstant;
	const { CORP_CONNECT_ADMIN, CORP_CONNECT_USER, AGENT_USER, HOMEPAGE } =
		pageConstant;
	let pageName = "";
	if (pageType === pageTypeConst.PAGETYPE_HOMEPAGE) {
		switch (persona) {
			case PERSONA_CORP_ADMIN:
				pageName = CORP_CONNECT_ADMIN;
				break;
			case PERSONA_CORP_USER:
				pageName = CORP_CONNECT_USER;
				break;
			case PERSONA_AGENT:
				pageName = AGENT_USER;
				break;
			case PERSONA_MEMBER:
				pageName = HOMEPAGE;
				break;

			default:
		}
	} else {
		pageName = window.location.href
			.split("/")
			.pop()
			.replace(".html", "")
			.split("?")[0];
	}

	const commonData = {
		page: {
			pageInfo: {
				pageName: pageName || state?.pageType || "Homepage",
				siteSection:
					pageName || commonInfo?.page?.pageInfo?.siteSection || "Homepage",
				language: window.locale || "",
				projectName,
			},
			error: {
				id: "",
				text: "",
			},
			eventInfo: {
				outboundLinkName: "",
				outboundLinkURL: "",
			},
		},
		user: {
			customerID: authUser?.customerNumber
				? AESEncryptCtr(authUser?.customerNumber, "", 256)
				: "",
			type:
				personasType && authUser?.customerNumber
					? personasType?.roleCode
					: "Anonymous",
			token: authToken,
		},
	};

	const dataLayerObj = merge(commonData, eventProps);

	// sending interaction data to adobe analytic
	window?.adobeDataLayer.push({
		...dataLayerObj,
	});

	// sending to kibana
	if (eventProps?.interactionType?.toLowerCase() === "error") {
		logEntry({ ...eventProps, journeyId: authToken });
	}
};
