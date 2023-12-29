import React, { useEffect, useRef } from "react";
import { headerHamburgerButton } from "./HamburgerButtonRenderer";

function ReactComponent(props) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      headerHamburgerButton(ref.current, { ...props });
    }
  }, []);

  return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
  mfData: JSON.stringify({
    userIcon: ["icon-user"],
    loginsignup: "Login/SignUp",
    arrowIcon: ["icon-arrow-right"],
  }),
};

export default ReactComponent;
