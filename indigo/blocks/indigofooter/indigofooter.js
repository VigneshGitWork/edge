export default async function decorate(block) {
    // setTimeout(() => {
    var script = document.createElement('script');
    script.src = 'https://aem-dev-skyplus6e.goindigo.in/content/experience-fragments/skyplus6e/in/en/edge/footer.js?test';
    document.head.appendChild(script);
    // }, 9000)
    block.classList.add("skyplus-indigo-global-wrapper-v1")
    skyinstance="skyplus-edge";
}
