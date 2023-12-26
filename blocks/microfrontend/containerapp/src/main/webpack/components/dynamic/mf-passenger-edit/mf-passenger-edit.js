/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import PassengerEdit from "./PassengerEdit.jsx";
// const PassengerEdit = lazy(() => import("./PassengerEdit"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<PassengerEdit {...props} />);
	}
}
