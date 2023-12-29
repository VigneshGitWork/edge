import React from "react";
import { createRoot } from "react-dom/client";

import ReactComponent from "./ReactComponent";

export default class {
	static init(el) {
		const props = JSON.parse(JSON.stringify(el.dataset));
		const mfData = JSON.parse(props.mfData || "{}");

		createRoot(el).render(<ReactComponent {...props} mfData={mfData} />);
	}
}
