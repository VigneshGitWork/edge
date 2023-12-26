import PropTypes from "prop-types";
import React, {
	useEffect,
	useState,
	useMemo,
	useCallback,
	useRef,
} from "react";
import OtpInput from "./system-design-components/OtpInput/OtpInput";

import Cookies from "../../../utils/functions/cookies";
import { COOKIE_KEYS } from "../../../utils/constants/common";
import { getOtp, submitOtp } from "./services";
import { formattedMessage } from "../../../utils/functions/utils";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

const initialTimer = {
	minutes: 10,
	seconds: 0,
};

const ReactComponent = ({ mfData }) => {
	const readAuthToken = useCallback(
		() => Cookies.get(COOKIE_KEYS.AUTH, true),
		[]
	);

	const [loading, setLoading] = useState(true);
	const [inValidUrl, setInvalidUrl] = useState(false);
	const [authToken, setAuthToken] = useState(readAuthToken);
	const interval = useRef(null);
	const [otpError, setOtpError] = useState("");

	const [initialTimerObj, setInitialTimerObj] = useState(initialTimer);
	const [otpSubheading, setOtpSubheading] = useState("");

	const [showOtpForm, setShowOtpForm] = useState(false);
	const pageloadRef = useRef(false);

	const resendHandler = async () => {
		pushAnalytic({
			event: "deeplink-page-click",
			data: {
				pageInfo: {
					pageName: "Deep Link",
				},
				eventInfo: {
					name: "Resend OTP",
					position: "OTP Verification",
					component: "Deep Link",
				},
			},
		});

		setLoading(true);
		try {
			await otpRequestHandler();
			setInitialTimerObj({ minutes: 10, seconds: 0 });
		} catch (err) {}

		setLoading(false);
	};

	const urlParams = useMemo(() => {
		const urlParams = new URLSearchParams(window.location.search);

		return {
			plkey: urlParams.get("pl") ?? "",
			recordLocator: urlParams.get("pnr") ?? "",
			lastName: urlParams.get("lastname") ?? "",
			email: urlParams.get("email") ?? "",
			flow_identifier: urlParams.get("flow_identifier") ?? "",
			cid: urlParams.get("cid") ?? "",
		};
	}, []);

	useEffect(() => {
		interval.current = setInterval(() => {
			setAuthToken(readAuthToken());
		}, 1000);

		return () => {
			clearInterval(interval.current);
		};
	}, []);

	useEffect(() => {
		const retrieveOtpRequest = async () => {
			if (authToken) {
				clearInterval(interval.current);
				await otpRequestHandler();
			}
		};

		retrieveOtpRequest();
	}, [authToken?.token]);

	const otpRequestHandler = async () => {
		setLoading(true);
		let data = {
			plkey: urlParams.plkey,
			recordLocator: urlParams.recordLocator,
			lastName: urlParams.lastName,
			email: urlParams.email,
		};

		let response = await getOtp(data, authToken.token);

		if (response.status && response.data) {
			if (response.data.otpRequired) {
				const { contactNumber: mobileNumber, email } = response.data;
				setOtpSubheading(
					formattedMessage(mfData.otpSubheading, {
						mobileNumber: mobileNumber ?? "",
						email: email ?? "",
					})
				);
				setShowOtpForm(true);

				// first time load
				if (pageloadRef.current === false) {
					pushAnalytic({
						event: "deeplink-page-popup",
						data: {
							pageInfo: {
								deepLink: "1",
							},
							eventInfo: {
								name: "Deep Link OTP",
							},
							product: {
								productInfo: {
									pnr: urlParams.recordLocator,
								},
							},
						},
					});
				}
			} else {
				redirectToPage();
			}
		} else {
			setInvalidUrl(true);
			setShowOtpForm(true);

			// first time load
			if (pageloadRef.current === false) {
				pushAnalytic({
					event: "deeplink-page-popup",
					data: {
						pageInfo: {
							pageName: "Deep Link",
						},
						eventInfo: {
							name: "Link Expired",
							position: "Deep Link",
						},
					},
				});
			}
		}

		setLoading(false);
		pageloadRef.current = true;
	};

	const submitOtpHandler = async (otp) => {
		setLoading(true);

		let data = {
			plkey: urlParams.plkey,
			recordLocator: urlParams.recordLocator,
			lastName: urlParams.lastName,
			email: urlParams.email,
			otp,
		};

		let response = await submitOtp(data, authToken.token, otp);

		if (response?.data?.success === true) {
			redirectToPage();
		} else {
			setOtpError(mfData.invalidOtpLabel);

			pushAnalytic({
				event: "error",
				error: {
					id: 200,
					code: 200,
					type: "api",
					source: "api",
					url: window.msd.msBookingDeeplinkApiUrl ?? "",
					statusMessage: mfData.invalidOtpLabel,
					message: mfData.invalidOtpLabel,
				},
			});
		}

		setLoading(false);
	};

	const redirectToPage = () => {
		const href =
			Reflect.get(mfData?.flowMapping || {}, urlParams.flow_identifier) ?? "/";

		window.location.href = href + "?cid=" + urlParams.cid;
	};

	return (
		<div className="deeplink-intermediate-page">
			{loading && (
				<div className="overlay">
					<div className="mainLoader-cont">
						<span>Loading...</span>
						<div id="circleG-dark">
							<div id="circleG-dark_1" className="circleG-dark" />
							<div id="circleG-dark_2" className="circleG-dark" />
							<div id="circleG-dark_3" className="circleG-dark" />
						</div>
					</div>
				</div>
			)}

			{showOtpForm && (
				<OtpInput
					renderResentOtp={(minutes, seconds) =>
						minutes === 0 && seconds === 0 ? (
							<a className="resend-otp-button" onClick={resendHandler}>
								{mfData.resendCtaLabel}
							</a>
						) : (
							<span
								className="resend-otp-message"
								dangerouslySetInnerHTML={{
									__html: formattedMessage(mfData.resendOtpLabel, {
										minutes: "<span>" + minutes.toString().padStart(2, "0"),
										seconds: seconds.toString().padStart(2, "0") + "</span> ",
									}),
								}}
							/>
						)
					}
					submitButtonProps={{
						label: mfData.verifyCtaLabel,
						onClickHandler: submitOtpHandler,
						className: "flex-grow-1",
					}}
					initialTimerObj={initialTimerObj}
					invalidOtpLabel={mfData.invalidOtpLabel}
					inValidUrl={inValidUrl}
					otpError={otpError}
					mfData={mfData}
					otpSubheading={otpSubheading}
				/>
			)}
		</div>
	);
};

ReactComponent.defaultProps = {
	mfData: {
		flowMapping: {
			"meals-modify": "/bookings/add-on-modification.html",
			"seat-selection-modify":
				"/bookings/add-on-seat-selection-modification.html",
			"web-check-in": "/check-ins/view.html",
		},
		invalidOtpLabel: "You seem to have entered an invalid OTP",
		otpHeading: "OTP Verification",
		otpSubheading: "Send the OTP to your registered number.",
		resendCtaLabel: "Resend",
		resendOtpLabel: "Resend OTP in {minutes}:{seconds} sec",
		verifyCtaLabel: "Verify",
		linkExpiredHeading: "Oops,",
		linkExpiredSubheading: "This link has expired",
		redirectToHomepageLabel: "Go to homepage",
	},
};

ReactComponent.propTypes = {
	mfData: PropTypes.any,
};

export default ReactComponent;
