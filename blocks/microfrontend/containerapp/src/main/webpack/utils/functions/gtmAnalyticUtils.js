import merge from "lodash/merge";
import Cookies from "./cookies";
import {
	PROJECT_TYPE_BAU,
	PROJECT_TYPE_SKYPLUS,
	COOKIE_KEYS,
} from "../constants/common";

/**
 * GTM Analytic - call GTM analytic events
 * @param {object} obj - object cantaines common properties, state and event Properties
 */
export const gtmAnalytic = ({ ...obj }) => {
	// thorws error if Datalayer object not found on window
	if (!window.dataLayer) {
		console.error("GTM Analytic Error: DataLayer object not found");
		return false;
	}
	const { state, commonInfo, gtmProps } = obj;
	let auth_user = Cookies.get(COOKIE_KEYS.USER, undefined, true) || "";
	auth_user = auth_user && JSON.parse(auth_user);
	const userTypeCookie = Cookies.get(COOKIE_KEYS.ROLE_DETAILS);
	const personasType = userTypeCookie ? JSON.parse(userTypeCookie) : "";
	const projectName = window?.skyinstance
		? PROJECT_TYPE_SKYPLUS
		: PROJECT_TYPE_BAU;

	const commonData = {
		page: {
			pageInfo: {
				pageName: state?.pageType || "homepage",
				siteSection: commonInfo?.page?.pageInfo?.siteSection || "homepage",
				language: window.locale || "",
				projectName: projectName,
			},
			error: {
				id: "",
				text: "",
			},
		},
		user_type:
			personasType && auth_user?.customerNumber
				? personasType?.roleCode
				: "anonymous",
	};

	const dataLayerObjGTM = merge(merge(gtmProps), commonInfo);
	console.log({ dataLayerObjGTM, gtmProps });

	// sending interaction data to gtm analytic
	window.dataLayer = window.dataLayer || [];
	window?.dataLayer.push({
		...dataLayerObjGTM,
	});
};
