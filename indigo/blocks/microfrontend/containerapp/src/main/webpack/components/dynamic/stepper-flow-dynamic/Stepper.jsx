import React, { useState } from "react";
import PropTypes from "prop-types";
import { STEPPER_COMP_KEYS } from "../../../utils/constants/common.js";

const { ACTIVE_SECTIONS } = STEPPER_COMP_KEYS;

const Stepper = ({
	addPassengerLabel,
	addonLabel,
	seatSelectLabel,
	paymentLabel,
	className,
	activeSectionKey,
	dispatchEventWithSection
}) => {
	let stepperClasses = `skyplus-container-stepper ${className !== undefined ? className : ""
		}`;
	const isPassengerEditClickEnabled = [ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_ADDON, ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_SEAT].includes(activeSectionKey);
	const isAddonClickEnabled = [ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_SEAT].includes(activeSectionKey);

	return (<ul className={stepperClasses}>
			{addPassengerLabel && <li className={`skyplus-container-stepper__stage skyplus-container-stepper__stage--add-passenger ${isPassengerEditClickEnabled ? " skyplus-container-stepper__stage__pointer": ""}`}
				onClick={ isPassengerEditClickEnabled ?
					() => dispatchEventWithSection && dispatchEventWithSection(ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_PAX_EDIT)
					: null}
				// we will enable this functionality once we enable modificatio flow
			>
				<i className="skyplus-container-stepper__stage__icon skyplus-container-stepper__stage--add-passenger__icon">
					<span className="skyplus-container-stepper__stage__icon__line  skyplus-container-stepper__stage--add-passenger__icon__line"></span>
				</i>
				<span className="skyplus-container-stepper__stage__label">
					{addPassengerLabel}
				</span>
			</li>}
			{addonLabel && <li className={`skyplus-container-stepper__stage skyplus-container-stepper__stage--addon ${isAddonClickEnabled ? " skyplus-container-stepper__stage__pointer" : ""}`}
				onClick={ isAddonClickEnabled ?
					() => dispatchEventWithSection && dispatchEventWithSection(ACTIVE_SECTIONS.EVENT_TOGGLE_SECTION_ACTION_ADDON)
					: null}
			>
				<i className="skyplus-container-stepper__stage__icon skyplus-container-stepper__stage--addon__icon">
					<span className="skyplus-container-stepper__stage__icon__line skyplus-container-stepper__stage--addon__icon__line"></span>
				</i>
				<span className="skyplus-container-stepper__stage__label">{addonLabel}</span>
			</li>}
			{seatSelectLabel && <li className="skyplus-container-stepper__stage skyplus-container-stepper__stage--seat-select">
				<i className="skyplus-container-stepper__stage__icon skyplus-container-stepper__stage--seat-select__icon">
					<span className="skyplus-container-stepper__stage__icon__line skyplus-container-stepper__stage--seat-select__icon__line"></span>
				</i>
				<span className="skyplus-container-stepper__stage__label">{seatSelectLabel}</span>
			</li>}
			{paymentLabel && <li className="skyplus-container-stepper__stage skyplus-container-stepper__stage--payment">
				<i className="skyplus-container-stepper__stage__icon skyplus-container-stepper__stage--payment__icon">
					<span className="skyplus-container-stepper__stage__icon__line skyplus-container-stepper__stage--payment__icon__line"></span>
				</i>
				<span className="skyplus-container-stepper__stage__label">{paymentLabel}</span>
			</li>}
		</ul>
	);
};

Stepper.propTypes = {
	addPassengerLabel: PropTypes.string.isRequired,
	addonLabel: PropTypes.string.isRequired,
	seatSelectLabel: PropTypes.string.isRequired,
	paymentLabel: PropTypes.string.isRequired,
	className: PropTypes.string,
	activeSectionKey: PropTypes.string,
	dispatchEventWithSection: PropTypes.func
};
export default Stepper;
