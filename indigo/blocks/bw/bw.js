
// var script = document.createElement('script');
// script.src = 'https://aem-dev-skyplus6e.goindigo.in/content/experience-fragments/skyplus6e/in/en/edge/bw.js?test';
// document.head.appendChild(script);
import { loadCSS, loadScript } from "../../scripts/aem.js";
export default async function decorate(block) {
    const widget = document.createElement("div");
    widget.setAttribute("data-page-type", "homepage")
    widget.setAttribute("data-component", "mf-booking-widget")
    widget.setAttribute("data-mf-id", "mf-booking-widget")
    widget.setAttribute("data-persona", "Member")
    // widget.setAttribute("id", "booking___app")
    document.querySelector("[data-block-name='bw']").appendChild(widget);
    setTimeout(async () => {
        console.log("--Timeout finished::--bw.js::::::::::::::::::::::::", document.querySelectorAll("[data-component='mf-booking-widget']"))


        let remoteUrl = "https://app-booking-dev-skyplus6e.goindigo.in/remoteEntry.js"
        const envConfig = "https://app-booking-dev-skyplus6e.goindigo.in/config/env-config.js";

        await loadScript(envConfig);
        await loadScript(remoteUrl);
    })
}