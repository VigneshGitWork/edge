/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import ReviewSummary from "./reviewSummary.jsx";
// const ReviewSummary = lazy(() => import("./reviewSummary"));
export default class {
	static init(el) {
		console.log("---itiner:::::class comp");
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<ReviewSummary {...props} />);
	}
}
