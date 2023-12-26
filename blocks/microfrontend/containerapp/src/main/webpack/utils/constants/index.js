import { data } from "jquery";
// import { getEnvObj } from "../functions/utils";

export const CREATE_SESSION_API_ENDPOINT = "/v1/token/create";
export const LOGOUT_SESSION_API_ENDPOINT = "/v1/token/delete";
export const KEEP_ALIVE_AUTH_TOKEN = "/v1/token/refresh";
export const GET_SESSION_API_ENDPOINT = "/v1/token/get";
export const KEEP_ALIVE_AUTH_TOKEN_OLD = "/Application/Blank";

// const envObj = getEnvObj("_env_login");
// const bookingEnvObj = getEnvObj("_env_booking");

let envObj = window._env_login;
// let bookingEnvObj = window._env_booking;

// load Login API endpoints from config
const BASE_API_URL = envObj?.BASE_API_URL;
const CONTENT_TYPE_HEADER = envObj?.CONTENT_TYPE_HEADER;
const BASE_API_URL_OLD = envObj?.BASE_API_URL_OLD;
const SUB_BASE_API_URL_OLD = envObj?.SUB_BASE_API_URL_OLD;
const MEMBER_LOGIN_OLD = envObj?.MEMBER_LOGIN_OLD;
const AGENT_LOGIN_OLD = envObj?.AGENT_LOGIN_OLD;
const CAPF_LOGIN_OLD = envObj?.CAPF_LOGIN_OLD;
const MEMBER_LOGOUT_OLD = envObj?.MEMBER_LOGOUT_OLD;
const AGENT_LOGOUT_OLD = envObj?.AGENT_LOGOUT_OLD;
const SUB_DOMAIN = envObj?.SUB_DOMAIN;
const SUBSCRIPTION = envObj?.SUBSCRIPTION;

// load Booking API endpoints from config
const BOOKING_BASE_URL = window.msd?.msBookingApiUrl;
const CURRENCY_API = "/v1/setting/getcurrency";
const WIDGET_API = "/v1/setting/indigowidgets";
const MS_BW_USER_KEY = window.msd?.msBookingUserKey;

const SUBSCRIPTION_ORIGINAL =
	"5468657365206172656E2774207468652064726F69647320796F75277265206C6F6F6B696E6720666F722E";

export const ANONYMOUS_USER_BODY = {
	strToken: "",
	subscriptionKey: SUBSCRIPTION,
};

export const LOGIN_SUCCESS = "loginSuccessEvent";
export const TOGGLE_LOGIN_POPUP = "toggleLoginPopupEvent";
export const GENERIC_TOAST_MESSAGE_EVENT = "genericToastMessageEvent";
export const MAIN_LOADER_EVENT = "mainLoaderEvent";

export const dotRezLoginCk = "aemLoginStatus";
export const dotRezAgentroleCk = "aemOrgRole";
export const dotRezUserCurrencyCk = "aemOrgCurrency";

export const ANONYMOUS = "Anonymous";

export {
	BASE_API_URL,
	BASE_API_URL_OLD,
	SUB_BASE_API_URL_OLD,
	SUB_DOMAIN,
	MEMBER_LOGOUT_OLD,
	AGENT_LOGOUT_OLD,
	BOOKING_BASE_URL,
	CURRENCY_API,
	WIDGET_API,
	MS_BW_USER_KEY,
	CONTENT_TYPE_HEADER,
};
