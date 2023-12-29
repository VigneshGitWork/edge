// export const BASE_API_URL = "https://comm-uat.goindigo.in/webdigitalapi";
// export const LOGOUT_SESSION_API_ENDPOINT = "/IndigoWeb/session/logout";

import * as Constants from "../../../utils/constants";
const { BASE_API_URL, LOGOUT_SESSION_API_ENDPOINT, CONTENT_TYPE_HEADER } =
	Constants;

export const logoutCurrentUser = (token) => {
	if (!token) {
		throw new Error(
			"logoutCurrentUser: Invalid token while trying to logout the current user."
		);
	}
	const headers = {
		Authorization: token,
		...CONTENT_TYPE_HEADER,
	};
	const method = "DELETE";
	const url = `${BASE_API_URL}${LOGOUT_SESSION_API_ENDPOINT}`;
	return fetch(url, {
		headers,
		method,
	});
};
