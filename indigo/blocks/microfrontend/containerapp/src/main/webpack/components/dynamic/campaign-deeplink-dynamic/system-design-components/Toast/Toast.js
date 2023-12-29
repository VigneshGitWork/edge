import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Toast = ({
	onClose,
	position = "top-bottom",
	isAnimate = true,
	autoDismissTimeer,
	renderToastContent,
	containerClass,
	title,
	description,
	variation,
	mainToastWrapperClass,
}) => {
	const [dismiss, setDismiss] = useState(false);
	useEffect(() => {
		if (autoDismissTimeer) {
			setTimeout(() => {
				setDismiss(true);
				onClose && onClose();
			}, autoDismissTimeer);
		}
	}, []);

	return dismiss ? null : (
		<div className={`skyplus-design-toast ${mainToastWrapperClass}`}>
			<div
				className={`skyplus-design-toast-container ${containerClass} ${variation} ${position} ${
					isAnimate ? "" : "no-animate"
				}`}
			>
				{onClose && (
					<i
						className="skyplus-design-toast__close icon-close-btn skp-iconmoon-icon"
						onClick={onClose}
					></i>
				)}
				<div
				// className={`notification ${position}`}
				>
					{renderToastContent ? (
						renderToastContent()
					) : (
						<div className="notifi-variation-container">
							<div className="notifi-variation-icon-wrapper">
								<i className="icomoon-icon-information"></i>
							</div>
							<div className="col">
								<h5 className="title">{title}</h5>
								<ul className="content">
									<li
										className="desc"
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

Toast.propTypes = {
	onClose: PropTypes.func,
	position: PropTypes.oneOf([
		"top-bottom",
		"bottom-top",
		"top-right",
		"bottom-right",
		"top-left",
		"bottom-left",
	]),
	isAnimate: PropTypes.bool,
	autoDismissTimeer: PropTypes.number,
	renderToastContent: PropTypes.func,
	containerClass: PropTypes.string,
	variation: PropTypes.oneOf([
		"notifi-variation--error",
		"notifi-variation--info",
	]),
	title: PropTypes.string,
	description: PropTypes.string,
	mainToastWrapperClass: PropTypes.string,
};

export default Toast;
