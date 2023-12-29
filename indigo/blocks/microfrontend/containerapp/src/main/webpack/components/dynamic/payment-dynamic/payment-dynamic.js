/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import Payment from "./payment";
// const Payment = lazy(() => import("./payment"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<Payment {...props} />);
	}
}
