import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import InputTextField from "../InputTextField/InputTextField";
import Button from "../Button/Button";

import { pushAnalytic } from "../../../../../utils/functions/analyticEvents";

const OtpInput = ({
	otpLength = 6,
	renderResentOtp,
	initialTimerObj,
	submitButtonProps,
	otpError,
	inValidUrl,
	mfData,
	otpSubheading,
}) => {
	const {
		otpHeading,
		redirectToHomepageLabel,
		linkExpiredHeading,
		linkExpiredSubheading,
	} = mfData;
	const [otpNumber, setOtpNumber] = useState([]);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	let otpTimerInterval = null;

	useEffect(() => {
		setMinutes(initialTimerObj.minutes);
		setSeconds(initialTimerObj.seconds);
	}, [initialTimerObj]);

	useEffect(() => {
		if (inValidUrl) {
			return;
		}

		otpTimerInterval = setTimeout(() => {
			if (seconds === 0 && minutes === 0) {
				clearTimeout(otpTimerInterval);
			} else if (seconds === 0 && minutes > 0) {
				setMinutes((minute) => minute - 1);
				setSeconds(59);
			} else if (seconds > 0) {
				setSeconds((seconds) => seconds - 1);
			}
		}, 1000);
		return () => {
			clearTimeout(otpTimerInterval);
		};
	}, [minutes, seconds]);

	const inputProps = {
		label: "",
		variation: "DEFAULT",
		customClass: "skyplus-otpInput__otp-input",
		type: "text",
		maxLength: 1,
	};

	/**
	 *
	 * @param {KeyboardEvent<HTMLInputElement>} elmnt
	 */
	const onKeyUpHandler = (elmnt) => {
		if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
			elmnt?.currentTarget?.parentElement?.previousSibling
				?.querySelector("input")
				?.focus();
		} else {
			const next = elmnt.target.tabIndex;
			if (next < otpLength) {
				elmnt?.currentTarget?.parentElement?.nextSibling
					?.querySelector("input")
					?.focus();
			}
		}
	};

	const onChnageOtpField = (index, value) => {
		if (value && !/^\d+$/.test(value)) return;
		let temp = [...otpNumber];
		temp[index] = value;
		setOtpNumber(temp);
	};

	const onSubmitHandler = () => {
		pushAnalytic({
			event: "deeplink-page-click",
			data: {
				pageInfo: {
					pageName: "Deep Link",
				},
				eventInfo: {
					name: "Verify",
					position: "OTP Verification",
					component: "Deep Link",
				},
			},
		});
		submitButtonProps.onClickHandler(otpNumber.join(""));
	};

	const onClickGoToHomeHandler = () => {
		pushAnalytic({
			event: "deeplink-page-click",
			data: {
				pageInfo: {
					pageName: "Deep Link",
				},
				eventInfo: {
					name: "Go to Homepage",
					position: "Deep Link",
				},
			},
		});

		const homepageUrl =
			document.querySelector(".skyplus6e-header")?.dataset?.homepagepath ?? "/";
		location.href = homepageUrl;
	};

	const otp = otpNumber.filter((n) => n !== "").join("");
	const otpL = otp.length;

	return (
		<div className="popup-modal-with-content">
			<div className="popup-modal-with-content__bg-overlay">
				<div className="popup-modal-with-content__content">
					{inValidUrl ? (
						<div className="invalid-url">
							<div className="invalid-url__icon"></div>
							<div className="invalid-url__heading">{linkExpiredHeading}</div>
							<div className="invalid-url__label">{linkExpiredSubheading}</div>
							<Button
								label={redirectToHomepageLabel}
								onClickHandler={onClickGoToHomeHandler}
							/>
						</div>
					) : (
						<div className="skyplus-otpInput">
							<p className="otp-fields__sub-heading">{otpHeading}</p>
							<div className="otp-fields">{otpSubheading}</div>
							<div
								className={`skyplus-otpInput__container ${
									otpL === otpLength ? "right" : ""
								}`}
							>
								{Array.from(Array(otpLength)).map((item, index) => {
									let customInputProps = {
										tabIndex: index + 1,
										id: "otpF" + index,
										autoComplete: "off",
										onKeyUp: onKeyUpHandler,
									};
									return (
										<InputTextField
											key={index}
											{...inputProps}
											value={otpNumber[index]}
											inputProps={customInputProps}
											onChangeHandler={(val) => onChnageOtpField(index, val)}
										/>
									);
								})}
							</div>
							{renderResentOtp ? renderResentOtp(minutes, seconds) : null}
							{otpError && <div className="otp-error">{otpError}</div>}
							<div className="otp-fields__buttonRight d-flex gap-2 mt-4">
								<Button
									{...submitButtonProps}
									onClickHandler={onSubmitHandler}
									disabled={otpL !== otpLength}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

OtpInput.displayName = "OtpInput";
OtpInput.propTypes = {
	otpLength: PropTypes.number,
	onChangeHandler: PropTypes.func,
	containerClass: PropTypes.string,
	invalidOtpLabel: PropTypes.string,
	otpSubheading: PropTypes.string,
	otpError: PropTypes.string,
	renderResentOtp: PropTypes.func,
	initialTimerObj: PropTypes.shape({
		minutes: PropTypes.number,
		seconds: PropTypes.number,
	}),
	submitButtonProps: PropTypes.any,
	resendButtonProps: PropTypes.any,
	cancelButtonProps: PropTypes.any,
	inValidUrl: PropTypes.bool,
	mfData: PropTypes.any,
};

export default OtpInput;
