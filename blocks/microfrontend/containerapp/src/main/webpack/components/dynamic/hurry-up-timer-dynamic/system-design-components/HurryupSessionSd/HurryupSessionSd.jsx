/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DialogBoxHurryupWrapper } from "../DialogBoxHurryupWrapper";

const checkDigits = (num) => (num.toString().length === 1 ? `0${num}` : num);

const formatTime = (timeInSeconds) => {
  const minutes = parseInt(timeInSeconds / 60);
  const seconds = parseInt(timeInSeconds % 60);
  return checkDigits(minutes) + ":" + checkDigits(seconds);
};

const hurryupSessionExpiredEvent = (data) =>
  new CustomEvent("hurryupSessionExpiredEvent", data);

const HurryupSessionPopupContainerApp = ({
  labels,
  showPopup,
  popupTimer,
  onCancelClick,
  onContinueClick,
  setClosePopup
}) => {
  const intervalRef = useRef(null);
  const [time, setTime] = useState(+popupTimer * 60);
  const timerRef = useRef(time);

  useEffect(() => {
    if (showPopup === "show") {
      document.body.classList.add("hurryup-timer-active");
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      intervalRef.current = setInterval(() => {
        if (timerRef.current <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setTime(+popupTimer * 60);
          setClosePopup && setClosePopup();
          document.dispatchEvent(hurryupSessionExpiredEvent({ bubbles: true }));
        } else {
          setTime((prev) => prev - 1);
        }
      }, 1000);
    }
  }, [showPopup]);

  const handleContinueClick = (e) => {
    onContinueClick(e);
    document.body.classList.remove("hurryup-timer-active");
  };
  const handleCancelClick = (e) => {
    onCancelClick(e);
    document.body.classList.remove("hurryup-timer-active");
  };

  useEffect(() => {
    if (showPopup === "continue") {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTime(+popupTimer * 60);
    }
  }, [showPopup]);

  useEffect(() => {
    timerRef.current = time;
  }, [time]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("hurryup-timer-active");
    };
  }, []);

  const indexPos = labels?.completeBookingText?.indexOf("</p>") || -1;
  const timerTextData = `<strong className="session-popup__content__timer">${
    formatTime(time) || ""
  }</strong>.`;
  let innnerHTMLPara = labels?.completeBookingText;
  if (indexPos >= 0) {
    innnerHTMLPara = [
      innnerHTMLPara.slice(0, indexPos),
      timerTextData,
      innnerHTMLPara.slice(indexPos),
    ].join("");
  }
  return showPopup === "show" ? (
    <DialogBoxHurryupWrapper
      className="hurryup-session-popup"
      variation={"center"}
      open={true}
      hideHead={true}
    >
      <div className="session-popup show">
        <div className="session-popup__popup-cont">
          <div className="session-popup__content">
            <div>
              <div className="session-popup__content__left">
                <div
                  className="session-popup__content__message"
                  dangerouslySetInnerHTML={{
                    __html: innnerHTMLPara || "",
                  }}
                ></div>
              </div>
              <div className="session-popup__content__right">
                <button
                  onClick={(e) => handleContinueClick(e)}
                  className="session-popup__content__continue"
                >
                  {labels?.continueBookingLabel || ""}
                </button>
                <button
                  onClick={(e) => handleCancelClick(e)}
                  className="session-popup__content__cancel"
                >
                  {labels?.cancelLabel || ""}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogBoxHurryupWrapper>
  ) : null;
};

HurryupSessionPopupContainerApp.propTypes = {
  popupTimer: PropTypes.number,
  labels: PropTypes.shape({
    cancelLabel: PropTypes.string,
    completeBookingText: PropTypes.string,
    continueBookingLabel: PropTypes.string,
  }),
};
export default HurryupSessionPopupContainerApp;
