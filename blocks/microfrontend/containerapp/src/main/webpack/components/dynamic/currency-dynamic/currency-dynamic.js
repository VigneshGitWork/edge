import React from "react";
import { createRoot } from "react-dom/client";
import ReactComponent from "./ReactComponent";
// const ReactComponent = lazy(() => import("./ReactComponent"));
export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		createRoot(el).render(<ReactComponent {...props} />);
	}
}
