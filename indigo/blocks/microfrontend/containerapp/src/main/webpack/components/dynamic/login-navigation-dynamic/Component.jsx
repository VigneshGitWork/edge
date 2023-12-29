/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { Fragment, useEffect, useState } from "react";
import { addHTMLExtension } from "../../../utils";
import { getLocalStorage, setLocalStorage } from "../../../utils/storage";
import { localStorageKeys, COOKIE_KEYS, SRP_PAGETYPE } from "../../../utils/constants/common";
import Cookies from "../../../utils/functions/cookies";
import {
	BASE_API_URL,
	GET_SESSION_API_ENDPOINT,
	CONTENT_TYPE_HEADER,
} from "../../../utils/constants";
import { pushAnalytic } from "../../../utils/functions/analyticEvents";

const NavigationButton = ({
	labels,
	onClick,
	loggedIn,
	onClickButton,
	authUserCookie,
	handleLogoutClick,
	showLoggedInPopup,
	toggleLoggedInPopup,
	onOutsideClickClose,
}) => {
	const [accountDetails, setAccountDetails] = useState(
		getLocalStorage(localStorageKeys.USER_ACCOUNT_DETAILS)
	);
	const [authToken, setAuthToken] = useState(
		Cookies.get(COOKIE_KEYS.AUTH, true)
	);

	React.useEffect(() => {
		document.addEventListener("authTokenSetEvent", (event) => {
			setAuthToken(event.detail.token);
		});
		return () => {
			document.removeEventListener("authTokenSetEvent", {});
		};
	}, []);

	useEffect(() => {
		try {
			if (authToken?.token) {
				const requestOptions = {
					method: "GET",
					headers: {
						Authorization: authToken?.token,
						...CONTENT_TYPE_HEADER,
					},
				};
				fetch(`${BASE_API_URL}${GET_SESSION_API_ENDPOINT}`, requestOptions)
					.then((response) => response.json())
					.then((result) => {
						console.log("---getserverContext API:::::", result);
						const accountDetails = result?.data?.accountDetails;
						if (accountDetails) {
							setAccountDetails(accountDetails);
							setLocalStorage(
								localStorageKeys.USER_ACCOUNT_DETAILS,
								accountDetails
							);
						}
					});
			}
		} catch (e) {
			pushAnalytic({
				event: "error",
				error: {
					code: "500",
					message: e.message,
					url: `${BASE_API_URL}${GET_SESSION_API_ENDPOINT}`,
					type: "api",
					source: "api",
					statusCode: "500",
					statusMessage: e.message,
				},
			});
			console.log(e);
		}
	}, [authToken?.token]);

	const name = authUserCookie
		? ` ${authUserCookie?.name?.first} ${authUserCookie?.name?.last}`?.trim()
		: "";

	let indigoCashData = accountDetails;
	indigoCashData = indigoCashData?.data;

	const isHideLoggedInAvatarInHeader = window.pageType === SRP_PAGETYPE;

	return loggedIn ? (
		<div className="skyplus6e-header__link-loggedin-container">
			<button
				onClick={toggleLoggedInPopup}
				className={`skyplus6e-header__link-loggedin-container__button ${isHideLoggedInAvatarInHeader ? " hide-on-mobile" : ""}`}
			>
				<span className="skyplus6e-header__link-loggedin-container__button__text">
					{name?.charAt(0)?.toUpperCase() || ""}
				</span>
				<i className="skp-iconmoon-icon icon-arrow skyplus6e-header__link-loggedin-container__button__icon"></i>
			</button>
			{showLoggedInPopup ? (
				<div
					className={`skyplus6e-header__link-loggedin-container__options-list ${
						showLoggedInPopup ? "show" : ""
					}`}
					onClick={onOutsideClickClose}
				>
					<ul className="skyplus6e-header__link-loggedin-container__options-list__items">
						<li className="skyplus6e-header__link-loggedin-container__options-list__items__item">
							<div className="skyplus6e-header__link-loggedin-container__options-list__items__item__view-profile">
								<span className="skyplus6e-header__link-loggedin-container__options-list__items__item__view-profile__initial">
									{name?.charAt(0).toUpperCase() || ""}
								</span>
								<div className="skyplus6e-header__link-loggedin-container__options-list__items__item__view-profile__inner">
									<p className="user-name">{name || ""}</p>
									<p>
										<a
											className="view-profile-link"
											href={labels.viewProfilePath || "#"}
										>
											{labels.viewProfileLabel || ""}
										</a>
									</p>
								</div>
							</div>
						</li>
						{labels?.indigoCashLabel &&
						indigoCashData &&
						indigoCashData?.currencyCode ? (
							<li className="skyplus6e-header__link-loggedin-container__options-list__items__item">
								<div className="skyplus6e-header__link-loggedin-container__options-list__items__item__content">
									<a className="content__link">
										<span className="content__link__left indigo-cash-label">
											{labels?.indigoCashLabel}
										</span>
										<span className="content__link__right">
											{indigoCashData?.totalAvailable}{" "}
											{indigoCashData?.currencyCode}
										</span>
									</a>
								</div>
							</li>
						) : null}
						{labels.navigationAfterLoginItems &&
						Array.isArray(labels.navigationAfterLoginItems)
							? labels.navigationAfterLoginItems.map((nav) => {
									return (
										<li
											key={
												nav.navigationLoginItemPath ||
												nav.navigationLoginItemLabel
											}
											className="skyplus6e-header__link-loggedin-container__options-list__items__item"
										>
											<div className="skyplus6e-header__link-loggedin-container__options-list__items__item__content">
												<a
													className="content__link"
													href={nav.navigationLoginItemPath || "#"}
												>
													<span>{nav.navigationLoginItemLabel || ""}</span>
												</a>
											</div>
										</li>
									);
							  })
							: null}
						<li className="skyplus6e-header__link-loggedin-container__options-list__items__item">
							<button
								onClick={handleLogoutClick}
								className="skyplus6e-header__link-loggedin-container__options-list__items__item__content logout-button"
							>
								<span className="content__link">
									{labels?.logOutLabel || ""}
								</span>
							</button>
						</li>
					</ul>
				</div>
			) : null}
		</div>
	) : labels.loginPopup === "true" ? (
		<button
			onClick={onClickButton}
			data-login-type="loginPopup"
			className="skyplus6e-header__persona-login-button"
		>
			{labels?.navigationLoginLabel || ""}
		</button>
	) : (
		<Fragment>
			<a
				data-noclick="true"
				onClick={(e) => e.preventDefault()}
				href={labels?.navigationLoginPath || "#"}
				className="skyplus6e-header__link-no-mobile"
			>
				<span>{labels?.navigationLoginLabel || ""}</span>
				<i className="icon-arrow"></i>
			</a>
			<a
				onClick={onClick}
				data-noclick="true"
				className="skyplus6e-header__link-mobile"
				href={labels?.navigationLoginPath || "#"}
			>
				<span>{labels?.navigationLoginLabel || ""}</span>
				<i className="icon-arrow"></i>
			</a>
			<div className="skyplus6e-header__nav-inner-wrapper">
				<ul className="skyplus6e-header__nav-items-inner">
					{labels?.navigationLoginItems?.map((subNavItem, index) => (
						<li
							className="skyplus6e-header__nav-item-inner"
							key={`${subNavItem?.navigationLoginItemLabel}${index}`}
						>
							<a
								onClick={onClick}
								data-login-type={
									subNavItem.loginPopup === "true" ? "loginPopup" : null
								}
								href={
									addHTMLExtension(subNavItem?.navigationLoginItemPath) || "#"
								}
							>
								{subNavItem?.navigationLoginItemLabel || ""}
							</a>
						</li>
					))}
				</ul>
			</div>
		</Fragment>
	);
};

export default NavigationButton;
