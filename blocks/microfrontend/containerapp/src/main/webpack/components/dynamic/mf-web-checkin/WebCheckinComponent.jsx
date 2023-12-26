import React, { useRef } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { webCheckinAppInit as webCheckin } from "webCheckin/webCheckinApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

// container should expose this variable in window object
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: "https://aem-dev-skyplus6e.goindigo.in/graphql/execute.json/skyplus6e";

const localeValue = window.locale;

function WebCheckinComponent(props) {
	const ref = useRef(null);
	const [aemConfigData, setAemConfigData] = React.useState(null);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = React.useState(false);

	const fetchGraphQlData = () => {
		const requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};
		fetch(
			`${aemGraphQlEndpoint}/${props?.component}-${props?.pageType};locale=${localeValue};variation=${props?.pageType};.json`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
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
						url: `${aemGraphQlEndpoint}/${props.component}-additional;locale=${localeValue};variation=;.json`,
						type: "api",
						source: "api",
						statusCode: "500",
						statusMessage: e.message,
					},
				});
				setAemConfigData(null);
				setRenderConfigDataFlag(true);
			});
	};

	React.useEffect(() => {
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			webCheckin(ref.current, {
				...props,
				configJson: aemConfigData,
			});
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	React.useEffect(() => {
		const getWebCheckinAemData = async () => {
			const response = await fetchGraphQlData();
		};
		getWebCheckinAemData();
	}, []);

	return <div className="web-checkin-mf-wrapper" ref={ref}></div>;
}

WebCheckinComponent.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required as of now
};

WebCheckinComponent.propTypes = {
	pageType: PropTypes.string,
	component: PropTypes.string,
};
export default WebCheckinComponent;
