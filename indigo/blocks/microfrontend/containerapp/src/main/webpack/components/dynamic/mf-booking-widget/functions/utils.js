import isEmpty from "lodash/isEmpty";
import { paxCodes } from "../../../../utils/constants/common";
import { setSessionStorageWithExp } from "../../../../utils/storage";

const defaultDeepLinkData = {
	deepLinkQueryParamKey: "cid",
	deepLinkPromoCodeKeys: {
		googleflights: "Google",
		wego: "WEGO",
		skyscanner: "SKYSCN",
	},
}; // fallback temporary

/**
 * Checks if this call is from Deeplink
 * Returns true or false accordingly
 */
export function ifDeepLinkCall() {
	const hashParams = window.location.hash.slice(1);
	const parts = hashParams.split("/");
	try {
		return !!(Array.isArray(parts) && parts.length >= 5); // hashParams should have atleast first 5 params for flight search
	} catch (error) {
		return false;
	}
}

// export function ifDeepLinkCall() {
//   const urlParams = new URLSearchParams(window.location.search);
//   const deepLinkDataExposedFromAEM = window?.deepLinkData || {
//     deepLinkQueryParamKey: "cid",
//     deepLinkStartKeyword: "metasearch",
//     deepLinkPromoCodeKeys: {
//         googleflights: "Google",
//         wego: "WEGO",
//         skyscanner: "SKYSCN",
//     }
// }; // fallback temporary
//   const { deepLinkQueryParamKey, deepLinkStartKeyword }  = deepLinkDataExposedFromAEM;
//   const cid = urlParams.get(deepLinkQueryParamKey); // ToDo: Get it from AEM
//   try {
//     return !!(cid?.toLowerCase().startsWith(deepLinkStartKeyword));
//   } catch (error) {
//     return false;
//   }
// }

/**
 * Parses the URL and retrieves all SRP Deeplink Parms
 * Returns and object with params and values
 */

export function getSrpDeeplinkParms(deepLinkData = defaultDeepLinkData) {
	const hashParams = window.location.hash.slice(1);
	const parts = hashParams.split("/");

	const originCode = parts[0];
	const destinationCode = parts[1];
	let travelDate = parts[2];
	travelDate =
		travelDate &&
		`${travelDate.slice(0, 4)}-${travelDate.slice(4, 6)}-${travelDate.slice(
			6,
			8
		)}`;

	const currencyCode = parts[3];

	const passengerData = parts[4].substring(
		0,
		parts[4].includes("+") ? parts[4].indexOf("+") : 3
	);
	let returnDate =
		parts[4].includes("+") && parts[4].substring(parts[4].indexOf("+") + 1);
	returnDate =
		returnDate &&
		`${returnDate.slice(0, 4)}-${returnDate.slice(4, 6)}-${returnDate.slice(
			6,
			8
		)}`;

	let [adult, children, infant] = passengerData.split("");
	let promoCode = "";
	const urlParams = new URLSearchParams(window.location.search);
	const deepLinkDataExposedFromAEM = deepLinkData ? { ...deepLinkData } : {};

	// retrieve Promocode from URL search params
	if (urlParams && !isEmpty(deepLinkDataExposedFromAEM)) {
		const { deepLinkQueryParamKey, deepLinkPromoCodeKeys } =
			deepLinkDataExposedFromAEM; // to be exposed by AEM
		const activeQueryParamValue = urlParams.get(deepLinkQueryParamKey);
		const promoKeys = Object.keys(deepLinkPromoCodeKeys);
		if (promoKeys?.length) {
			// ["googleflights", "wego"]
			promoKeys.forEach((item) => {
				if (
					activeQueryParamValue?.toLowerCase().includes(item) &&
					deepLinkPromoCodeKeys[item]
				) {
					promoCode = deepLinkPromoCodeKeys[item] || ""; // deepLinkPromoCodeKeys[googleflights] : "Google"
				}
			});
		}
	}

	if (promoCode) {
		const deepLinkCouponData = {
			promoCode,
			flightIdentifierKey: deepLinkDataExposedFromAEM?.flightIdentifierKey,
		};
		setSessionStorageWithExp(
			"deepLinkPromoCode",
			deepLinkCouponData,
			deepLinkDataExposedFromAEM?.promoCodeExpiryTime
		);
	}

	return {
		originCode,
		destinationCode,
		travelDate,
		currencyCode,
		adult: parseInt(adult),
		children: parseInt(children),
		infant: parseInt(infant),
		promoCode,
		returnDate,
	};
}

