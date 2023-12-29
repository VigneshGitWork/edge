import React from "react";
import PropTypes from "prop-types";

const Button = ({
	label,
	type = "button",
	children,
	disabled,
	className,
	variation = "",
	onClickHandler,
	icon = false,
	customListClass = "",
}) => {
	let btnClasses =
		customListClass ||
		`custom-button ${className !== undefined ? className : ""}`;
	let _disabled = disabled || false;

	if (variation === "LOADING") {
		btnClasses += " custom-button--loading";
	} else if (variation === "SECONDARY") {
		btnClasses += " custom-button--secondary";
	} else if (variation === "	") {
		btnClasses += " custom-button--tertiary";
	} else if (variation === "DISABLED") {
		btnClasses += " custom-button--disabled";
		_disabled = true;
	}

	return (
		<button
			type={type}
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
	label: PropTypes.any,
	children: PropTypes.any,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	variation: PropTypes.string,
	onClickHandler: PropTypes.func,
	icon: PropTypes.bool,
	type: PropTypes.any,
	customListClass: PropTypes.string,
};

export default Button;
