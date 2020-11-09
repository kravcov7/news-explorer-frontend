export default class Popup {
  constructor(container, signIn, signUpBtn, succesPopup, auth, enterButton) {
    this._container = container || "";
    this._signIn = signIn || "";
    this._signUpBtn = signUpBtn || "";
    this._enterButton = enterButton || "";
    this._succesPopup = succesPopup || "";
    this.open = this.open.bind(this);
    this.authListener = this.authListener.bind(this);
    this._setListner = this._setListner.bind(this);
    this.close = this.close.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this._auth = auth || "";
    this._clearContent = this._clearContent.bind(this);
  }

  open(popup) {
    popup.classList.add("popup_is-opened");
    this._setListner(popup);
  }

  close(popup) {
    this._clearContent(popup);
    this._container.classList.remove("popup_is-opened");
    console.log('закртыие попапа')
  }

  _clearContent() {
    this._container.querySelectorAll(".form__input").forEach((el) => {
      el.value = "";
    });
    this._container.querySelectorAll(".form__error").forEach((el) => {
      el.textContent = "";
    });
  }

  authListener() {
    this._auth.addEventListener("click", () => this.open(this._container));
  }

  _setListner(popup) {
    const closeButtonPopup = popup.querySelector("#close-popup");
    const overlay = popup.querySelector("#overlay");
    overlay.addEventListener("click", () => this.close(popup));
    closeButtonPopup.addEventListener("click", () => this.close(popup));
    this._signUpBtn.addEventListener("click", (event) =>
      this.togglePopup(event)
    );
    this._enterButton.addEventListener("click", (event) =>
      this.togglePopup(event)
    );
  }

  togglePopup(event) {
    if (event.target === this._signUpBtn) {
      this.open(this._signIn);
      this.close(this._container);
    } else if (event.target === this._enterButton) {
      this.close(this._signIn);
      this.open(this._container);
    }
  }

  openSignUp() {
    this._signUp.classList.add("popup_is-opened");
  }
}
