import React, { useEffect, useRef, useState } from "react";
import InfoBannerPopupComponent from "./infoBannerPopupComponent";

function ReactComponent(props) {
  let labels = {};
  const ref = useRef(null);
  const [showPopup, setShowPopup] = useState(true);
  const showHurruyPopupRef = useRef(showPopup);
  try {
    labels = JSON.parse(props.mfData);
  } catch (ex) {
    if (props.mfData) {
      labels = props.mfData;
    } else {
      labels = {};
    }
  }

  const initShowInfoBanner = () => {
    setShowPopup((prev) => true);
    const isHeader = document.querySelector(".skyplus6e-header");
    if(isHeader) {
      isHeader.classList.add("sticky-header");
      document.querySelector("body").classList.add('info-banner-stickyTop')
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
  };

  
  const onCloseHandler = (event) => {
    setShowPopup((prev) => false);
    const isHeader = document.querySelector(".skyplus6e-header");
    if(isHeader) {
      isHeader.classList.remove("sticky-header");
      document.querySelector("body").classList.remove('info-banner-stickyTop')
    }
  };

  useEffect(() => {
    initShowInfoBanner();
  }, []);

  useEffect(() => {
    if (ref.current) {
      InfoBannerPopupComponent(ref.current, { 
        ...{
          ...props,
          showPopup, 
          onCloseHandler
        }
      });
    }
    showHurruyPopupRef.current = showPopup;
  }, [showPopup]);


  return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
  mfData: JSON.parse(JSON.stringify("<p><b>With travel opening up, govt. advisories and state/UT guidelines are constantly evolving.</b> Please check the latests <a href=&quot;google.com&quot;>Read more...</a></p>")),
};

export default ReactComponent;
