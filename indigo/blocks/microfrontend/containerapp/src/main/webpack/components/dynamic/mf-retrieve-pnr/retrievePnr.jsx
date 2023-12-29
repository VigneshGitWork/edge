import React, { useEffect, useRef } from "react";
import { retrievePnrAppInit as retrievePnr } from "retrievePnr/RetrievePnrApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

// Container should expose this variable in window object :: aemGraphqlApiEndpoint, localeValue
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: // : "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";
	  "http://localhost:4502/graphql/execute.json/skyplus6e";

const localeValue = window.locale;

function RetrievePnr(props) {
	const ref = useRef(null);
	const [aemConfigData, setAemConfigData] = React.useState({});
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(true);

	console.log("-Retrive PNR app loaded::::");
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
		// eslint-disable-next-line  max-len, react/prop-types
		const url = `${aemGraphQlEndpoint}/${props.component}-additional;locale=${localeValue};variation=${props.pageType};.json`;

		fetch(url, requestOptions)
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
						url,
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
		// if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
		if (ref.current && renderConfigDataFlag) {
			retrievePnr(ref.current, { ...props, configJson: aemConfigData });
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	return <div ref={ref} className={`skyplus-retrive-pnr`}></div>;
}

RetrievePnr.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default RetrievePnr;
