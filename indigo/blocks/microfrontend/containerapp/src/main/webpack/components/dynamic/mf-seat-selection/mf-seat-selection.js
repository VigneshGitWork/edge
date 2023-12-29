/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import SeatSelection from "./SeatSelection.jsx";
// const SeatSelection = lazy(() => import("./SeatSelection"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<SeatSelection {...props} />);
	}
}
