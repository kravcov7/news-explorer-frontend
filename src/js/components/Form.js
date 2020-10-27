export default class Form {
  constructor(form, inputData) {
    this._form = form;
    this._inputs = form.querySelectorAll(".form__input");
    this._getInfo = this._getInfo.bind(this);
    this._inputData = inputData;
  }

  setServerError() {}

  _getInfo() {
    let i = 0;
    for (let element in this._inputData) {
      this._inputData[element] = this._inputs[i].value;
      i++;
    }
    return this._inputData;
  }


}
