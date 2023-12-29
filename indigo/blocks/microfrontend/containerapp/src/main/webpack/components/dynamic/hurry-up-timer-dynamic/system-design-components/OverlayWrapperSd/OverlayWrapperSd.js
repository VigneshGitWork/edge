import React from "react";

import { createPortal } from "react-dom";
import PropTypes from "prop-types";

const OverlayWrapperSd = ({ className, children }) => {
  return createPortal(
    <div className={`indigo-overlay-wrapper-container-app ${className}`}>{children}</div>,
    document.body
  );
};

OverlayWrapperSd.propTypes = {
  className: PropTypes.string,
};

export default OverlayWrapperSd;
