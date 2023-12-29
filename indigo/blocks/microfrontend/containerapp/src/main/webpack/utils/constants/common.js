export const COOKIE_KEYS = {
	AUTH: "auth_token",
	ROLE: "aemLoginStatus",
	USER: "auth_user",
	ROLE_DETAILS: "role_details",
	PERSONA_TYPE: "personasType",
	SKYPLUS_ALB: "akaalb_skyplus_alb",
	AEM_ORG_CURRENCY: "aemOrgCurrency",
	AEM_ORG_ROLE: "aemOrgRole",
};

export const localStorageKeys = {
	GENERIC_DATA_CONTAINER_APP: "generic_data_container_app",
	USER_ACCOUNT_DETAILS: "u_a_d",
	BOOKING_CONTEXT_VALUES: "bw_cntxt_val",
};

export const journeyTypeCode = {
	ONE_WAY: "oneWay",
	ROUND_TRIP: "roundTrip",
	MULTI_CITY: "multiCity",
};

export const CONSTANTS = {
	EVENT_TOGGLE_SECTION: "EVENT_TOGGLE_SECTION",
	EVENT_TOGGLE_SECTION_ACTION_ADDON: "EVENT_TOGGLE_SECTION_ACTION_ADDON",
	EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT: "EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT",
	EVENT_TOGGLE_SECTION_ACTION_SEAT: "EVENT_TOGGLE_SECTION_ACTION_SEAT",
	EVENT_TOGGLE_SECTION_ACTION_PAYMENT: "EVENT_TOGGLE_SECTION_ACTION_PAYMENT",
	EVENT_RENDER_HEADER_RIGHT_SECTION: "EVENT_RENDER_HEADER_RIGHT_SECTION",
};

export const paxCodes = {
	adult: {
		code: "ADT",
		discountCode: "",
	},
	seniorCitizen: {
		code: "ADT",
		discountCode: "SRCT",
	},
	children: {
		code: "CHD",
		discountCode: "",
	},
	infant: {
		code: "INFT",
		discountCode: "",
	},
};

export const seatOptionCode = {
	double: "EXT",
	triple: "EXT2",
};

export const PROJECT_TYPE_COOKIE_SKYPLUS = "skyplusbau_alb:skyplus";
export const PROJECT_TYPE_BAU = "BAU";
export const PROJECT_TYPE_SKYPLUS = "Skyplus";

export const SRP_PAGETYPE = "srp";
export const PE_PAGETYPE = "passenger-edit";

export const dateFormats = {
	DAY_MONTH: "D MMMM",
};

export const STEPPER_COMP_KEYS = {
	EVENT_TOGGLE_SECTION: "EVENT_TOGGLE_SECTION",
	EVENT_BACK_BUTTON_CLICK: "EVENT_BACK_BUTTON_CLICK",
	ACTIVE_SECTIONS: {
		EVENT_TOGGLE_SECTION_ACTION_ADDON: "EVENT_TOGGLE_SECTION_ACTION_ADDON", // addon open active section
		EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT:
			"EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT",
		EVENT_TOGGLE_SECTION_ACTION_SEAT: "EVENT_TOGGLE_SECTION_ACTION_SEAT",
	},
};

export const variationCodes = {
	HOME: "homepage",
	SRP: "srp",
	MULTICITY: "multicity",
	PASSENGER_EDIT: "passenger-edit",
	SALE: "sale",
	HYDERABAD_EVENT: "hyderabad-event",
};

export const REFRESH_TOKEN_API_ERROR_MSG =
	"Session expired. Please start the session again";
export const REFRESH_TOKEN_IDLE_TIME = 15;

export const popUpModalConstant = {
	GENERICDATALIST: "mainGenericDataList",
	HEADING: "Responsibility Notice",
	DESC: "You'll be redirected to an external website. Please be aware that IndiGo isn't responsible for its content and privacy policies.",
	CTALABEL: "Stay Here",
	SECCTALABEL: "Continue",
	HIGHLIGHTLABEL: "External Website Disclaimer",
	POPID: "external-website-disclaimer-pop-up",
	LOCALID: "generic_data_container_app",
};

export const DEFAULT_CURRENCY = {
	label: "Indian Rupee",
	value: "INR",
};

export const NOT_AVAILABLE = "N/A";
