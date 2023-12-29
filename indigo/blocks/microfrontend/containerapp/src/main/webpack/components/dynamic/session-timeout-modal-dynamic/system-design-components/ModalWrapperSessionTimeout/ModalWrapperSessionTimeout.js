/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import PropTypes from "prop-types";

const ModalWrapperSessionTimeout = ({
	children,
	onCloseHandler,
	overlayClickClose,
	closeButtonIconClass,
	className = "",
	modalTitle = "",
	modalTitleDisplay,
	onOutsideClickClose,
	customPopupContentClassName,
	hideHead = false,
	isLoginForm = false,
	id,
}) => {
	const reactComponentAsChildren = children?.type
		?.toString()
		?.includes("react");

	useEffect(() => {
		document.body.classList.add("no-scroll-session-timeout-container-app");
		return () => {
			document.body.classList.remove("no-scroll-session-timeout-container-app");
		};
	}, []);

	let onLoginFormTabFocusHandler = (
		firstTabElementMember,
		lastFocusElement
	) => {
		lastFocusElement.addEventListener("keydown", (event) => {
			event.preventDefault();
			firstTabElementMember.focus();
		});
	};

	useEffect(() => {
		/* For Login Form asscessibility */
		let firstTabElementMember = null;
		let lastFocusElement = null;
		let parentElement = document.querySelector(
			".popup-modal-with-content-session-timeout-container-app-login-form"
		);
		if (isLoginForm && parentElement) {
			if (
				parentElement.classList.contains("Member") ||
				parentElement.classList.contains("member")
			) {
				firstTabElementMember = document.querySelector(
					".popup-modal-with-content-session-timeout-container-app__close-overlay-button"
				);
				lastFocusElement = document.querySelector(
					".login-form__wrapper__form > .login-form__sign-up-new-user > p > a"
				);
				onLoginFormTabFocusHandler(firstTabElementMember, lastFocusElement);
			} else if (parentElement.classList.contains("Agent")) {
				firstTabElementMember = document.querySelector(
					".login-form > .login-form__sign-up-new-user > p > a"
				);
				lastFocusElement = document.querySelector(
					".login-form__wrapper__form > .login-form__sign-up-new-user > p > a:last-child"
				);
				onLoginFormTabFocusHandler(firstTabElementMember, lastFocusElement);
			} else if (parentElement.classList.contains("CorpConnectAdmin")) {
				firstTabElementMember = document.querySelector(
					".login-form > .login-form__sign-up-new-user > p > a"
				);
				lastFocusElement = document.querySelector(
					".login-form__wrapper__form > .login-form__sign-up-new-user > p > a"
				);
				onLoginFormTabFocusHandler(firstTabElementMember, lastFocusElement);
			} else if (parentElement.classList.contains("CorpConnectUser")) {
				firstTabElementMember = document.querySelector(
					".login-form > .login-form__sign-up-new-user > p > a"
				);
				lastFocusElement = document.querySelector(
					".login-form__wrapper__form > .submit-btn > button"
				);
				onLoginFormTabFocusHandler(firstTabElementMember, lastFocusElement);
			} else if (parentElement.classList.contains("CAPF")) {
				firstTabElementMember = document.querySelector(
					".custom-form-control > .input-text-field__input"
				);
				lastFocusElement = document.querySelector(
					".login-form__wrapper__form > .submit-btn > button"
				);
				onLoginFormTabFocusHandler(firstTabElementMember, lastFocusElement);
			} else if (parentElement.classList.contains("Staff")) {
				firstTabElementMember = document.querySelector(
					".cmp-custom-drop-down__btn"
				);
				lastFocusElement = document.querySelector(
					".login-form__wrapper__form > .login-form__sign-up-new-user > p > a"
				);
				onLoginFormTabFocusHandler(firstTabElementMember, lastFocusElement);
			}
		}
	}, [className, isLoginForm]);

	return (
		<div
			className={`popup-modal-with-content-session-timeout-container-app ${className}`}
			onClick={onOutsideClickClose}
		>
			<div
				className="popup-modal-with-content-session-timeout-container-app__bg-overlay"
				onClick={overlayClickClose ? onCloseHandler : null}
			>
				<div
					id={id}
					className={`popup-modal-with-content-session-timeout-container-app__content ${customPopupContentClassName}`}
				>
					{!hideHead && (
						<div className="popup-modal-with-content-session-timeout-container-app__header">
							<button
								onClick={onCloseHandler}
								className={`popup-modal-with-content-session-timeout-container-app__close-overlay-button d-none`}
							>
								<i
									className={`popup-modal-with-content-session-timeout-container-app__close-overlay-button__icon skp-iconmoon-icon ${
										closeButtonIconClass ||
										"popup-modal-with-content-session-timeout-container-app__close-overlay-button__icon--close"
									}`}
								></i>
							</button>
							<h3
								className={
									"popup-modal-with-content-session-timeout-container-app__header__title " +
									(modalTitleDisplay ? "" : "visibility-hidden")
								}
							>
								{modalTitle}
							</h3>
						</div>
					)}
					{reactComponentAsChildren
						? React.cloneElement(children, { onCloseHandler })
						: children}
				</div>
			</div>
		</div>
	);
};

ModalWrapperSessionTimeout.propTypes = {
	onCloseHandler: PropTypes.func,
	overlayClickClose: PropTypes.bool,
	hideHead: PropTypes.bool,
	children: PropTypes.any.isRequired,
};

ModalWrapperSessionTimeout.defaultProps = {
	children: null,
	onCloseHandler: () => {},
	overlayClickClose: false,
};

export default ModalWrapperSessionTimeout;
