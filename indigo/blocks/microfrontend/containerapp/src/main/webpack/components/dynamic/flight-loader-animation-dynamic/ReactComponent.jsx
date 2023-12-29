/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useState, useEffect } from "react";
import SearchProgress from "./SearchProgress";
import { localStorageKeys } from "../../../utils/constants/localStorageConstants";
import {
	paxCodes,
	journeyTypeCode,
} from "../../../utils/constants/common";
import {
	ifDeepLinkCall,
	getSrpDeeplinkParms,
} from "../mf-booking-widget/functions/utils";
import { UTIL_CONSTANTS, formatDate } from "../../../utils";


const handleDeepLinkDataPreill = () => {
	const deepLinkParams = getSrpDeeplinkParms();
	const {
		originCode,
		destinationCode,
		travelDate,
		adult,
		children,
		returnDate,
	} = deepLinkParams;
	const travelDeepLinkDate = travelDate
		? formatDate(travelDate,UTIL_CONSTANTS.DAY_MONTH)
		: "";
	const returnDeepLinkDate = returnDate
		? formatDate(returnDate,UTIL_CONSTANTS.DAY_MONTH)
		: "";
	const paxDeepLinkCount = adult + children; // infant is not included in the totalcount
	return {
		source: originCode?.toUpperCase(),
		destination: destinationCode?.toUpperCase(),
		onwardDate: travelDeepLinkDate || "",
		returnDate: returnDeepLinkDate || "",
		passengerCount: paxDeepLinkCount,
		journeyType: returnDate
			? journeyTypeCode.ROUND_TRIP
			: journeyTypeCode.ONE_WAY,
	};
};

function getSearchProgressProps() {
	if (ifDeepLinkCall() && getSrpDeeplinkParms()) {
		return handleDeepLinkDataPreill(); // if deeplinking get the data from query params and show
	} else {
		let data = JSON.parse(
			localStorage.getItem(localStorageKeys.BOOKING_CONTEXT_VALUES)
		);
		let paxInfo = data?.selectedPaxInformation?.types || [];
		let paxCount = paxInfo.reduce((acc, item) => {
			let tempAcc = acc;
			if (
				item.type !== paxCodes.infant.code &&
				(!item.discountCode ||
					item.discountCode === paxCodes.seniorCitizen.discountCode)
			) {
				tempAcc = item.count + acc;
			}
			return tempAcc;
		}, 0);
		let toDateStr = data?.selectedTravelDatesInfo?.startDate;
		if (toDateStr) {
			toDateStr = formatDate(toDateStr,UTIL_CONSTANTS.DAY_MONTH);
		}
 
		let returnDateStr = null;
		if (data?.selectedTravelDatesInfo?.endDate) {
			returnDateStr = data?.selectedTravelDatesInfo.endDate;
			returnDateStr = formatDate(returnDateStr,UTIL_CONSTANTS.DAY_MONTH);
		}

		let searchProgressProps = {
			source: data?.selectedSourceCityInfo.fullName,
			destination: data?.selectedDestinationCityInfo.fullName,
			onwardDate: toDateStr || "",
			returnDate: returnDateStr || "",
			passengerCount: paxCount,
			journeyType: data?.selectedJourneyType?.value || "",
		};
		return searchProgressProps;
	}
}

function ReactComponent(props) {
	const [searchInProgress, setSearchInProgress] = useState(true);
	useEffect(() => {
		let loaderTimerId = setTimeout(() => {
			setSearchInProgress(false);
		}, 2500);
		document.body.classList.add("no-scroll-on-flight-loader");
		return () => {
			clearTimeout(loaderTimerId);
			document.body.classList.remove("no-scroll-on-flight-loader");
		};
	}, []);

	let SearchProgressProps = getSearchProgressProps();

	if (searchInProgress) {
		return <SearchProgress {...SearchProgressProps} key="search progress" />;
	} else {
		return <></>;
	}
}

ReactComponent.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default ReactComponent;
