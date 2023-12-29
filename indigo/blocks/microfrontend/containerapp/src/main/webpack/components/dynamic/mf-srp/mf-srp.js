/**
 * Sample React Component Integration
 */
// import React, { lazy, Suspense } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import SrpComponent from "./SrpComponent.jsx";
// const SrpComponent = lazy(() => import("./SrpComponent"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<SrpComponent {...props} />);
	}
}
