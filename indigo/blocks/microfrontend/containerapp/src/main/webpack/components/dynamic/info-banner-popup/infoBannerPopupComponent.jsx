import React from "react";
import { createRoot } from "react-dom/client";
import parse from "html-react-parser";
let rootElement = null;
const InfoBannerPopup = ({ mfData, showPopup, onCloseHandler }) => {
	const infoBanner = mfData;
	return (
		showPopup && (
			<div className="info-banner-popup">
				<div
					className="info-banner-popup--block show"
					role="dialog"
					aria-label="Info Banner"
				>
					<a
						href="javascript:void(0)"
						className="close-info-banner info-banner-popup--block--close"
						aria-label="Close this dialog window"
						onClick={onCloseHandler}
					>
						<i className="icon-close"></i>
					</a>
					<div className="info-banner-popup--block--desc" aria-hidden="false">
						{parse(infoBanner || "")}
					</div>
				</div>
			</div>
		)
	);
};
export const InfoBannerPopupComponent = (ele, props) => {
	if (ele !== undefined && ele !== null) {
		if (rootElement === null) {
			rootElement = createRoot(ele);
		}
		rootElement.render(<InfoBannerPopup {...props} />);
	}
};
export default InfoBannerPopupComponent;
