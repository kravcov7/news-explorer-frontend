
import './../styles/index.css';

import Popup from '../js/components/Popup';
import Form from '../js/components/Form';
import {errorMessages} from '../js/constants/errorMaessages';
import FormValidator from '../js/components/FormValidator';
import MainApi from '../js/api/MainApi';
import NewsApi from '../js/api/NewsApi';

import {defaultMainApi} from '../js/constants/constants';

const auth = document.querySelector(".header-menu__button");
const popupAuthorization = document.querySelector("#authorization");
const signUp = document.querySelector('#signin-button');
const enterButton = document.querySelector('#enter-button');
const signIn = document.querySelector("#signup-popup");
const formLogin = document.querySelector("#form-login");
const formSignup = document.querySelector("#form-signup");
const signInSubmitBtn = document.querySelector("#signin-submit-button");
const signUpSubmitBtn = document.querySelector("#signup-submit-button");

const succesPopup = document.querySelector('#succes-popup');
const inputDataAuthorization = {email: '', password: ''};
const inputDataSignUp = {email: '', password: '', name: ''};

const togglePopup = new Popup(popupAuthorization, signIn, signUp, succesPopup, auth, enterButton);
const formAuth = new Form(formLogin, inputDataAuthorization);
const formSign = new Form(formSignup, inputDataSignUp);
const Api = new MainApi(url);

function getInputsAuth(event) {
  event.preventDefault();
  const inputData = formAuth._getInfo();
  console.log(inputData)
};

function getInputsSign(event) {
  event.preventDefault();
  const inputData = formSign._getInfo();
};

const validateLogin = new FormValidator(formLogin,  errorMessages);
const validateSignUp = new FormValidator(formSignup,  errorMessages);

signInSubmitBtn.addEventListener('click', getInputsAuth);
signUpSubmitBtn.addEventListener('click', getInputsSign);

const mainApi = new MainApi(defaultMainApi);
