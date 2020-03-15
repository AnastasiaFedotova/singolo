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
  constructor(slider) {
    this.slider = slider;
  }
}


let navSingolo = new Navigation("nav", "focus");
