import { getErrorMsgForCode } from "../../../utils/functions/errorHandling";

import { pushAnalytic } from "../../../utils/functions/analyticEvents";

export const envObj = {
	BOOKING_RETRIEVE_FOR_DEEPLINK:
		window.msd.msBookingDeeplinkApiUrl ??
		"https://api-qa-itinerary-save-skyplus6e.goindigo.in/v1/booking/retreivefordeeplink",
	USER_KEYBOOKING_RETRIEVE_FOR_DEEPLINK:
		window.msd.msBookingDeeplinkUserKey ?? "c5d5ef6951133b7cf43adfbb5c97e270",
};

const apiHandlerHOC = async (apiCall) => {
	let { message } = getErrorMsgForCode("");

	try {
		const response = await apiCall();
		const { errors, data } = response;
		if (errors) {
			const { message } = getErrorMsgForCode(errors?.code);
			return { status: false, message };
		}

		return { status: true, message, data };
	} catch (error) {
		return { status: false, message };
	}
};

export const getOtp = (data, sessionId) =>
	apiHandlerHOC(() => {
		return request(envObj.BOOKING_RETRIEVE_FOR_DEEPLINK, {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				User_key: envObj.USER_KEYBOOKING_RETRIEVE_FOR_DEEPLINK,
				"Content-Type": "application/json",
				Authorization: sessionId,
			},
		});
	});

export const submitOtp = (data, sessionId) =>
	apiHandlerHOC(async () => {
		return request(envObj.BOOKING_RETRIEVE_FOR_DEEPLINK, {
			method: "post",
			body: JSON.stringify(data),
			headers: {
				User_key: envObj.USER_KEYBOOKING_RETRIEVE_FOR_DEEPLINK,
				"Content-Type": "application/json",
				Authorization: sessionId,
			},
		});
	});

/**
 *
 * @param {Number} startTime
 * @returns {Number}
 */
const calculateDuration = (startTime) => {
	let duration = Date.now() - startTime;
	return Math.round(duration / 1000);
};

/**
 * @param {String} url
 * @param {RequestInit} requestOptions
 *
 */
const request = async (url, requestOptions) => {
	let startTime = Date.now();

	try {
		return fetch(url, requestOptions)
			.then(async (response) => {
				if (response.ok) {
					let data = await response.json();
					return Promise.resolve({
						...data,
						status: response.status,
						url: response.url,
					});
				} else {
					let responsetime = calculateDuration(startTime);

					const { code, message } = getErrorMsgForCode("");

					const errorMesg = {
						apiURL: response.url,
						code,
						displayMessage: message,
						source: "MS-API",
						statusCode: response.status,
						statusMessage: response.statusText,
						type: "business",
						responsetime,
					};

					pushAnalytic({
						data: {
							_event: "error",
							errorMesg,
							pageInfo: {
								pageName: "Intermediate DeepLink page",
							},
						},
						event: "error",
					});
					// eslint-disable-next-line no-throw-literal
					throw { response };
				}
			})
			.then((response) => {
				let { errors } = response || { errors: false };
				if (errors) {
					let responsetime = calculateDuration(startTime);
					const error = getErrorMsgForCode(errors?.code);

					const errorMesg = {
						apiURL: response.url,
						code: error.code,
						displayMessage: error.message,
						source: "MS-API",
						statusCode: response.status,
						statusMessage: errors.message,
						type: "business",
						responsetime,
					};

					pushAnalytic({
						data: {
							_event: "error",
							errorMesg,
							pageInfo: {
								pageName: "Intermediate DeepLink page",
							},
						},
						event: "error",
					});

					return Promise.reject({ errors });
				}

				return Promise.resolve(response);
			});
	} catch (error) {
		return Promise.reject({ status: false });
	}
};
