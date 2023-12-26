import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
// import MyComponent from "./MyComponent.jsx";
const MyComponent = lazy(() => import("./MyComponent"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(
			<Suspense fallback={<div>&nbsp;</div>}>
				<MyComponent {...props} />
			</Suspense>
		);
	}
}
