import axios from "axios";
/*
// DEV
window._env_booking = {
    ERROR_URL:"https://api-dev-logging-skyplus6e.goindigo.in/v1/logging/error",
    USERKEY:"a2fa7694f7ea6d08b9a59e8eac9ff4b0"
}
//QA
window._env_booking = {
    ERROR_URL:"https://api-dev-logging-skyplus6e.goindigo.in/v1/logging/error",
    USERKEY:"a2fa7694f7ea6d08b9a59e8eac9ff4b0"
}
//PRE-PROD
window._env_booking = {
    ERROR_URL:"https://api-preprod-logging-skyplus6e.goindigo.in/v1/logging/error",
    USERKEY:"395241c08201d1777ed5cb2e6dc6ca4c"
}
//PROD
window._env_booking = {
    ERROR_URL:"https://api-prod-logging-skyplus6e.goindigo.in/v1/logging/error",
    USERKEY:"96cce5bb0a05335e8bb18cc5c63c2f0d"
}
*/

const getEnvObj = () => {
	const defaultObj = {};
	const envKey = "_env_login";
	try {
		return window[envKey] || defaultObj;
	} catch (error) {
		console.log(error);
		return defaultObj;
	}
};

/**
 * getCookieValue - get cookie value from the name
 * @param {string} name - cookie name
 * @returns
 */
const getCookieValue = (name) =>
	document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || "";

/**
 * Common interface for logging the error log message to Kibana
 *
 * @method post
 * @static
 * @param {object} body, key value pairs passed to the call
 * @param {function} callback, a callback function
 */

export const logEntry = (custObj) => {
	if (!window.adobeDataLayer) {
		console.error("Adobe Analytic Error: adobeDataLayer object not found");
		alert("Adobe Analytic Error: adobeDataLayer object not found");
		return false;
	}
	const ObjName = getEnvObj();

	// REMOVE THE HARDCODED VALUES
	const obj = {
		ERROR_URL: window?.msd?.mfLogsUrl ? window?.msd?.mfLogsUrl : "",
		USERKEY: window?.msd?.mfLogsKey ? window?.msd?.mfLogsKey : "",
	};

	// common values which will be shared to request
	let commonObj = {
		timestamp: new Date().toISOString(), // current GMT time from browser.
		// journeyId:
		// 	window?._satellite?.getVisitorId()?.getMarketingCloudVisitorID() ||
		// 	new Date(),
	};

	// concat the two obj
	let logObj = {
		...custObj,
		...commonObj,
	};

	return axios
		.post(obj.ERROR_URL, logObj, {
			headers: {
				User_key: obj.USERKEY,
			},
		})
		.then((res) => {
			//TODO
			console.log(res);
		})
		.catch((e) => {
			//TODO
			console.log(e);
		});
};
