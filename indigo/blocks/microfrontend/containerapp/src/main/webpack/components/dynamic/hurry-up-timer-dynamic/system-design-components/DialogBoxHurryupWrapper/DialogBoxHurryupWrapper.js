/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { OverlayWrapperSd } from "../OverlayWrapperSd";

const DialogBoxHurryupWrapper = (props) => {
  const {
    label,
    className,
    children,
    open,
    variation = "top",
    disableFullHeight=false,
    onClose,
    hideHead=false
  } = props;
  let DialogClasses = `Dialog-wrapper ${className !== undefined ? className : ""}`;
  const [opened, setopened] = useState(() => open || false);
  
  const handleOnClose = () => {
    setopened(false);
    onClose(false);
    document.body.classList.remove("scroll-is-disable-for-dialog");
  };

  useEffect(() => {
    setopened(open);
    if(open) {
      document.body.classList.add("scroll-is-disable-for-dialog");
    } else {
      document.body.classList.remove("scroll-is-disable-for-dialog");
    } 
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("scroll-is-disable-for-dialog");
    };
  }, []);

  if(!opened) {
    return <Fragment />;
  }

  return (
    <OverlayWrapperSd className={`popup-modal-with-content-container-app__container popup-dialog-box ${DialogClasses || ""} ${variation ? ("popup-modal-with-content-container-app__direction-"+variation) : ""}`}>
      <div className="popup-modal-with-content-container-app__box">
        <div className="popup-modal-with-content-container-app__bg-overlay">
          <div className={`popup-modal-with-content-container-app__content ${disableFullHeight ? "height-adaptable" : ""}`}>
          <div className="popup-modal-with-content-container-app__content-container">
            {
              !hideHead && 
              <div className="popup-modal-with-content-container-app__header">
                <button className="popup-modal-with-content-container-app__close-overlay-button" onClick={handleOnClose}>
                  <i className="popup-modal-with-content-container-app__close-overlay-button__icon skp-iconmoon-icon popup-modal-with-content-container-app__close-overlay-button__icon--close"></i>
                </button>
                <h3 className="popup-modal-with-content-container-app__header__title visibility-hidden"></h3>
              </div>
            }

            {label && <div className="popup-modal-with-content-container-app__label">{label}</div>}
            <div className="popup-modal-with-content-container-app__body">{children}</div>

          </div>
        </div>
        </div>
      </div>
    </OverlayWrapperSd>
  );
};

DialogBoxHurryupWrapper.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  variation: PropTypes.string,
  open: PropTypes.bool,
  hideHead: PropTypes.bool,
  onClose: PropTypes.func
};

export default DialogBoxHurryupWrapper;
