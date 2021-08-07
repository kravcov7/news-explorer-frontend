export default class Popup {
  constructor(popupName) {
    this.popup = popupName;
    this.close = this.close.bind(this);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    this._setListner();
    document.querySelector('.body').append(this.popup);
  }

  close() {
    this.popup.closest('.popup').classList.remove('popup_is-opened');
  }

  clearContent() {
    this.popup.querySelectorAll(".form__input").forEach((el) => {
      el.value = "";
    });
    this.popup.querySelectorAll(".form__error").forEach((el) => {
      el.textContent = "";
    });

  }

  _setListner() {
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }
}