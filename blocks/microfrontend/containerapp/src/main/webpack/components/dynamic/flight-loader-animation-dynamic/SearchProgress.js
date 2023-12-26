import React from "react";
import PropTypes from "prop-types";
import Plane from "./Plane";
import { journeyTypeCode } from "../../../utils/constants/common";

const SearchProgress = ({
	source,
	destination,
	onwardDate,
	returnDate,
	passengerCount,
	journeyType = "",
}) => {
	return (
		// do not use "skyplus-indigo-global-wrapper-v1" class for styling
		<div class="skyplus-indigo-global-wrapper-v1">
			<div className="indigo-flight-animation" id="loadr">
				<Plane />
				<div tabIndex="0" className="indigo-loading-text">
					<b tabIndex="0">Fasten your seatbelts</b>
					<br />
					Loading best fares...
				</div>

				{journeyType !== journeyTypeCode.MULTI_CITY ? (
					<div className="flight-loader-info" id="flight-info">
						<hr />
						<div>
							<strong>
								<span id="f-src" tabIndex="0">
									{source}
								</span>
								<i
									className="skp-iconmoon-icon icomoon-arrow-right"
									id="i-ow"
								></i>
								<span id="f-dest" tabIndex="0">
									{destination}
								</span>
							</strong>
						</div>
						<div className="f-date">
							<span tabIndex="0" id="f-onward-date">
								{onwardDate} &nbsp;
							</span>
							{returnDate && (
								<span id="f-return-date" tabIndex="0">
									• {returnDate}{" "}
								</span>
							)}
							•
							<span id="paxCount" tabIndex="0">
								{" "}
								{passengerCount}
							</span>{" "}
							Passenger(s)
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};

SearchProgress.propTypes = {
	passengerCount: PropTypes.string,
	returnDate: PropTypes.string,
	onwardDate: PropTypes.string,
	source: PropTypes.string,
	destination: PropTypes.string,
};

export default SearchProgress;
