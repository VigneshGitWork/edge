import React, { Fragment, useEffect, useState } from "react";
import { COOKIE_KEYS, SRP_PAGETYPE } from "../../../utils/constants/common";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";
import { localStorageKeys } from "../../../utils/constants/localStorageConstants";
import Cookies from "../../../utils/functions/cookies";
import { getLocalStorage, setLocalStorage } from "../../../utils/storage";
import * as Constants from "../../../utils/constants";
const { BASE_API_URL, BOOKING_BASE_URL, CURRENCY_API, MS_BW_USER_KEY } =
	Constants;

const CurrencyDropdown = () => {
	const [currencyList, setCurrencyList] = useState();
	const lsData = getLocalStorage(localStorageKeys.BOOKING_CONTEXT_VALUES);
	const [currencySelected, setCurrencySelected] = useState(
		lsData?.selectedCurrency?.currencyCode ||
			lsData?.selectedCurrency?.value ||
			"INR"
	);
	let authData = null;
	try {
		authData = JSON.parse(Cookies.get(COOKIE_KEYS.AUTH));
	} catch (e) {}
	const fetchCurrencyData = async () => {
		try {
			const apiPath = `${BOOKING_BASE_URL}${CURRENCY_API}`;
			const response = await fetch(apiPath, {
				headers: {
					"Content-Type": "application/json",
					Authorization: authData?.token,
					...(Boolean(MS_BW_USER_KEY?.trim())
						? { user_key: MS_BW_USER_KEY.trim() }
						: {}),
				},
			});
			const data = await response.json();
			setCurrencyList(data?.currencies);
		} catch (e) {
			pushAnalytic({
				event: "error",
				error: {
					code: "500",
					message: e.message,
					url: `${BOOKING_BASE_URL}${CURRENCY_API}`,
					type: "api",
					source: "api",
					statusCode: "500",
					statusMessage: e.message,
				},
			});
		} finally {
			document.addEventListener("ModifyBookingEvent", function (event) {
				const bookingData = event.detail.bookingData;
				setCurrencySelected(
					bookingData?.selectedCurrency?.currencyCode ||
						bookingData?.selectedCurrency?.value ||
						"INR"
				);
			});
		}
	};

	useEffect(() => {
		if (window.pageType === SRP_PAGETYPE) {
			fetchCurrencyData();
		}
	}, []);

	const ModifyBookingEvent = (config) =>
		new CustomEvent("ModifyBookingEvent", config);

	const handleCurrencyChange = (e) => {
		const currCode = e.target.value;
		setCurrencySelected(currCode);

		const lsData = getLocalStorage(localStorageKeys.BOOKING_CONTEXT_VALUES);
		if (lsData) {
			const currObj = findFromCurrency(currCode);
			currObj.label = currObj.description;
			currObj.value = currObj.currencyCode;
			lsData.selectedCurrency = currObj;
			setLocalStorage(localStorageKeys.BOOKING_CONTEXT_VALUES, lsData);

			document.dispatchEvent(
				ModifyBookingEvent({
					bubbles: true,
					detail: { bookingData: { ...lsData } },
				})
			);
		}
	};

	const findFromCurrency = (code) => {
		if (!currencyList) return false;
		return currencyList.find((curele) => code === curele?.currencyCode);
	};

	if (!currencyList?.length) {
		return <div className="means-this-ele-rendered"></div>;
	}

	if (window.pageType === SRP_PAGETYPE) {
		return (
			<select
				className="cur-sel"
				value={currencySelected}
				onChange={handleCurrencyChange}
			>
				{(currencyList || []).map((currency, index) => (
					<option
						key={"CURRENCY_ITEM_" + currency?.currencyCode + index}
						value={currency?.currencyCode}
					>
						{currency?.currencyCode}
					</option>
				))}
			</select>
		);
	}
	return <Fragment />;
};

export default CurrencyDropdown;
