import { loadCSS, loadScript } from "../../scripts/aem.js";

export default function decorate(block) {
    const rootElement = document.createElement("div");
    rootElement.id = "root";
    rootElement.setAttribute("data-page-type", "homepage")
    rootElement.setAttribute("data-component", "mf-booking-widget")
    rootElement.setAttribute("data-mf-id", "mf-booking-widget")
    // rootElement.setAttribute("id", "booking___app")
    document.body.appendChild(rootElement);
    window.msd = {
        "msLoginApiUrl": "https://api-qa-session-skyplus6e.goindigo.in",
        "sKey": "S9pIpbp4QxCTs98Nzrmy0A==",
        "msBookingApiUrl": "https://api-dev-booking-skyplus6e.goindigo.in",
        "msBookingUserKey": "c27be4d9d81330b0870c0854ed6eba06",
        "msLoginUserKey": "6ef12f4a8299c033c68a4431daf670e1",
        "paymentPagePath": "https://comm-uat.goindigo.in/IndiGo-Dev2/Payment/SessionTransfer?v=2",
        "payNowPagePath": "https://comm-uat.goindigo.in/IndiGo-Dev2/Booking/PaymentDeepLinkApp",
        "itineraryPagePath": "https://aem-dev-skyplus6e.goindigo.in/bookings/itinerary.html",
        "bridgeDeepLinkPath": "https://comm-uat.goindigo.in/IndiGo-Dev2/Booking/SkyplusGenericDeepLinkApp?cid=skyplus",
        "mfLogsUrl": "https://api-dev-logging-skyplus6e.goindigo.in/v1/logging/error",
        "mfLogsKey": "a2fa7694f7ea6d08b9a59e8eac9ff4b0",
        "enableSlashedPrices": false,
        "encryptionKey": "",
        "analyticsEncryptionKey": "",
        "msBookingDeeplinkApiUrl": "",
        "msBookingDeeplinkUserKey": ""
    }

    let remoteUrl = "https://app-booking-dev-skyplus6e.goindigo.in/remoteEntry.js"
    // remoteUrl = "http://localhost:8081/remoteEntry.js";
    const envConfig = "https://app-booking-dev-skyplus6e.goindigo.in/config/env-config.js";

    setTimeout(async () => {
        await loadScript(remoteUrl);
        await loadScript(envConfig);
    });
    loadCSS("https://app-static-uat-skyplus6e.goindigo.in/des-system/css/main.css")

    const cols = [...block.firstElementChild.children];
    console.log("---decorade: microfronend", block, cols)
    setTimeout(async () => {
        loadScript("./blocks/microfrontend/containerapp/dist/clientlib-site/site.js")
    }, 4000)
}