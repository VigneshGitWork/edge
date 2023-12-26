import React, { useEffect, useState } from "react";
import Stepper from "./Stepper.jsx";
import { PE_PAGETYPE, STEPPER_COMP_KEYS } from "../../../utils/constants/common.js";

const { EVENT_TOGGLE_SECTION, ACTIVE_SECTIONS, EVENT_BACK_BUTTON_CLICK } = STEPPER_COMP_KEYS;

function StepperPlaceholder() {
	const [activeClassName, setActiveClassName] = useState("skyplus-container-stepper--one");
	const [activeSectionKey, setActiveSectionKey] = useState(ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT);
	const [stepperProps,setStepperProps] = React.useState({});

	useEffect(() => {
		document.addEventListener(EVENT_TOGGLE_SECTION, watchToggleEvent);
		document.addEventListener("EVENT_PASSENGEREDIT_TOGGLE_LOADING",handleToggleLoadingEvent);
		return ()=>{
		  document.removeEventListener("EVENT_PASSENGEREDIT_TOGGLE_LOADING",handleToggleLoadingEvent);
		};
	}, []);
	useEffect(() => {
		 // event will be triggered from static->header component
		document.addEventListener(EVENT_BACK_BUTTON_CLICK, onClickGoBack);
		return ()=>{
		  document.removeEventListener(EVENT_BACK_BUTTON_CLICK, onClickGoBack);
		};
	}, [activeSectionKey]);

	const handleToggleLoadingEvent= (event) =>{
		let temp = {
			addPassengerLabel: "Add Passenger",
			addonLabel: "6E Add-ons",
			seatSelectLabel: "Select Seat",
			paymentLabel: "Payment",
			// className: "skyplus-container-stepper--one",
		};
		if(!event?.detail.isLoading){
		  if(event?.detail.isSeatMapHidden){
			temp = {
				addPassengerLabel: "Add Passenger",
				addonLabel: "6E Add-ons",
				paymentLabel: "Payment",
				// className: "skyplus-container-stepper--one",
			};
		  }
		}
		setStepperProps(temp);
	  };

	const toggleEvent = (config) =>
		new CustomEvent(STEPPER_COMP_KEYS.EVENT_TOGGLE_SECTION, config);

	const watchToggleEvent = (event) => {
		console.log("-container::toggle mapper::", event);
		const eventActionSection = event?.detail?.activeSection || "";
		let activeStep = "one";
		switch (eventActionSection) {
			case ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_ADDON:
				activeStep = "two";
				setActiveSectionKey(ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_ADDON);
				break;
			case ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_SEAT:
				activeStep = "three";
				setActiveSectionKey(ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_SEAT);
				break;
			default:
				setActiveSectionKey(ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT);
				break;
		}
		setActiveClassName(`skyplus-container-stepper--${activeStep}`);

	};

	const dispatchEventWithSection = (clickActionSectionName) => {
		const dataToPass = {
			from: "stepperdynamic",
			activeSection: clickActionSectionName,
		};
		document.dispatchEvent(
			toggleEvent({
				bubbles: true,
				detail: dataToPass
			})
		);
	};
	const onClickGoBack = () => {
		if (window.pageType === PE_PAGETYPE) {
			let goBackSection = "";
			switch (activeSectionKey) {
				case ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_ADDON:
					goBackSection = ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT;
					break;
				case ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_SEAT:
					goBackSection = ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_ADDON;
					break;
				default:
					break;
			}
			goBackSection ? dispatchEventWithSection(goBackSection) : history.back();
		} else {
			history.back();
		}
	};
	if (window.pageType === PE_PAGETYPE) {
		return (
			<div className="stepper-header-placeholder skyplus6e-header__stepper-flow">
				<Stepper {...stepperProps} className={activeClassName}
					dispatchEventWithSection={dispatchEventWithSection}
					activeSectionKey={activeSectionKey} />
				{/* <span onClick={onClickGoBack} className="stepper-show-only-mobile"><i className="stepper-go-backicon" /></span> */}
			</div>
		);
	} else {
		return null;
	}
}

StepperPlaceholder.defaultProps = {
	pageType: "", // describes the variation home or srp
	persona: "wwc", // not required in booking as of now
};

export default StepperPlaceholder;
