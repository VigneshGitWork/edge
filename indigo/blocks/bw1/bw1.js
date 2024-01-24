
import { loadCSS, loadScript } from "../../scripts/aem.js";
export default async function decorate(block) {
    const widget = document.createElement("div");
    widget.setAttribute("data-page-type", "homepage")
    widget.setAttribute("data-component", "mf-booking-widget")
    widget.setAttribute("data-mf-id", "mf-booking-widget")
    widget.setAttribute("data-persona", "Member")
block.innerHTML="";
    block.appendChild(widget);
 
    const config = {
        mfBase: "https://app-booking-dev-skyplus6e.goindigo.in",
    };
    [...block.children].forEach((row, rowIndex) => {
        let rowName;
        [...row.children].forEach((col, colIndex) => {
            console.log("---rrr:::", col, row)
            if (colIndex === 0) {
                rowName = col.textContent;
            } else {
 
                config[rowName] = col.textContent;
            }
        })
    })
    console.log("-----bw---matchd:::::", config)
 
    setTimeout(async () => {
        console.log("--Timeout finished::--bw.js::::::::::::::::::::::::", document.querySelectorAll("[data-component='mf-booking-widget']"))
        let remoteUrl = config.mfBase + "/remoteEntry.js"
        const envConfig = config.mfBase + "/config/env-config.js";
 
        await loadScript(envConfig);
        await loadScript(remoteUrl);
    })
}
 
