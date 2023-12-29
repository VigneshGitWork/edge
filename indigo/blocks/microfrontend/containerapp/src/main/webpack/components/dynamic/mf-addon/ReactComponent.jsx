import React, { useEffect, useState, useRef } from "react";
import isEmpty from "lodash/isEmpty";
import { addonAppInit as addon } from "addon/AddonApp";
// import AddonComponent from "./AddonComponent.jsx";
// import { addonAppInit } from "addon/AddonApp";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";
import { CONSTANTS } from "../../../utils/constants/common";
const aemGraphQlEndpoint = window.aemGraphqlApiEndpoint
	? window.aemGraphqlApiEndpoint
	: "http://localhost:4502/graphql/execute.json/skyplus6e";

function ReactComponent(props) {
	const ref = useRef(null);

	const [aemConfigData, setAemConfigData] = useState(null);
	const [renderConfigDataFlag, setRenderConfigDataFlag] = useState(false);
	const [isHidden, setIsHidden] = React.useState(true);

	useEffect(() => {
		var requestOptions = {
			method: "GET",
			headers: {
				"Access-Control-Allow-Origin": "*",
			},
		};
		const locale = window.locale || "en";

		//http://localhost:4502/graphql/execute.json/skyplus6e/mf-addon-additional;locale=en;variation=
		// console.log(aemGraphQlEndpoint,props.component,locale )
		fetch(
			`${aemGraphQlEndpoint}/${props.component}-additional;locale=${locale};variation=;.json`,
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => {
				if (result) {
					// console.log(result, "resuklt---->")
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
						url: `${aemGraphQlEndpoint}/${props.component}-additional;locale=${locale};variation=;.json`,
						type: "api",
						source: "api",
						statusCode: "500",
						statusMessage: e.message,
					},
				});
				setAemConfigData({});
				setRenderConfigDataFlag(true);
			});
		if (
			!document
				.querySelector(".main-addon-container")
				?.classList?.contains("d-none")
		) {
			document.querySelector(".main-addon-container")?.classList?.add("d-none");
		}
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
		document.addEventListener(CONSTANTS.EVENT_TOGGLE_SECTION, (event) => {
			if (
				event.type === CONSTANTS.EVENT_TOGGLE_SECTION &&
				event?.detail?.activeSection ===
					CONSTANTS.EVENT_TOGGLE_SECTION_ACTION_ADDON
			) {
				document
					.querySelector(".main-addon-container")
					?.classList?.remove("d-none");
			} else {
				document
					.querySelector(".main-addon-container")
					?.classList?.add("d-none");
			}
		});
	}, []);

	React.useEffect(() => {
		if (ref.current && renderConfigDataFlag && !isEmpty(aemConfigData)) {
			addon(ref.current, { ...props, configJson: aemConfigData });
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
	// document.addEventListener("scroll", (event) => {
	//   let scrollPosY = window.scrollY;
	//   let topBookingContainer = document.querySelector(".booking-detail-container");
	//   let topBookingPosY = getOffset(topBookingContainer) && getOffset(topBookingContainer).top;
	//   let topContainer = document.querySelector(".booking-detail-container > .topup-container");
	//   let paxContainer = document.querySelector(".booking-detail-container > .passenger-container");
	//   let topContainerPosY = getOffset(topContainer) && getOffset(topContainer).top;
	//   if((parseInt(scrollPosY) > 62) && (parseInt(topBookingPosY) - parseInt(scrollPosY)) < 0) {
	//     if(!topContainer.classList.contains("stickyTop")) {
	//       topContainer.classList.add("stickyTop");
	//       paxContainer.classList.add("stickyTop")
	//     }
	//   } else {
	//     if(topContainer.classList.contains("stickyTop")) {
	//       topContainer.classList.remove("stickyTop");
	//       paxContainer.classList.remove("stickyTop")
	//     }
	//   }
	// });

	const getOffset = (el) => {
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY,
		};
	};

	return (
		<div
			ref={ref}
			className={`skyplus-addon-container ${
				isHidden ? " skyplus-addon-container--displaynone" : ""
			}`}
		></div>
	);
}

ReactComponent.defaultProps = {
	mfData: JSON.stringify({}),
	persona: "member",
};

export default ReactComponent;
