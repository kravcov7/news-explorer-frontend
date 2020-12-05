import Popup from './Popup';
export default class PopupSignUp extends Popup {
  constructor(popupName, api, messagePopup, formValidator) {
    super(popupName);
    this.form = this.popup.querySelector('#form-signup');
    this.userMail = document.querySelector('#email-signup');
    this.userName = document.querySelector('#name');
    this.userPassword = document.querySelector('#password-signup');
    this.api = api;
    this.messagePopup = messagePopup;
    this.formValidator = formValidator;
  }

  _register = (event) => {
    event.preventDefault();
    const newUserInfo = {
      name: this.userName.value,
      email: this.userMail.value,
      password: this.userPassword.value,
    };
    // this.formValidator(this.form).checkFormValid();
    this.api.signUp(newUserInfo)
      .then((res) => {
        super.close();
        this.messagePopup.open();
        localStorage.setItem('token', res.token);
      })
      .catch((err) => console.log(err)
      // { this.popup.querySelector('.popup__error-message_centred').textContent = err.message; }
      )
  }

  _setSubmitListeners() {
    this.form.addEventListener('submit', this._register);
  }

  open = () => {
    super.open();
    super.clearContent();

    this._setSubmitListeners();
    // this.formValidator(this.form).setEventListeners();
  }
}