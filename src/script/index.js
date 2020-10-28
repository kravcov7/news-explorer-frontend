import "./../styles/index.css";

import Popup from "../js/components/Popup";
import Form from "../js/components/Form";
import { errorMessages } from "../js/constants/errorMaessages";
import FormValidator from "../js/components/FormValidator";
import MainApi from "../js/api/MainApi";
import NewsApi from "../js/api/NewsApi";
import NewsCardList from "../js/components/NewsCardList";

import { defaultMainApi } from "../js/constants/constants";

const auth = document.querySelector(".header-menu__button");
const popupAuthorization = document.querySelector("#authorization");
const signUp = document.querySelector("#signin-button");
const enterButton = document.querySelector("#enter-button");
const signIn = document.querySelector("#signup-popup");
const formLogin = document.querySelector("#form-login");
const formSignup = document.querySelector("#form-signup");
const signInSubmitBtn = document.querySelector("#signin-submit-button");
const signUpSubmitBtn = document.querySelector("#signup-submit-button");
const searchFormInput = document.querySelector("#search-form");
const searchFormButton = document.querySelector(".search__button");
const resultNotFound = document.querySelector('#not-found');
const resultLoader = document.querySelector('#loader');
const resultContainer = document.querySelector('.result__container');
const resultMoreButton = document.querySelector('.result__button');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.article');

const succesPopup = document.querySelector("#succes-popup");
const inputDataAuthorization = { email: "", password: "" };
const inputDataSignUp = { email: "", password: "", name: "" };
const inputDataSearch = { keyword: "" };

const togglePopup = new Popup(
  popupAuthorization,
  signIn,
  signUp,
  succesPopup,
  auth,
  enterButton
);
const formAuth = new Form(formLogin, inputDataAuthorization);
const formSign = new Form(formSignup, inputDataSignUp);
const formSearch = new Form(searchFormInput, inputDataSearch);
const mainApi = new MainApi(defaultMainApi);
const newsApi = new NewsApi();
const validateLogin = new FormValidator(formLogin, errorMessages);
const validateSignUp = new FormValidator(formSignup, errorMessages);
const createCard = (...args) => new NewsCard(...args);
const addCard = (...arg) => new NewsCardList(resultContainer, cardTemplate, createCard).addCard(...arg);
const cardList = new NewsCardList(cardTemplate, createCard);

function getInputsAuth(event) {
  event.preventDefault();
  const inputData = formAuth.getInfo();
  console.log(inputData);
}

function getInputsSign(event) {
  event.preventDefault();
  const inputData = formSign.getInfo();
  mainApi
    .signUp(inputData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function formSearchEvent(event) {
  event.preventDefault();
  const inputData = formSearch.getInfo();
  newsApi
    .getNews(inputData)
    .then((res) => {
      if (res.articles.length === 0) {
        return resultNotFound.classList.remove("hidden");
      } else {
        cardList.render(res.articles);

      }
    })
    .then(() => {
      resultContainer.classList.remove('hidden');
      resultLoading.classList.add('hidden');
    })
    .catch((err) => console.log(err));
}

signInSubmitBtn.addEventListener("click", getInputsAuth);
signUpSubmitBtn.addEventListener("click", getInputsSign);
searchFormButton.addEventListener("click", formSearchEvent);