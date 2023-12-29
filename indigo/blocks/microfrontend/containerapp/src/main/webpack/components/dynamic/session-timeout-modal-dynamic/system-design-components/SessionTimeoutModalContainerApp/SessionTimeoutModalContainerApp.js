/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { ModalWrapperSessionTimeout } from "../ModalWrapperSessionTimeout";
// import parse from "html-react-parser";

const SessionTimeoutModal = ({
	labels,
	onAfreshClick,
	onCloseHandler,
	onContinueClick,
	startAfreshCtaPath,
}) => {
	return (
		<ModalWrapperSessionTimeout
			className="sessiontimeoutmodal"
			onCloseHandler={onCloseHandler}
		>
			<div className="session-generic-modal">
				<div className="session-generic-modal__content">
					<div className="session-generic-modal__header"></div>
					<div className="session-generic-modal__body">
						<img
							alt="loading"
							loading="lazy"
							src={labels?.timerImage || ""}
							className="session-modal__image"
						/>
						<h4
							className="message"
							dangerouslySetInnerHTML={{ __html: labels?.titleText || "" }}
						/>
					</div>
					<div className="session-generic-modal__footer">
						<div className="btn-group">
							<a
								onClick={onAfreshClick}
								href={startAfreshCtaPath || "#"}
								className="anchor-btn anchor-btn--refresh"
							>
								{labels?.startAfreshCtaLabel || ""}
							</a>
							<a
								onClick={onContinueClick}
								// href={labels?.continueCtaPath || "#"}
								className="anchor-btn anchor-btn--continue"
							>
								{labels?.continueCtaLabel || ""}
							</a>
						</div>
						<div
							className="paragraph"
							dangerouslySetInnerHTML={{ __html: labels?.noteText || "" }}
						/>
					</div>
				</div>
			</div>
		</ModalWrapperSessionTimeout>
	);
};

SessionTimeoutModal.propTypes = {
	onAfreshClick: PropTypes.func,
	onContinueClick: PropTypes.func,
	onCloseHandler: PropTypes.func.isRequired,
	labels: PropTypes.any,
};
export default SessionTimeoutModal;
