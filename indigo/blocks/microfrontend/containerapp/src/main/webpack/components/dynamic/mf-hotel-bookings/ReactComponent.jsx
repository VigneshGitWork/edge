import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import isEmpty from "lodash/isEmpty";

import { hotelBookingsAppInit as appInit } from "hotelBookings/App";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

const aemGraphQlEndpoint =
	window.aemGraphqlApiEndpoint ??
	"http://localhost:4502/graphql/execute.json/skyplus6e";

function ReactComponent(props) {
	const { component } = props;
	const ref = useRef(null);

	const [aemConfigData, setAemConfigData] = useState(null);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = useState(false);

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};
		const locale = window.locale || "en";

		const url = `${aemGraphQlEndpoint}/${component}-additional;locale=${locale};variation=;.json`;

		fetch(url, requestOptions)
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
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			appInit(ref.current, { ...props, configJson: aemConfigData });
			setRenderConfigDataFlag(false);
		}
	}, [aemConfigData]);

	return <div ref={ref} />;
}

ReactComponent.propTypes = {
	component: PropTypes.string,
};

ReactComponent.defaultProps = {
	mfData: JSON.stringify({}),
};

export default ReactComponent;
