/**
 * Sample React Component Integration
 */
import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import ReactCompoent from "./ReactComponent";
const ReactComponent = lazy(() => import("./ReactComponent"));
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
