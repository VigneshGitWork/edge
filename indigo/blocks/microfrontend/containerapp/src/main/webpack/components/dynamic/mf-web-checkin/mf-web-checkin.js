/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import WebCheckinComponent from "./WebCheckinComponent.jsx";
// const WebCheckinComponent = lazy(() => import("./WebCheckinComponent"));
// import "./mf-web-checkin.scss";

export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<WebCheckinComponent {...props} />);
	}
}
