/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import StepperPlaceholder from "./StepperPlaceholder.jsx";
// const StepperPlaceholder = lazy(() => import("./StepperPlaceholder"));
console.log("-init:::stepper2");
export default class {
	static init(el) {
		console.log("-init:::stepper");
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<StepperPlaceholder {...props} />);
	}
}
