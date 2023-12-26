export default async function decorate2(block) {
    const cols = [...block.firstElementChild.children];
    block.classList.add("slider");
    block.setAttribute("id", "slider");
    [...block.children].forEach((row, index) => {
        row.classList.add(`slider-item`);
        if (index === 0) {
            row.classList.add("active");
        }

        [...row.children].forEach((col) => {
            const pic = col.querySelector('picture');
        })
    })
    console.log("--red:::::", block, cols)

    block.innerHTML += `<ul id="dots" class="list-inline dots"></ul>`;
    var slider = document.getElementById('slider')
    var sliderItem = slider.getElementsByClassName('slider-item');
    var dots = document.getElementById('dots');
    var dotsChild = document.getElementById('dots').getElementsByTagName('li');
    for (var i = 0; i < sliderItem.length; i++) {
        console.log("---carousel:::::::", sliderItem)
        dots.appendChild(document.createElement('li'));
        dotsChild[i].classList.add('list-inline-item');
        dotsChild[i].setAttribute("id", i);
        dotsChild[i].innerHTML = i;
        dotsChild[0].classList.add('active');
        dotsChild[i].addEventListener("click", runSlider);
    }
    function runSlider() {
        var dnum = this.getAttribute("id");
        for (var i = 0; i < sliderItem.length; i++) {
            sliderItem[i].classList.remove('active');
            sliderItem[dnum].classList.add('active');
            dotsChild[i].classList.remove('active');
            dotsChild[dnum].classList.add('active');
        }
    }
}

