import { adobeAnalytic } from "./analyticUtils";
import { TYPE, SOURCE } from "../constants/analytics";
/**
 * escapeRegex - regex for multiple replacement
 * @param {*} string
 * @returns
 */
const escapeRegex = (string) => {
	return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

export const isValidURL = (urlString) => {
	var urlPattern = new RegExp(
		"^(https?:\\/\\/)?" + // validate protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	); // validate fragment locator
	return !!urlPattern.test(urlString);
};

/**
 * pushAnalytic - It holds the list of events and its details called from MFE
 * @param {object} param0 - contains state and event name
 */
export const pushAnalytic = async ({ ...obj }) => {
	const { state, event, ele, error = {}, isLoaded = false, data = {} } = obj;
	let eventProps = {};

	//const socialHref = ele?.attr("href");
	const socialHref = ele?.href;
	let position = "Social";
	let socialbannerName = "";
	if (socialHref) {
		const siteUrl = new URL(socialHref);
		const domain = siteUrl.hostname;
		const searches = ["www.", ".com", ".in"];
		const rex = new RegExp(searches.map(escapeRegex).join("|"), "g");
		socialbannerName = domain.replace(rex, (match) => "''");
		if (socialbannerName === "play.google") {
			socialbannerName = "playstore";
			position = "Download";
		}
		if (socialbannerName === "itunes.apple") {
			socialbannerName = "appstore";
			position = "Download";
		}
	}

	const href = ele?.attr("href");
	const bannerName = ele?.next().attr("alt") || "";

	switch (event) {
		case "bannerClick":
			eventProps = {
				event: "click",
				interactionType: "Link/ButtonClick",
				page: {
					eventInfo: {
						name: bannerName,
						position: "", // optional - leave blank if component is set
						component: "Banner",
						outboundLinkName: bannerName,
						outboundLinkURL: href,
					},
					pageInfo: {
						banner: {
							name: bannerName,
							url: href,
						},
					},
				},
			};
			break;

		case "footerSocialClick":
			eventProps = {
				event: "click",
				interactionType: "Link/ButtonClick",
				page: {
					eventInfo: {
						name: socialbannerName,
						position,
						component: "Footer",
						outboundLinkName: socialbannerName,
						outboundLinkURL: socialHref,
					},
				},
			};
			break;

		case "bookingMFDataLoad":
			eventProps = {
				event: "error",
				interactionType: "component load",
				page: {
					error: {
						id: error?.code || "",
						text: error?.message || "",
					},
					pageInfo: {
						siteSection: "Homepage",
						bookingWidgetDataLoaded: isLoaded ? "1" : "",
					},
				},
			};
			break;

		case "pageload":
			eventProps = {
				event: event,
				interactionType: "pageload",
				page: {
					error: {
						id: error?.code || "",
						text: error?.message || "",
					},
				},
			};
			break;

		// >>>> Disabling for future use <<<<
		// case "imageTracking":
		// 	eventProps = {
		// 		event: "click",
		// 		interactionType: "component load",
		// 		page: {
		// 			error: {
		// 				id: error?.code || "",
		// 				text: error?.message || "",
		// 			},
		// 			pageInfo: {
		// 				siteSection: "Homepage",
		// 			},
		// 			eventInfo: {
		// 				name: "Image Loaded",
		// 				position: "",
		// 				component: "6E service widget Component",
		// 			},
		// 		},
		// 	};
		// 	break;

		case "error":
			eventProps = {
				event,
				interactionType: "error",
				page: {
					error: {
						...error,
						id: error?.code || "",
						code: error?.code || "",
						type: TYPE[error?.type] || "",
						source: SOURCE[error?.source] || "",
						apiURL: error?.url || "",
						statusCode: error?.statusCode || "",
						statusMessage: error?.statusMessage || "",
						displayMessage: error?.message || "",
					},
					pageInfo: {
						siteSection: "Homepage",
					},
				},
			};
			break;

		case "skyplus-card-click": {
			eventProps = {
				event: "click",
				interactionType: "Link/ButtonClick",
				page: {
					pageInfo: data.pageInfo,
					eventInfo: data.eventInfo,
				},
			};

			break;
		}

		case "deeplink-page-click": {
			eventProps = {
				event: "click",
				interactionType: "Link/ButtonClick",
				page: {
					pageInfo: data.pageInfo,
					eventInfo: data.eventInfo,
				},
			};

			break;
		}

		case "deeplink-page-popup": {
			eventProps = {
				event: "click",
				interactionType: "Pop Up shown",
				page: {
					pageInfo: data.pageInfo,
					eventInfo: data.eventInfo,
					product: data.product,
				},
			};

			break;
		}

		default:
	}

	adobeAnalytic({
		state,
		commonInfo: {},
		eventProps,
	});
};
