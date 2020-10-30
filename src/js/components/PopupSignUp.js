import Popup from './Popup';
export default class PopupSignUp extends Popup {
  constructor(container, api, messagePopup) {
    super();
    this._container = container;
    this._signUp = container;
    this._signUpBtn = container.querySelector('#signup-submit-button');
    console.log(this._signUpBtn);
    this._succesPopup = container.querySelector('#succes-popup');
    // this._auth = auth;
    this.userMail = container.querySelector('#email-signup');
    this.userName = container.querySelector('#name');
    this.userPassword = container.querySelector('#password-signup');
    this.form = container.querySelector('#form-signup');
    this.api = api;
    this.messagePopup = messagePopup;
    this.setSubmitListeners();
  }

  // open() {
  //   super.open();
  //   super.clearForm();
  //   this.setSubmitListeners();
  // }

  register = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: this.userName.value,
      email: this.userMail.value,
      password: this.userPassword.value,
    };
    this.api.signUp(newUserInfo)
      .then((res) => {
        console.log(res);
        super.close();
        // this.messagePopup.open();
        this.header.render();
      })
      .catch((err) => console.log(err)
      // {
      //   this.popup.querySelector('.popup__error-message_centred').textContent = err.message;
      // }
      )
  }

  setSubmitListeners() {
    this._signUpBtn.addEventListener('click', this.register);
  }
}