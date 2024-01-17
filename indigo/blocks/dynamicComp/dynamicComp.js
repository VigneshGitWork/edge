
export default function decorate(block) {
    console.log("---dynamic comp::::", block, this)
    let variation = "";
    let content = "";

    [...block.children].forEach((row, rowIndex) => {
        [...row.children].forEach((col, colIndex) => {
            if (rowIndex === 0 && colIndex === 1) {
                variation = col.textContent;
            }
            if (rowIndex === 1 && colIndex === 1) {
                content = col;
            }
        })
    })

    block.innerHTML = "";
    block.appendChild(content);
    if (variation) {
        const splited = variation.split(",")
        block.classList.add(...splited);
    }
}
