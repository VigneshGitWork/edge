export const validator = (regEx) => (value) => {
	if (!value) {
		return true;
	}
	const stringifiedValue = value + "";
	return stringifiedValue.match(regEx);
};

const headerClassSelector = ".skyplus6e-header__logo > a";
export const getPersonaBasedLogoRedirectHomePage = () => {
	return document.querySelector(headerClassSelector)?.href || "/";
};

export const getEnvObj = (envKey = "_env_login") => {
	const defaultObj = {};
	try {
		return window[envKey] || defaultObj;
	} catch (error) {
		console.log(error);
		return defaultObj;
	}
};

export const getParameterByName = (name, url = window.location.href) => {
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const removeParam = (key, sourceURL = window.location.href) => {
	var rtn = sourceURL.split("?")[0],
		param,
		params_arr = [],
		queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
	if (queryString !== "") {
		params_arr = queryString.split("&");
		for (var i = params_arr.length - 1; i >= 0; i -= 1) {
			param = params_arr[i].split("=")[0];
			if (param === key) {
				params_arr.splice(i, 1);
			}
		}
		if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
	}
	return rtn;
};


/**
 *
 * @description A utility function to convert placeholder into values within string
 *
 * @example
 * formattedMessage("{name} and age is {age}" , {name: "Name", age: 1000})
 *
 * @param {string} rawString
 * @param {{[key: string]: string}} value
 * @returns {string}
 */
export const formattedMessage = (rawString, value) => {
	const entries = Object.entries(value);
	entries.forEach(([key, value]) => {
		let find = "{" + key + "}";
		let regExp = new RegExp(find, "g");
		rawString = rawString.replace(regExp, value);
	});
	return rawString;
};
