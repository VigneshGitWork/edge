import React, { useEffect, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { srpAppInit } from "srp/SearchResultsApp";
import Cookies from "../../../utils/functions/cookies";
import { COOKIE_KEYS } from "../../../utils/constants/common";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

//Container should expose this variable in window object :: aemGraphqlApiEndpoint, localeValue
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: "http://localhost:4502/graphql/execute.json/skyplus6e/mf-srp-additional;locale=en;variation=";

const localeValue = window.locale;

function SrpComponent(props) {
	const ref = useRef(null);
	const authTokenCookieValue = Cookies.get(COOKIE_KEYS.AUTH, true);
	const [aemConfigData, setAemConfigData] = React.useState({});
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(false);
	const [authToken, setAuthToken] = React.useState(authTokenCookieValue);
	const [reloadFlag, setReloadFlag] = React.useState(false);

	const fetchGraphQlData = () => {
		var requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};
		fetch(
			`${aemGraphQlEndpoint}/${props.component}-additional;locale=${localeValue};variation=;.json`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result) {
					setAemConfigData(result || null);
					setRenderConfigDataFlag(true);
				}
			})
			.catch((e) => {
				pushAnalytic({
					event: "error",
					error: {
						code: "500",
						message: e.message,
						url: `${aemGraphQlEndpoint}/${props.component}-additional;locale=${localeValue};variation=;.json`,
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

	React.useEffect(() => {
		// if (authToken && typeof authToken === "object") {
		const getSrpAemData = async () => {
			await fetchGraphQlData();
		};
		getSrpAemData();
		// }
	}, [authToken]);

	useEffect(() => {
		document.addEventListener("authTokenSetEvent", (event) => {
			setAuthToken(event.detail.token);
			setReloadFlag((prevState) => !prevState);
		});
		return () => {
			document.removeEventListener("authTokenSetEvent", {});
		};
	}, []);

	React.useEffect(() => {
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			srpAppInit(ref.current, {
				...props,
				configJson: aemConfigData,
				reload: reloadFlag,
			});
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData, reloadFlag]);

	return <div ref={ref}></div>;
}

SrpComponent.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default SrpComponent;
