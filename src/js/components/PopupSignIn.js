import Popup from "./Popup";
export default class PopupSignIn extends Popup {
  constructor(popupName, api, header, formValidator) {
    super(popupName);
    this.form = this.popup.querySelector('#form-login');
    this.mail = this.form.querySelector('#email-login');
    this.password = this.form.querySelector('#password');
    this.api = api;
    this.header = header;
    this.formValidator = formValidator;
  }

  _login = (event) => {
    event.preventDefault();
    const loginData = {
      email: this.mail.value,
      password: this.password.value,
    };
    
    // this.formValidator(this.form).checkFormValid();
    this.api.signIn(loginData)
      .then((res) => {
        // localStorage.setItem('token', res.token);
        super.close();
        this.header.render();
      })
      .catch((err) => {
        this.popup.querySelector('.popup__error-message_centred').textContent = err.message;
      })
  }

  open = () => {
    super.open();
    super.clearContent();
    this._setSubmitListeners();
    // this.formValidator(this.form).setEventListeners();
  }

  _setSubmitListeners() {
    this.form.addEventListener('submit', this._login);
  }
}