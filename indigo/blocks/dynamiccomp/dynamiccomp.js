
export default function decorate(block) {
    console.log("---dynamic comp::::", block, this)
    let variation = "";
    let contentHtml = "";

    [...block.children].forEach((row, rowIndex) => {
        [...row.children].forEach((col, colIndex) => {
            if (rowIndex === 0 && colIndex === 1) {
                variation = col.textContent;
            }
            if (rowIndex === 1 && colIndex === 1) {
                contentHtml = col.innerHTML;
            }
        })
    })

    block.innerHTML = contentHtml;
    if (variation) {
        const splited = variation.split(",")
        block.children[0].classList.add(...splited);
    }
}
