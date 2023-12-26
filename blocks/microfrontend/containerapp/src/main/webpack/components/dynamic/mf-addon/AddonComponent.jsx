import React, { useEffect, useRef } from "react";
import { addonAppInit } from "addon/AddonApp";

function AddonComponent(props) {
  const ref = useRef(null);

  useEffect(() => {
    console.log(addonAppInit);
    if (ref.current) {
      addonAppInit(ref.current);
      //setRenderConfigDataFlag(false);
    }
  }, []);

  return <div ref={ref}>Addon Placeholder</div>;
}

AddonComponent.defaultProps = {
  pageType: "", // describes the variation home or srp
  persona: "wwc", // not required in booking as of now
};

export default AddonComponent;
