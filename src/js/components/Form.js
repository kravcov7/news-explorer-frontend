export default class Form {
  constructor(form, inputData) {
    this._form = form;
    this._inputs = form.querySelectorAll(".input");
    this.getInfo = this.getInfo.bind(this);
    this._inputData = inputData;
  }

  setServerError() {}

  getInfo() {
    let i = 0;
    for (let element in this._inputData) {
      this._inputData[element] = this._inputs[i].value;
      i++;
    }
    return this._inputData;
  }
}
