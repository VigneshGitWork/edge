/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import Itinerary from "./Itinerary.jsx";
// const Itinerary = lazy(() => import("./Itinerary"));
export default class {
	static init(el) {
		console.log("---itiner:::::class comp");
		const props = JSON.parse(JSON.stringify(el.dataset));
		// createRoot(el).render(<Itinerary {...props} />);
		createRoot(el).render(<Itinerary {...props} />);
	}
}
