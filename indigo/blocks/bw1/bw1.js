

import { loadCSS, loadScript } from "../../scripts/aem.js";
export default async function decorate(block) {
    var script = document.createElement('script');
script.src = 'https://aem-dev-skyplus6e.goindigo.in/content/experience-fragments/skyplus6e/in/en/edge/bw.js?test';
document.head.appendChild(script);
    
    setTimeout(async () => {
        console.log("--Timeout finished::--bw.js::::::::::::::::::::::::", document.querySelectorAll("[data-component='mf-booking-widget']"))


        let remoteUrl = "https://app-booking-dev-skyplus6e.goindigo.in/remoteEntry.js"
        const envConfig = "https://app-booking-dev-skyplus6e.goindigo.in/config/env-config.js";

        await loadScript(envConfig);
        await loadScript(remoteUrl);
        document.querySelector("[data-block-name='bw1']").appendChild(document.querySelector("[data-component='mf-booking-widget']"));
    })
}


