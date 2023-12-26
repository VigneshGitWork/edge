import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const OverlayWrapperSd = ({ className, children }) => {
  return ReactDOM.createPortal(
    <div className={`indigo-overlay-wrapper-container-app ${className}`}>{children}</div>,
    document.body
  );
};

OverlayWrapperSd.propTypes = {
  className: PropTypes.string,
};

export default OverlayWrapperSd;
