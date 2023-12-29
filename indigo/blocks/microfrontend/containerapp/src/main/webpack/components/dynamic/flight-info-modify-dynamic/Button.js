import React, { useState } from "react";
import PropTypes from "prop-types";

const Button = ({
  label,
  children,
  disabled,
  className,
  variation = "",
  onClickHandler,
  icon = false,
}) => {
  let btnClasses = `custom-button ${className !== undefined ? className : ""}`;
  let _disabled = disabled || false;

  if (variation === "LOADING") {
    btnClasses += " custom-button--loading";
  } else if (variation === "SECONDARY") {
    btnClasses += " custom-button--secondary";
  } else if (variation === "TERTIARY") {
    btnClasses += " custom-button--tertiary";
  } else if (variation === "DISABLED") {
    btnClasses += " custom-button--disabled";
    _disabled = true;
  }

  return (
    <button
      disabled={_disabled}
      className={btnClasses}
      onClick={onClickHandler}
    >
      {icon ? <i className={icon}></i> : null}
      {label ? <span className="custom-button__label">{label} </span> : null}
      <div className="custom-button__loading__circle"></div>
      {children}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string,
  children: PropTypes.element,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  variation: PropTypes.string,
  onClickHandler: PropTypes.func,
};
export default Button;
