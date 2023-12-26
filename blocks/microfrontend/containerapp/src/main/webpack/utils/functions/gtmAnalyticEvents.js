import { gtmAnalytic } from "./gtmAnalyticUtils";
import Cookies from "./cookies";

import {
	COOKIE_KEYS,
	DEFAULT_CURRENCY,
	NOT_AVAILABLE,
} from "../constants/common";
import {
	pageConstant,
	pageTypeConst,
	personaConstant,
	journeyTypeConstant,
} from "../constants/analytics";
import { getLocalStorage } from "./storage";
import { localStorageKeys } from "../constants/localStorageConstants";

export const getPathFromUrl = (url) => {
	return url?.split(/[?#]/)[0] || NOT_AVAILABLE;
};

export const getFormatedDate = (date) => {
	date = new Date(date);
	const yyyy = date.getFullYear();
	let mm = date.getMonth() + 1; // Months start at 0!
	let dd = date.getDate();
	if (dd < 10) dd = "0" + dd;
	if (mm < 10) mm = "0" + mm;
	const formatedDate = dd + "-" + mm + "-" + yyyy;
	return formatedDate;
};
/**
 * gtmPushAnalytic - It holds the list of events and its details called from MFE
 * @param {object} param0 - contains state and event name
 */
export const pushDataLayerFunc = ({ ...obj }) => {
	const { state, event, ele } = obj;
	let authUser = Cookies.get(COOKIE_KEYS.USER, undefined, true) || "";
	authUser = authUser && JSON.parse(authUser);
	const userTypeCookie = Cookies.get(COOKIE_KEYS.ROLE_DETAILS);
	const personasType = userTypeCookie ? JSON.parse(userTypeCookie) : "";
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
	let previousUrls = sessionStorage.getItem("prevUrls");
	previousUrls = previousUrls && JSON.parse(previousUrls);
	const bookingContext =
		getLocalStorage(localStorageKeys.BOOKING_CONTEXT_VALUES) || {};
	const {
		selectedSourceCityInfo,
		selectedDestinationCityInfo,
		selectedJourneyType,
		seatWiseSelectedPaxInformation,
		selectedTravelDatesInfo,
		selectedSpecialFare,
		selectedCurrency,
		selectedMultiCityInfo,
	} =
		(state && state?.seatWiseSelectedPaxInformation ? state : bookingContext) ||
		bookingContext;
	const { adultCount, childrenCount, infantCount, seniorCitizenCount } =
		seatWiseSelectedPaxInformation || {};
	let airportCodePair;
	let sector;
	let departureDates = "";
	let daysUntilDeparture = "";
	const totalCount = adultCount + seniorCitizenCount + childrenCount;
	const promotionalCode = bookingContext?.selectedPromoInfo || "";
	const tripType = selectedJourneyType?.label?.replace(/\s/g, "") || "";
	let nearByStation = getLocalStorage(localStorageKeys.NEARBY_STATION);
	const selectedFlights = getLocalStorage("s_f_d");
	// for one way
	if (
		selectedJourneyType?.value === journeyTypeConstant?.JOURNEY_TYPE_ONE_WAY
	) {
		sector = `${selectedSourceCityInfo?.stationCode}-${selectedDestinationCityInfo?.stationCode}`;
		airportCodePair = sector.split("-").join("-");
		departureDates = getFormatedDate(selectedTravelDatesInfo?.startDate);
		// daysUntilDeparture=moment(selectedTravelDatesInfo?.startDate).diff(moment(), "days");
		daysUntilDeparture = Math.abs(
			Math.round(
				Math.round(new Date(selectedTravelDatesInfo?.startDate) - new Date()) /
					(1000 * 60 * 60 * 24)
			)
		);
	}

	// for round trip
	if (
		selectedJourneyType?.value === journeyTypeConstant?.JOURNEY_TYPE_ROUND_TRIP
	) {
		sector = `${selectedSourceCityInfo?.stationCode}-${selectedDestinationCityInfo?.stationCode}:${selectedDestinationCityInfo?.stationCode}-${selectedSourceCityInfo?.stationCode}`;
		airportCodePair = sector
			.split(":")
			.map((i) => {
				return i.split("-").join("-");
			})
			.join(":");
		departureDates = `${getFormatedDate(
			selectedTravelDatesInfo?.startDate
		)}:${getFormatedDate(selectedTravelDatesInfo?.endDate)}`;
		daysUntilDeparture = `${Math.abs(
			Math.round(
				Math.round(new Date(selectedTravelDatesInfo?.startDate) - new Date()) /
					(1000 * 60 * 60 * 24)
			)
		)} ${
			selectedTravelDatesInfo?.endDate
				? `: ${Math.abs(
						Math.round(
							Math.round(
								new Date(selectedTravelDatesInfo?.endDate) - new Date()
							) /
								(1000 * 60 * 60 * 24)
						)
				  )}`
				: ""
		}`;
	}

	// for multi city
	if (
		selectedJourneyType?.value === journeyTypeConstant?.JOURNEY_TYPE_ROUND_TRIP
	) {
		selectedMultiCityInfo?.forEach((selectedMultiCity) => {
			let multicityCodePair = `${selectedMultiCity?.from?.airportCode}-${selectedMultiCity?.to?.airportCode}`;
			let multicityDepartureDate = getFormatedDate(selectedMultiCity?.date);
			let multiCItyDaysUntilDeparture = Math.abs(
				Math.round(
					Math.round(
						new Date(selectedTravelDatesInfo?.startDate) - new Date()
					) /
						(1000 * 60 * 60 * 24)
				)
			);
			airportCodePair += `${
				airportCodePair ? `:${multicityCodePair}` : multicityCodePair
			}`;
			departureDates += `${
				departureDates ? `:${multicityDepartureDate}` : multicityDepartureDate
			}`;
			daysUntilDeparture = `${
				multiCItyDaysUntilDeparture
					? `:${multiCItyDaysUntilDeparture}`
					: multiCItyDaysUntilDeparture
			}`;
		});
	}

	let tripFare = 0;
	let categoryFare = "";
	if (selectedFlights.length > 0) {
		for (let flight of selectedFlights) {
			const { totalFareAmount = "", fareLabel = "" } = flight;
			// tripFare +=`${tripFare ? ":" : ""}${totalFareAmount}`;
			tripFare += totalFareAmount;
			categoryFare += `${categoryFare ? ":" : ""}${fareLabel}`;
		}
	}
	let gtmProps = {};
	console.log({ state, event });

	switch (event) {
		case "headerEngagement":
			gtmProps = {
				event: "header_engagement",
				event_action: "click",
				click_text: state?.headerClickText,
				click_nav: state?.headerClickNav,
				screen_name: state?.pageType || "homepage",
				flow_name: "booking_flow",
				interaction_type: "link/button click",
				header_interaction: 1,
			};
			break;
		case "hamburgerEngagement":
			gtmProps = {
				event: "hamburger_engagement",
				event_action: "click",
				click_text: state?.hamburgerClickText,
				click_nav: state?.hamburgerClickNav,
				screen_name: state?.pageType || "homepage",
				flow_name: "booking_flow",
				interaction_type: "link/button click",
				hamburger_interaction: 1,
			};
			break;
		case "pageload":
			console.log("you are here", pageType);
			if (pageType === pageTypeConst.PAGETYPE_HOMEPAGE) {
				gtmProps = {
					user_type:
						personasType && authUser?.customerNumber
							? personasType?.roleName
							: "anonymous", // user type member, anonymous, agent
					currency_code: selectedCurrency?.value
						? selectedCurrency?.value
						: DEFAULT_CURRENCY?.value || "", // currency code
					page_name: "Homepage", // current page name
					previous_page: previousUrls
						? getPathFromUrl(previousUrls[previousUrls?.length - 2])
						: NOT_AVAILABLE, // previous page name
					platform: window.screen.width < 768 ? "Mweb" : "Web", // Mweb or Web
					page_load_time:
						(window.performance.timing.domContentLoadedEventEnd -
							window.performance.timing.navigationStart) /
							1000 || 0, // Page Load Time
				};
			} else if (pageType === pageTypeConst.PAGETYPE_SRP) {
				gtmProps = {
					user_type:
						personasType && authUser?.customerNumber
							? personasType?.roleName
							: "anonymous", // user type member, anonymous, agent
					currency_code: selectedCurrency?.value
						? selectedCurrency?.value
						: DEFAULT_CURRENCY?.code || "", // currency code
					page_name: "Flight Search Result", // current page name
					previous_page: previousUrls
						? getPathFromUrl(previousUrls[previousUrls?.length - 2])
						: NOT_AVAILABLE, // previous page name
					OD: airportCodePair || "", // IATA Code of origin and destination searches
					trip_type: tripType || "", // oneWay, RoundTrip, Multiway
					pax_details: `${totalCount} | ${seniorCitizenCount} SS | ${adultCount} ADT| ${childrenCount} CHD | ${infantCount} INF `, // paxDetails: Total | Senior Citizen | Adult |Child | Infant
					departure_date: departureDates, // Departure Dates
					special_fare: selectedSpecialFare?.specialFareLabel || "", // Special Fares
					flight_sector:
						selectedDestinationCityInfo?.isInternational ||
						selectedSourceCityInfo?.isInternational
							? "International"
							: "Domestic", // Flight search type
					coupon_code: promotionalCode || "", // promo code
					days_until_departure: daysUntilDeparture || "", // how many days until departure
					closet_airport: nearByStation?.stationCode || "", // when a user allows their location
					platform: window.screen.width < 768 ? "Mweb" : "Web", // Mweb or Web
					page_load_time:
						(window.performance.timing.domContentLoadedEventEnd -
							window.performance.timing.navigationStart) /
							1000 || 0, // Page Load Time
				};
			} else if (pageType === pageTypeConst.PAGETYPE_PASSENGER_EDIT) {
				gtmProps = {
					user_type:
						personasType && authUser?.customerNumber
							? personasType?.roleName
							: "anonymous", // user type member, anonymous, agent
					currency_code: selectedCurrency?.value
						? selectedCurrency?.value
						: DEFAULT_CURRENCY?.code || "", // currency code
					page_name: "Passenger Details", // current page name
					previous_page: previousUrls
						? getPathFromUrl(previousUrls[previousUrls?.length - 2])
						: CONSTANTS.NOT_AVAILABLE, // previous page name
					OD: airportCodePair, // IATA Code of origin and destination searches
					trip_type: tripType, // oneWay, RoundTrip, Multiway
					pax_details: `${totalCount} | ${seniorCitizenCount} SS | ${adultCount} ADT| ${childrenCount} CHD | ${infantCount} INF `, // paxDetails: Total | Senior Citizen | Adult |Child | Infant
					departure_date: departureDates, // Departure Dates
					special_fare: selectedSpecialFare?.specialFareLabel || "", // Special Fares
					flight_sector:
						selectedDestinationCityInfo?.isInternational ||
						selectedSourceCityInfo?.isInternational
							? "International"
							: "Domestic", // Flight search type
					category_fare: categoryFare || "", // Saver of Flexi
					flight_fare: tripFare || 0, // price of booking (In round trip the price should be total price of both flights)
					coupon_code: promotionalCode, // promo code
					days_until_departure: daysUntilDeparture, // how many days until departure
					platform: window.screen.width < 768 ? "Mweb" : "Web", // Mweb or Web
					page_load_time:
						(window.performance.timing.domContentLoadedEventEnd -
							window.performance.timing.navigationStart) /
							1000 || 0, // Page Load Time
				};
			}
			break;
		default:
	}

	gtmAnalytic({
		state,
		gtmProps,
	});
};

export const gtmPushAnalytic = (obj) => {
	try {
		pushDataLayerFunc(obj);
	} catch (error) {
		console.log("---pushDataLayer--error", error);
	}
};
