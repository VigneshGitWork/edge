export default function decorate(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columns-${cols.length}-cols`);
  
  
    // setup image columns
    [...block.children].forEach((row, index) => {
      console.log("--------------------", row, index);
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            // picture is only content in column
            picWrapper.classList.add('columns-img-col');
          }
        }
      });
    });
  
  
    //DOM-structure update- start
    const childElements = [...block.children];
    const firstElement = childElements[0];
    firstElement.classList.add("column-item")
    if (childElements.length > 1) {
      childElements.shift()
    } else {
      childElements = []; // covered with first element
    }
    let exceptFirstElement = document.createElement("div");
    exceptFirstElement.innerHTML = "";
    exceptFirstElement.classList.add("column-right-section")
    for (const element of childElements) {
      element.classList.add("column-item");
      exceptFirstElement.appendChild(element.cloneNode(true));
    }
  
    block.innerHTML = "<div class='column-left-section'>"+firstElement.outerHTML+"</div>" + exceptFirstElement.outerHTML;
    //DOM-structure update- END
  }
  