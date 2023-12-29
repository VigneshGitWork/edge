import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
// import { srpAppInit } from "srp/SearchResultsApp";
import { passengerEditAppInit as passengerEdit } from "passengerEdit/PassengerEditApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

// Container should expose this variable in window object :: aemGraphqlApiEndpoint, localeValue
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: // : "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";
	  "http://localhost:4502/graphql/execute.json/skyplus6e";

const localeValue = window.locale;

function PassengerEdit(props) {
	const ref = useRef(null);
	const [aemConfigData, setAemConfigData] = React.useState(null);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(true);

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
	}, []);

	React.useEffect(() => {
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			passengerEdit(ref.current, { ...props, configJson: aemConfigData });
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	return <div ref={ref}></div>;
}

PassengerEdit.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default PassengerEdit;
