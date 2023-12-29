import { createRoot } from "react-dom/client";
import React from "react";
import SessionTimeoutModal from "./system-design-components/SessionTimeoutModalContainerApp/SessionTimeoutModalContainerApp";

let rootElement = null;

export default (ele, props) => {
	if (ele !== undefined && ele !== null) {
		if (rootElement === null) {
			rootElement = createRoot(ele);
		}
		rootElement.render(
			props.showPopup ? <SessionTimeoutModal {...props} /> : null
		);
	}
};
