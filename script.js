class Navigation {
  constructor(nav, styleClass) {
    this.styleClass = styleClass;
    this.nav = document.querySelector(nav);
    this.nav.addEventListener("click", event => this.toFocus.call(this, event));
  }

  toFocus(event) {
    if(event.target.tagName != "A" || event.target.classList.contains(this.styleClass)) return;
    this.nav.querySelector(`.${this.styleClass}`).classList.remove(this.styleClass);
    event.target.classList.add(this.styleClass);
  }
}

class Slider {
  constructor(slider, countSlider) {
    this.slider = document.querySelector(slider);
    this.count = countSlider;
    this.position = 1;
    this.slider.querySelector(".slider__btn_next").addEventListener("click", () => this.goNext.call(this));
    this.slider.querySelector(".slider__btn_back").addEventListener("click", () => this.goBack.call(this))
  }

  goNext() {
    let sliderBack = this.position;
    this.position + 1 > this.count ? this.position = 1 : this.position++;
    this.draw(this.position, sliderBack);
  }

  goBack() {
    let sliderBack = this.position;
    this.position - 1 < 1 ? this.position = this.count : this.position--;
    this.draw(this.position, sliderBack);
  }

  draw(count, countBack) {
    this.slider.classList.remove(`slider_${countBack}`);
    this.slider.classList.add(`slider_${count}`);
  }
}

class Mobile {
  constructor(button) {
    this.button = document.querySelector(button);
    this.button.addEventListener("click", () => this.showScreen.call(this));
  }

  showScreen() {
    Array.prototype.forEach.call(this.button.querySelectorAll(`img`), elem => elem.classList.toggle("btn_hidden"));
  }
}


let navSingolo = new Navigation("nav", "focus");
let navPortfolio = new Navigation(".portfolio__nav", "focus");
let slider = new Slider(".slider", 2);
let mobile1 = new Mobile(".btn_mobile1");
let mobile2 = new Mobile(".btn_mobile2");
let mobile3 = new Mobile(".btn_mobile3");
