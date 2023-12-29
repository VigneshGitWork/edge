/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import hurryupSessionPopup from "./HurryupTimer";
import { getPersonaBasedLogoRedirectHomePage } from "../../../utils/functions/utils";

function ReactComponent(props) {
	let labels = {};
	const ref = useRef(null);
	const timeoutRef = useRef(null);
	const [showPopup, setShowPopup] = useState("");
	const showHurruyPopupRef = useRef(showPopup);

	try {
		labels = JSON.parse(props.mfData);
	} catch (ex) {
		if (props.mfData && props.mfData.cancelLabel) {
			labels = props.mfData;
		} else {
			labels = {};
		}
	}

	const onCancelClick = () => {
		setShowPopup("cancel");
		window.location.href = getPersonaBasedLogoRedirectHomePage();
	};

	const onContinueClick = () => {
		setShowPopup("continue");
	};

	const setClosePopup = () => {
		setShowPopup("close");
	};

	useEffect(() => {
		document.addEventListener("hurryupSessionExpiredEvent", () => {
			setShowPopup("cancelled");
		});

		document.addEventListener("hurryupSessionEvent", (event) => {
			const eventData = event?.detail || {};
			if (eventData?.type === "popup") {
				setShowPopup(eventData.status);
			}
		});
	}, []);

	useEffect(() => {
		if (ref.current) {
			hurryupSessionPopup(ref.current, {
				...{
					labels,
					...props,
					showPopup,
					onCancelClick,
					onContinueClick,
					setClosePopup,
				},
			});
		}
		showHurruyPopupRef.current = showPopup;
	}, [showPopup]);

	return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
	popupTimer: 2,
	mfData: JSON.stringify({
		cancelLabel: "Cancel",
		continueBookingLabel: "Continue Booking",
		completeBookingText:
			"<p>Hurry up and complete your booking, fares might change in</p>\n",
	}),
};

export default ReactComponent;
