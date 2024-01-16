export default async function decorate(block) {
    const keyScript = block.children[0]?.children[0];
    const scriptToLoad = keyScript.innerHTML;
    if (document.readyState !== 'loading') {
        console.log('document is already ready, just execute code here');
        myInitCode();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            console.log('document was not ready, place code here');
            myInitCode();
        });
    }
    console.log("---script links::::::", keyScript,scriptToLoad)
    function myInitCode() {
        // setTimeout(()=>{
        console.log("--Timeout finished:::XF comp:::::::::::::::::::::")
        var script = document.createElement('script');
        script.src = scriptToLoad
        document.head.appendChild(script);
        block.children[0].innerHTML = "";
        // },10000)
    }
}


// xf
