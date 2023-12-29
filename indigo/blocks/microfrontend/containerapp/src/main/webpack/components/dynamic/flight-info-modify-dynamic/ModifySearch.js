import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { PE_PAGETYPE, journeyTypeCode, CONSTANTS } from "../../../utils/constants/common";

const ModifySearch = ({
	departureDestination,
	arrivalDestination,
	journeyDate,
	journeyType,
	paxCount,
	ctaLabel,
	className,
	modifySearchClickHandler,
}) => {
	let extraClasses = `skyplus-modify-search ${
		className !== undefined ? className : ""
	}`;
	const [isModifySearchRequired,setIsModifySearchRequired] = useState(false);

	useEffect(() => {
	    window.addEventListener(CONSTANTS.EVENT_RENDER_HEADER_RIGHT_SECTION, handleRenderEvent);
            return () => {
                window.removeEventListener(CONSTANTS.EVENT_RENDER_HEADER_RIGHT_SECTION, handleRenderEvent);
            };
	}, []);
	
	const handleRenderEvent=(eve)=>{
		console.log("render header options:",eve);
		if(eve?.detail){
			setIsModifySearchRequired(eve?.detail?.isModifySearchRequired);
		}
	};
	return (
		departureDestination &&
		arrivalDestination && (
			<div className={extraClasses}>
				<div className="skyplus-modify-search__left hideFlyout">
					<div className="skyplus-modify-search__left__destinations">
						<span
							className={`skyplus-modify-search__left__destinations__departure ${
								journeyType === journeyTypeCode.ONE_WAY
									? "departure-one-way"
									: "departure-two-way"
							}`}
						>
							{departureDestination}
						</span>
						<span className="skyplus-modify-search__left__destinations__arrival">
							{arrivalDestination}
						</span>
					</div>
					<div className="skyplus-modify-search__left__pax">
						<span className="skyplus-modify-search__left__pax__date">
							{journeyDate}
						</span>
						<span className="skyplus-modify-search__left__pax__passengers">
							{paxCount}
						</span>
					</div>
				</div>
				<div className="skyplus-modify-search__right hideFlyout">
					{(window.pageType === PE_PAGETYPE && !isModifySearchRequired) ? null : <Button
						label={ctaLabel}
						className="skyplus-modify-search__right__modify-search-btn"
						variation="SECONDARY"
						onClickHandler={modifySearchClickHandler}
					/>}
				</div>
			</div>
		)
	);
};

ModifySearch.propTypes = {
	addPassengerLabel: PropTypes.string.isRequired,
	departureDestination: PropTypes.string.isRequired,
	arrivalDestination: PropTypes.string.isRequired,
	journeyDate: PropTypes.string.isRequired,
	paxCount: PropTypes.string.isRequired,
	ctaLabel: PropTypes.string,
	className: PropTypes.string,
	modifySearchClickHandler: PropTypes.func,
	journeyType: PropTypes.string
};
export default ModifySearch;
