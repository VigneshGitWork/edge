import React, { useEffect, useRef } from "react";
import { headerNavLoginSection } from "./Wrapper";

function ReactComponent(props) {
	const ref = useRef(null);

	useEffect(() => {
		if (ref.current) {
			headerNavLoginSection(ref.current, { ...props });
		}
	}, []);

	return <div ref={ref}></div>;
}

ReactComponent.defaultProps = {
	mfData: JSON.stringify({
		creditShellLabel: "Credit Shell",
		idLabel: "ID",
		indigoCashLabel: "Indigo Cash",
		loginPopup: "false",
		logOutLabel: "Log Out",
		navigationLoginItems: [
			{
				navigationLoginItemLabel: "Corp Connect Admin Login",
				navigationLoginItemPath:
					"/content/skyplus6e/language-masters/en/partner-page",
				loginPopup: "false",
			},
			{
				navigationLoginItemLabel: "Customer Login",
				navigationLoginItemPath: "",
				loginPopup: "true",
			},
			{
				navigationLoginItemLabel: "Partner Login",
				navigationLoginItemPath:
					"/content/skyplus6e/language-masters/en/home/homepage.html?logintype=loginPopup",
				loginPopup: "false",
			},
		],
		navigationLoginLabel: "Login",
		navigationLoginPath: "",
		navigationAfterLoginItems: [
			{
				navigationLoginItemLabel: "My Booking",
				navigationLoginItemPath:
					"https://www.goindigo.in/agent/agent-profile.html?linkNav=agent-profile_header#booking",
				loginPopup: "false",
			},
		],
		viewProfileLabel: "View Profile",
	}),
};

export default ReactComponent;
