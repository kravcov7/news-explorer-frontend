import Popup from "./Popup";
export default class PopupSignIn extends Popup {
  constructor(container, api, auth) {
    super();
    this._container = container;
    this._signIn = container;
    this._enterButton = container.querySelector("#signin-submit-button");
    this._succesPopup = container.querySelector("#succes-popup");
    this._auth = auth;
    this.form = container.querySelector("#form-login");
    this.mail = container.querySelector("#email-login");
    this.password = container.querySelector("#password");
    this.api = api;
    // this.header = header;
    // this.login = this.login.bind(this);
    this._clearContent = this._clearContent.bind(this);
    this.setSubmitListeners();
  }

  login = (event) => {
    event.preventDefault();
    const loginData = {
      email: this.mail.value,
      password: this.password.value,
    };
    this.api
      .signIn(loginData)
      .then((res) => {
        super.close();
        // this.header.render();
      })
      .catch(
        (err) => console.log(err)
        // {
        //   this.popup.querySelector('.popup__error-message_centred').textContent = err.message;
        // }
      );
  }

  setSubmitListeners() {
    this._enterButton.addEventListener("click", (event) => this.login(event));
  }
}
