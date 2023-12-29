import React, { useEffect, useRef } from "react";
import { seatSelectAppInit } from "seatselect/SeatSelectApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

// Container should expose this variable in window object :: aemGraphqlApiEndpoint, localeValue
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: // : "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";
	  "http://localhost:4502/graphql/execute.json/skyplus6e";

const localeValue = window.locale;

function SeatSelection(props) {
	const ref = useRef(null);
	const [aemConfigData, setAemConfigData] = React.useState({});
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(true);
	const [isHidden, setIsHidden] = React.useState(true);

	useEffect(() => {
		makeAEMCall();
		document.addEventListener(
			"EVENT_PASSENGEREDIT_TOGGLE_LOADING",
			handleToggleLoadingEvent
		);
		return () => {
			document.removeEventListener(
				"EVENT_PASSENGEREDIT_TOGGLE_LOADING",
				handleToggleLoadingEvent
			);
		};
	}, []);

	useEffect(() => {
		if (ref.current && renderConfigDataFlag) {
			seatSelectAppInit(ref.current, { ...props, configData: aemConfigData });
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	const makeAEMCall = () => {
		var requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			},
		};

		// const languageStr = '=/content/dam/skyplus6e/in/hi/global-components/booking-widget/booking-widget';
		// const encodedURLPart = `;path${encodeURIComponent(`${languageStr};variation=${props.pageType};.json`)}`;

		fetch(
			`${aemGraphQlEndpoint}/${props.component}-additional;locale=${localeValue};variation=${props.pageType};.json`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				console.log("---json::::", result);
				if (result) {
					setAemConfigData(result);
					setRenderConfigDataFlag(true);
				}
			})
			.catch((e) => {
				pushAnalytic({
					event: "error",
					error: {
						code: "500",
						message: e.message,
						url: `${aemGraphQlEndpoint}/${props.component}-additional;locale=${localeValue};variation=${props.pageType};.json`,
						type: "api",
						source: "api",
						statusCode: "500",
						statusMessage: e.message,
					},
				});
				setAemConfigData({});
				setRenderConfigDataFlag(true);
			});
	};

	const handleToggleLoadingEvent = (event) => {
		if (!event?.detail.isLoading) {
			setIsHidden(event?.detail.isSeatMapHidden);
		} else {
			setIsHidden(true);
		}
	};
	return (
		// do not use "skyplus-indigo-global-wrapper-v1" class for styling
		<div
			ref={ref}
			className={`skyplus-seat-select skyplus-indigo-global-wrapper-v1 ${
				isHidden ? " skyplus-seat-select--displaynone" : ""
			}`}
		></div>
	);
}

SeatSelection.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default SeatSelection;
