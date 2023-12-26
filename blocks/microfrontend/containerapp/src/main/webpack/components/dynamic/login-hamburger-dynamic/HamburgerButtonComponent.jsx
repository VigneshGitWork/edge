import React from "react";
import { getIconClass } from "../../../utils";
import { events } from "../../../utils/custom-events";

const toggleLoginPopupEvent = (config) =>
  new CustomEvent(events.TOGGLE_LOGIN_POPUP, config);

const HamburgerButton = ({ labels, loggedIn, authUserCookie }) => {
  const name =
    `${authUserCookie?.name?.first} ${authUserCookie?.name?.last}`.trim();
  return loggedIn ? (
    <div className="skyplus6e-header__hamburger-login-signup-button skyplus6e-header__hamburger-login-signup-button--loggedin">
      <button className="skyplus6e-header__hamburger-login-signup-button--loggedin__button">
        <span className="skyplus6e-header__hamburger-login-signup-button--loggedin__button__initial">
          {name?.charAt(0)?.toUpperCase()}
        </span>
        <span className="skyplus6e-header__hamburger-login-signup-button--loggedin__button__name">
          {name || ""}
        </span>
      </button>
    </div>
  ) : (
    <button
      aria-label="Login/Signup"
      data-login-type="loginPopup"
      className="skyplus6e-header__hamburger-login-signup-button"
      onClick={(event) => {
        event.target.dispatchEvent(
          toggleLoginPopupEvent({
            bubbles: true,
            detail: event.target.dataset,
          })
        );
      }}
    >
      <i className={getIconClass(labels?.userIcon[0]) || ""}></i>
      <span>{labels?.loginsignup || ""}</span>
      <i className={getIconClass(labels?.arrowIcon[0]) || ""}></i>
    </button>
  );
};

export default HamburgerButton;
