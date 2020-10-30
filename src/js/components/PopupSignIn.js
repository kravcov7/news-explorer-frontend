import Popup from './Popup';
export default class PopupSignIn extends Popup {
  constructor(container, api, auth) {
    super();
    this._container = container;
    this._signIn = container;
    // this._signUpBtn = container.querySelector('#signup-submit-button');
    this._enterButton = container.querySelector('#signin-submit-button');
    // console.log(this._enterButton);
    this._succesPopup = container.querySelector('#succes-popup');
    this._auth = auth;
    this.form = container.querySelector('#form-login');
    this.mail = container.querySelector('#email-login');
    this.password = container.querySelector('#password');
    this.api = api;
    // this.header = header;
    this.login = this.login.bind(this);
    this._clearContent = this._clearContent.bind(this);
    console.log(this._clearContent);
    this.setSubmitListeners();
  }

  login (popup) {

    event.preventDefault();
    const loginData = {
      email: this.mail.value,
      password: this.password.value,
    };

    this.api.signIn(loginData)
      .then((res) => {
        console.log(this.close(popup));
        super.close(popup);
        this.header.render();
      })
      .catch((err) => console.log(err)
      // {
      //   this.popup.querySelector('.popup__error-message_centred').textContent = err.message;
      // }
      )
  }

  setSubmitListeners() {
    this._enterButton.addEventListener('click', (event) => this.login(event));

  }

}
