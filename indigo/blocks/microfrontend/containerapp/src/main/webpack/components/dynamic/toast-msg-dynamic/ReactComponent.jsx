import React, { useEffect, useRef, useState } from "react";
import {
	getLocalStorage,
	setLocalStorage,
} from "../../../utils/functions/storage";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

import { localStorageKeys } from "../../../utils/constants/common";
import { configJson } from "./genericAemData";
import Toast from "./Toast";
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: "http://localhost:4502/graphql/execute.json/skyplus6e";
const localeValue = window.locale;
function ReactComponent(props) {
	const ref = useRef(null);
	const timeoutRef = useRef(null);
	const [isWelcomeToast, setisWelcomeToast] = useState(false);

	const [aemConfigData, setAemConfigData] = React.useState(configJson);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(true);
	const initToastProps = {
		variation: "info",
		title: "",
		description: "You have been logged in successfully",
	};

	const propsToast = {
		onClose: (e) => setisWelcomeToast(false),
		variation: `notifi-variation--${initToastProps.variation}`,
		title: initToastProps?.title,
		description: initToastProps?.description,
		containerClass: `${initToastProps.variation}-design-toast`,
	};
	const [toastEventProps, settoastEventProps] = useState(propsToast);

	let labels = {};
	try {
		labels = JSON.parse(props.mfData);
	} catch (ex) {
		labels = {};
	}

	const initTimeout = (timeoutDelay = 0.1) => {
		clearTimeout(timeoutRef.current);
		timeoutRef.current = null;
		timeoutRef.current = setTimeout(() => {
			setisWelcomeToast(false);
		}, timeoutDelay * 60 * 1000);
	};

	const initTimeoutWithTimeoutDuration = () => {
		initTimeout(labels?.sessionTimeoutDuration);
	};

	const getGenericData = () => {
		const genericData = getLocalStorage(
			localStorageKeys.GENERIC_DATA_CONTAINER_APP
		); //Get generic data for container app
		const expireTimeStamp = genericData?.expiryTimeStamp || -1;
		const isExpired = expireTimeStamp && new Date().getTime() > expireTimeStamp;
		if (genericData && genericData?.info_errorMessageItemList && !isExpired) {
			setAemConfigData(genericData);
			setRenderConfigDataFlag(true);
		} else {
			var requestOptions = {
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			};
			fetch(
				`${aemGraphQlEndpoint}/generic-data;locale=${localeValue};variation=;.json`,
				requestOptions
			)
				.then((response) => response.json())
				.then((result) => {
					if (result) {
						const expiryTimeStamp = new Date().setHours(
							new Date().getHours() + 2
						);
						// setting expiry date as 24hrs

						setAemConfigData(result?.data);
						setRenderConfigDataFlag(true);
						let formatData = result?.data;
						const infoErrorMessageItemList =
							formatData?.info_errorMessageItemList;
						const infoErrorMessageItems = infoErrorMessageItemList?.items;
						let infoErrorMessageItemsObj = {};
						if (infoErrorMessageItems && infoErrorMessageItems.length) {
							infoErrorMessageItems.forEach((item) => {
								infoErrorMessageItemsObj[item?.code] = { ...item };
							});
							formatData = {
								...formatData,
								info_errorMessageItemList: {
									items: infoErrorMessageItemsObj || infoErrorMessageItems,
								},
								expiryTimeStamp,
							};
						}
						setLocalStorage(
							localStorageKeys.GENERIC_DATA_CONTAINER_APP,
							formatData
						);
					}
				})
				.catch((e) => {
					pushAnalytic({
						event: "error",
						error: {
							code: "500",
							message: e.message,
							url: `${aemGraphQlEndpoint}/generic-data;locale=${localeValue};variation=;.json`,
							type: "api",
							source: "api",
							statusCode: "500",
							statusMessage: e.message,
						},
					});
					setAemConfigData(configJson);
					setRenderConfigDataFlag(true);
				});
		}
	};

	const getInfoErrorMessage = (type, code, title, message) => {
		const configedatas = aemConfigData?.info_errorMessageItemList?.items;
		const displayConfigueData = configedatas.filter(
			(item) => item.code == code
		)[0];
		const obj = {
			title: title !== undefined ? title : displayConfigueData.type,
			message:
				displayConfigueData?.message !== undefined
					? displayConfigueData?.message
					: message,
			type: type !== undefined ? type : displayConfigueData.type,
		};
		return obj;
	};
	useEffect(() => {
		getGenericData();
	}, []);

	useEffect(() => {
		initTimeoutWithTimeoutDuration();
		document.addEventListener("genericToastMessageEvent", (event) => {
			const getToastDetail = event?.detail;
			if (event.type === "genericToastMessageEvent" && getToastDetail) {
				const labelObj = getInfoErrorMessage(
					event?.detail?.type,
					event?.detail?.code,
					event?.detail?.title,
					event?.detail?.message
				);
				console.log("labelObj", labelObj);
				let setToastDetail = {};
				if (labelObj?.type !== undefined || labelObj?.message !== undefined) {
					setToastDetail = {
						onClose: (e) => setisWelcomeToast(false),
						variation: `notifi-variation--${labelObj.type}`,
						title: labelObj?.title,
						description: labelObj?.message,
						containerClass: `${labelObj?.type}-design-toast`,
					};
				} else {
					console.log("getToastDetail", getToastDetail);
					setToastDetail = {
						onClose: (e) => setisWelcomeToast(false),
						variation: `notifi-variation--${getToastDetail.type}`,
						title: getToastDetail?.title,
						description: getToastDetail?.message,
						containerClass: `${getToastDetail?.type}-design-toast`,
					};
				}
				settoastEventProps(setToastDetail);
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
				setisWelcomeToast(true);
				initTimeoutWithTimeoutDuration();
			}
		});
	}, []);

	useEffect(() => {
		if (ref.current) {
			Toast(ref.current, {
				...{
					labels,
					onClose: () => setisWelcomeToast(false),
					isWelcomeToast: isWelcomeToast,
					...toastEventProps,
				},
			});
		}
	}, [isWelcomeToast]);

	return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
	mfData: JSON.stringify({
		sessionTimeoutDuration: 0.1,
		data: {
			info_errorMessageItemList: {
				items: [
					{
						type: "Error",
						code: "nsk-server:Credentials:Failed",
						message:
							"Invalid username or password.Please try again and make sure that caps is not turned on your computer keyboard.",
					},
					{
						type: "Error",
						code: "E001",
						message: "Mandatory Field Missing/Null",
					},
					{
						type: "Error",
						code: "E002",
						message: "Object Missing/Null",
					},
					{
						type: "Error",
						code: "E003",
						message: "Secret Key Not Supplied",
					},
					{
						type: "Error",
						code: "E004",
						message: "No record found",
					},
					{
						type: "Error",
						code: "E005",
						message: "Internal Server Error",
					},
					{
						type: "Info",
						code: "Login successful",
						message: "User logged in successfully",
					},
				],
			},
		},
	}),
};

export default ReactComponent;
