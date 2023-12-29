/**
 * Sample React Component Integration
 */
import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import ReactComponent from "./ReactLoginComponent.jsx";
const ReactComponent = lazy(() => import("./ReactLoginComponent"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(
			<Suspense fallback={<div>&nbsp;</div>}>
				<ReactComponent {...props} />
			</Suspense>
		);
	}
}
