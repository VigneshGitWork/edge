import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { getLocalStorage } from "../../../utils/storage";
import { localStorageKeys } from "../../../utils/constants/localStorageConstants";
import helper from "./helper";
import ModifySearch from "./ModifySearch";
import { SRP_PAGETYPE, PE_PAGETYPE } from "../../../utils/constants/common";

export const device = {
    ISMOBILE: window.screen.width < 768,
    ISTABLET: window.screen.width >= 768 && window.screen.width <= 1024,
    ISDESKTOP: window.screen.width >= 1024,
};

const ReactComponent = (props) => {
    const { mfData } = props;
    const data = JSON.parse(mfData.replace(/&quot;/ig, "\""));
    const flightInfo = getLocalStorage(localStorageKeys.BOOKING_CONTEXT_VALUES);
    const [flightData, setFlightData] = useState(flightInfo);
    
    const modifySearchProps = helper.getModifySearchprops(flightData, data);
    const refEle = useRef();

    useEffect(() => {
        if((window.pageType === SRP_PAGETYPE || window.pageType === PE_PAGETYPE)) {
            const onStorage = () => {
                const flightInfo = getLocalStorage(localStorageKeys.BOOKING_CONTEXT_VALUES);
                setFlightData(flightInfo);
            };
            window.addEventListener("ModifyBookingEvent", onStorage);
            return () => {
                window.removeEventListener("ModifyBookingEvent", onStorage);
            };
        }
    }, []);

    useLayoutEffect(() => {
        if(window.pageType === SRP_PAGETYPE || window.pageType === PE_PAGETYPE) {
            let lastScrollTop = 0;
            const flyout = refEle.current;
            const $leftBox = flyout.querySelector(".skyplus-modify-search__left");
            const $rightBox = flyout.querySelector(".skyplus-modify-search__right");
            const $logoBox = document.querySelector(".skyplus6e-header__logo");

            window.addEventListener("scroll", () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop) {
                    if (window.scrollY > 60) {
                        $leftBox.classList.remove("hideFlyout");
                        $leftBox.classList.add("showFlyout");
                        if(device.ISDESKTOP) {
                            $rightBox.classList.remove("hideFlyout");
                            $rightBox.classList.add("showFlyout");
                        } else {
                            $logoBox.classList.remove("showFlyout");
                            $logoBox.classList.add("hideFlyout");
                        }
                    }
                } else if (scrollTop < lastScrollTop) {
                    if (window.scrollY < 60) {
                        $leftBox.classList.add("hideFlyout");
                        $leftBox.classList.remove("showFlyout");
                        if(device.ISDESKTOP) {
                            $rightBox.classList.add("hideFlyout");
                            $rightBox.classList.remove("showFlyout");
                        } else {
                            $logoBox.classList.add("showFlyout");
                            $logoBox.classList.remove("hideFlyout");
                        }
                    }
                }
                lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            }, false);

            if(!device.ISDESKTOP) {
                $rightBox.classList.remove("hideFlyout");
            }

            return () => {
                window.removeEventListener("scroll");
            };
        }
    }, []);

    if(window.pageType === SRP_PAGETYPE || window.pageType === PE_PAGETYPE) {
        return <div ref={refEle} className="srp-header-flight-info-modify-dynamic"><ModifySearch {...modifySearchProps} /></div>;
    } 
    return <Fragment />;
};

ReactComponent.propTypes = {
    mfData: PropTypes.string,
};

ReactComponent.defaultProps = {
    mfData: "",
};

export default ReactComponent;
