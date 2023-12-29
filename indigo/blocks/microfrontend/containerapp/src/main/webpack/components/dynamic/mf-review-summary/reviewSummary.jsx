import React, { useEffect, useRef } from "react";
// import { srpAppInit } from "srp/SearchResultsApp";
import { reviewSummaryAppInit as reviewSummary } from "reviewSummary/ReviewSummaryApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

// Container should expose this variable in window object :: aemGraphqlApiEndpoint, localeValue
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: // : "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";
	  "http://localhost:4502/graphql/execute.json/skyplus6e";

const localeValue = window.locale;

function ReviewSummary(props) {
	const ref = useRef(null);
	const [aemConfigData, setAemConfigData] = React.useState({});
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(true);
	const [isHidden, setIsHidden] = React.useState(true);
	console.log("-Review app loaded::::");
	useEffect(() => {
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

	React.useEffect(() => {
		// if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
		if (ref.current && renderConfigDataFlag) {
			reviewSummary(ref.current, { ...props, configJson: aemConfigData });
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	const handleToggleLoadingEvent = (event) => {
		if (!event?.detail.isLoading) {
			setIsHidden(false);
		} else {
			setIsHidden(true);
		}
	};

	return (
		<div
			ref={ref}
			className={`skyplus-review-summary ${
				isHidden ? " skyplus-review-summary--displaynone" : ""
			}`}
		></div>
	);
}

ReviewSummary.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default ReviewSummary;
