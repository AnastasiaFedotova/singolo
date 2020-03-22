class Navigation {
  constructor(navSelector, styleClass) {
    this.styleClass = styleClass;
    this.nav = document.querySelector(navSelector);
    this.anchors = this.nav.querySelectorAll('a[href*="#"]');
    this.position = this.getPosition();

    this.toScrol();
    window.addEventListener("scroll", () => this.switch());
  }

  getPosition() {
    let position = [],
        headHeight = 50;
    for (let item of this.anchors) {
      position.push(document.getElementById(item.getAttribute('href').substr(1)).getBoundingClientRect().top + pageYOffset - headHeight);
    }
    return position;
  }

  toScrol() {
    for (let anchor of this.anchors) {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      })
    }
  }

  switch() {
    for(let i = this.position.length - 1; i >= 0; i--) {
      if (pageYOffset > this.position[i]) {
        document.querySelector("." + this.styleClass).classList.remove(this.styleClass);
        this.anchors[i].classList.add(this.styleClass);
        return;
      }
    };
  }
}

class Gallery {
  constructor (gallerySelector, styleClassActiveItemMenu, styleClassActiveImg) {
    this.activeItemMenu = styleClassActiveItemMenu;
    this.activeImg = styleClassActiveImg;
    this.gallery = document.querySelector(gallerySelector);

    this.menuList = this.gallery.querySelector(".portfolio__menu");
    this.imgList = this.gallery.querySelector(".portfolio__gallery");

    this.imgList.addEventListener("click", event => this.toFocusImg(event));
    this.menuList.addEventListener("click", event => this.toFocusMenu(event));
  }
  toFocusMenu(event) {
    event.preventDefault();
    if (event.target.tagName != "A" || event.target.classList.contains(this.activeItemMenu)) return;
    this.menuList.querySelector(`.${this.activeItemMenu}`).classList.remove(this.activeItemMenu);
    event.target.classList.add(this.activeItemMenu);
    this.arrangeImg(event.target)
  }

  arrangeImg(linkActive) {
    let arrImg = [];
    document.querySelector(".portfolio").classList.add("portfolio_loading");
    Array.from(this.imgList.children).forEach(li => {
      if(li.dataset.order == linkActive.dataset.indicator) arrImg.unshift({ src: li.children[0].src, order: li.dataset.order});
      else arrImg.push({ src: li.children[0].src, order: li.dataset.order})
    });
    setTimeout(() => {arrImg.forEach((newData, index) => {
      this.imgList.children[index].children[0].src = newData.src;
      this.imgList.children[index].dataset.order =  newData.order;
      })
    }, 500);
    setTimeout(() => {document.querySelector(".portfolio").classList.remove("portfolio_loading")}, 500);
  }

  toFocusImg(event) {
    event.preventDefault();
    if (event.target.tagName != "IMG" ) return;
    if (event.target.closest("li").classList.contains(this.activeImg)) {
      event.target.closest("li").classList.remove(this.activeImg);
      return;
    }
    if(this.imgList.querySelector(`.${this.activeImg}`)) this.imgList.querySelector(`.${this.activeImg}`).classList.remove(this.activeImg);
    event.target.closest("li").classList.add(this.activeImg);
  }
}

class Slider {
  constructor(sliderSelector, slidesSelectors) {
    this.slider = document.querySelector(sliderSelector);
    this.slides = document.querySelectorAll(slidesSelectors);
    this.position = 0;
    this.slider.querySelector(".slider__btn_next").addEventListener("click", () => this.goNext.call(this));
    this.slider.querySelector(".slider__btn_back").addEventListener("click", () => this.goBack.call(this))
  }

  goNext() {
    let sliderBack = this.position;
    this.position + 1 >= this.slides.length ? this.position = 0 : this.position++;
    this.draw(this.position, sliderBack, "next");
  }

  goBack() {
    let sliderBack = this.position;
    this.position - 1 < 0 ? this.position = this.slides.length : this.position--;
    this.draw(this.position, sliderBack, "back");
  }

  draw(currentSlider, sliderBack, direction) {
    if(direction == "next") {
      this.slides[currentSlider].style.zIndex = 1;
      this.slides[sliderBack].style.zIndex = 2;
      this.slides[currentSlider].classList.add("slide_right");
      return;
    }
  }
}

class Mobile {
  constructor(button) {
    this.button = document.querySelector(button);
    this.button.addEventListener("click", () => this.showScreen());
  }

  showScreen() {
    Array.prototype.forEach.call(this.button.querySelectorAll(`img`), elem => elem.classList.toggle("btn_hidden"));
  }
}

class Modal {
  constructor(modalSelector, callFormSelector) {
    this.modal = document.querySelector(modalSelector);
    this.callForm = document.querySelector(callFormSelector);

    this.callForm.querySelector(".message__btn").addEventListener("click", e => this.openModal(e))
    this.modal.querySelector(".modal__btn").addEventListener("click", e => this.closeModal(e))
  }

  openModal(event) {
    event.preventDefault();
    this.modal.classList.add("overlay_show");
    this.initModal();
  }

  initModal() {
    let data = this.getData();
    let div = document.createElement("div");
    div.classList.add("modal__message");
    div.innerHTML = `<h2>${data.message}</h2>
                    <p>${data.subject}</p>
                    <p>${data.description}</p>`;
    this.modal.querySelector(".modal").prepend(div);
  }

  getData() {
    let obj = {
      "message": "The letter was sent",
      "subject": this.callForm.querySelector(".message__subject").value || "No subject",
      "description": this.callForm.querySelector(".message__content").value || "No description"
    }
    return obj;
  }

  deletData() {
    this.modal.querySelector(".modal__message").remove();
    Array.from(this.callForm.querySelectorAll("input")).forEach(input => input.value = "");
    this.callForm.querySelector("textarea").value = "";
  }

  closeModal(event) {
    event.preventDefault();
    this.deletData();
    this.modal.classList.remove("overlay_show");
  }
}


let navSingolo = new Navigation("nav", "focus");
let portfolio = new Gallery(".portfolio__container", "focus", "portfolio__img_active");
let slider = new Slider(".slider", ".slide");
let mobile1 = new Mobile(".btn_mobile1");
let mobile2 = new Mobile(".btn_mobile2");
let mobile3 = new Mobile(".btn_mobile3");
let modal = new Modal(".overlay", ".message");