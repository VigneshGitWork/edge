import React from "react";
import { createRoot } from "react-dom/client";
import HurryupSessionPopup from "./system-design-components/HurryupSessionSd/HurryupSessionSd";

let rootElement = null;

export default (ele, props) => {
  if (ele !== undefined && ele !== null) {
    if (rootElement === null) {
      rootElement = createRoot(ele);
    }
    rootElement.render(<HurryupSessionPopup {...props} />);
  }
};
