import React, { useState } from "react";

export default function ReactComponent({ name }) {
	const [value, setValue] = useState("");
	return (
		<>
			<h1 className="my-class">Hello {name}!</h1>
			<br />
			<br />
			<br />
		</>
	);
}
