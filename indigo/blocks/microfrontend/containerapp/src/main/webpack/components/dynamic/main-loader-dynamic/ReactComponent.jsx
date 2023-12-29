import React, { useEffect, useRef, useState } from "react";
import Mainloader from "./MainLoader";

function ReactComponent(props) {
  const ref = useRef(null);
  const timeoutRef = useRef(null);
  const [showMainLoader, setshowMainLoader] = useState(false);
  useEffect(() => {
    document.addEventListener("mainLoaderEvent", (event) => {
      console.log(event, "event")
      if(event?.detail) {
        setshowMainLoader(event?.detail?.isMainloader);
      }
    });
  },[])

  useEffect(() => {
    if (ref.current) {
      Mainloader(ref.current, {
        ...{
          showMainLoader: showMainLoader,
        },
      });
    }
  }, [showMainLoader]);

  return (<div ref={ref}></div>);
}

export default ReactComponent;