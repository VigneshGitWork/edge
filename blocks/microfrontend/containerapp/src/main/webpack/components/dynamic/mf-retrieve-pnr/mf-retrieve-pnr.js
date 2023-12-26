/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import RetrievePnr from "./retrievePnr.jsx";
export default class {
	static init(el) {
		console.log("---RetrievePnr:::::class comp");
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<RetrievePnr {...props} />);
	}
}
