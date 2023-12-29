/**
 * Sample React Component Integration
 */
import React from "react";
import { createRoot } from "react-dom/client";
import ReactCompoent from "./Reactcomponent";
// const ReactCompoent = lazy(() => import("./Reactcomponent"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<ReactCompoent {...props} />);
	}
}