/**
 *
 * @param {*} params  - { }
 * @param {*} widgetApiData
 * @returns object
 */

export const getPayloadFromDeepLinkData = (params, widgetApiData) => {
	const {
		originCode,
		destinationCode,
		travelDate,
		currencyCode,
		adult,
		children,
		infant,
		promoCode,
		returnDate,
	} = params;
	const selectedSpecialFare = null;

	if (!isEmpty(widgetApiData)) {
		// get selectedCurrency from currency code
		const masterCurrencyList = widgetApiData.activeCurrencyModel;
		const selectedCurrencyCode = currencyCode;
		let selectedCurrency = null;
		masterCurrencyList.forEach((item) => {
			if (item?.currencyCode === selectedCurrencyCode) {
				selectedCurrency = {
					...item,
					value: item?.currencyCode,
					label: item?.description,
				};
			}
		});
		// get selectedDestinationCityInfo and selectedSourceCityInfo from stationcode
		const masterCitiesList = widgetApiData.masterDataModel;
		const selectedDestinationCityCode = destinationCode;
		const selectedSourceCityCode = originCode;
		let selectedDestinationCityInfo = null;
		let selectedSourceCityInfo = null;
		for (const item of masterCitiesList) {
			if (
				item?.stationCode?.toLowerCase() ===
				selectedDestinationCityCode?.toLowerCase()
			) {
				selectedDestinationCityInfo = item;
			}
			if (
				item?.stationCode?.toLowerCase() ===
				selectedSourceCityCode?.toLowerCase()
			) {
				selectedSourceCityInfo = item;
			}
		}
		// selectedTravelDatesInfo as per the dates in deeplink
		const startDate = travelDate || null;
		const endDate = returnDate || null;
		const selectedTravelDatesInfo = {
			startDate,
			endDate,
		};
		// selected nationality object
		const nationality = null;
		// seatWiseSelectedPaxInformation from pax data
		const seatWiseSelectedPaxInformation = {
			adultCount: adult,
			childrenCount: children,
			seniorCitizenCount: 0,
			infantCount: infant,
			adultExtraDoubleSeat: 0,
			adultExtraTripleSeat: 0,
			seniorCitizenExtraDoubleSeat: 0,
			seniorCitizenExtraTripleSeat: 0,
			childrenExtraDoubleSeat: 0,
			childrenExtraTripleSeat: 0,
			totalAllowedCount: 0,
			totalCount: adult + children,
		};

		// selectedPaxInformation from params
		const selectedPaxInformation = {
			types: [
				{
					type: paxCodes.adult.code,
					discountCode: "",
					count: adult,
				},
			],
		};
		if (Boolean(children)) {
			selectedPaxInformation.types.push({
				type: paxCodes.children.code,
				discountCode: "",
				count: children,
			});
		}

		if (Boolean(infant)) {
			selectedPaxInformation.types.push({
				type: paxCodes.infant.code,
				discountCode: "",
				count: infant,
			});
		}

		// selectedPromoInfo key
		const selectedPromoInfo = promoCode;
		// selectedJourneyType
		const oneWayObj = {
			label: "One Way",
			value: "oneWay",
			icon_id: "ONE_WAY",
		};

		const roundTripObj = {
			label: "Round Trip",
			value: "roundTrip",
			icon_id: "ROUND_TRIP",
		};

		const selectedJourneyType = returnDate ? roundTripObj : oneWayObj;
		return {
			nationality,
			seatWiseSelectedPaxInformation,
			selectedCurrency,
			selectedDestinationCityInfo,
			selectedJourneyType,
			selectedPaxInformation,
			selectedPromoInfo,
			selectedSourceCityInfo,
			selectedSpecialFare,
			selectedTravelDatesInfo,
		};
	}
};
