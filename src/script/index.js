import "./../styles/index.css";

import Popup from "../js/components/Popup";
import Form from "../js/components/Form";
import { errorMessages } from "../js/constants/errorMaessages";
import FormValidator from "../js/components/FormValidator";
import MainApi from "../js/api/MainApi";
import NewsApi from "../js/api/NewsApi";
import NewsCardList from "../js/components/NewsCardList";
import NewsCard from "../js/components/NewsCard";
import PopupSignIn from "../js/components/PopupSignIn";
import PopupSignUp from "../js/components/PopupSignUp";
import Header from "../js/components/Header";

import { defaultMainApi } from "../js/constants/constants";

const auth = document.querySelector("#authorization-button");
const popupAuthorization = document.querySelector("#authorization");
const signUp = document.querySelector("#signin-button");
const enterButton = document.querySelector("#enter-button");
const popupRegistr = document.querySelector("#signup-popup");
const succesPopup = document.querySelector("#succes-popup");
const formLogin = document.querySelector("#form-login");
const formSignup = document.querySelector("#form-signup");
const signInSubmitBtn = document.querySelector("#signin-submit-button");
const signUpSubmitBtn = document.querySelector("#signup-submit-button");
const searchFormInput = document.querySelector("#search-form");
const searchFormButton = document.querySelector(".search__button");
const resultNotFound = document.querySelector('#not-found');
const resultLoader = document.querySelector('#preloader');
const resultContainer = document.querySelector('.result__articles');
const resultBlock = document.querySelector('.result_container');
const resultMoreButton = document.querySelector('.result__button');
const resultTitle = document.querySelector('.result__title');

// Header
const savedArticle = document.querySelector('.header-menu__article');
const noUser = document.querySelector('.menu__li_nouser');
const quitButton = document.querySelector('#quit-button');

const userName = document.querySelector('.menu__button_auth_user');


const cardTemplate = document.querySelector('#card-template').content.querySelector('.article');


const inputDataAuthorization = { email: "", password: "" };
const inputDataSignUp = { email: "", password: "", name: "" };
const inputDataSearch = { keyword: "" };

const togglePopup = new Popup(
  popupAuthorization,
  popupRegistr,
  signUp,
  succesPopup,
  auth,
  enterButton
);
togglePopup.authListener();
const mainApi = new MainApi(defaultMainApi);
const header = new Header(mainApi);
const popupSignIn = new PopupSignIn (popupAuthorization, mainApi, auth, header);

const popupSignUp = new PopupSignUp(popupRegistr, mainApi);
const formAuth = new Form(formLogin, inputDataAuthorization);
const formSign = new Form(formSignup, inputDataSignUp);
const formSearch = new Form(searchFormInput, inputDataSearch);
const newsApi = new NewsApi();
const validateLogin = new FormValidator(formLogin, errorMessages);
const validateSignUp = new FormValidator(formSignup, errorMessages);
const createCard = (...args) => new NewsCard(...args);
const addCard = (...arg) => new NewsCardList(resultContainer, cardTemplate, createCard).addCard(...arg);
const cardList = new NewsCardList(resultContainer, cardTemplate, createCard);


function getInputsAuth(event) {
  event.preventDefault();
  const inputData = formAuth.getInfo();
}

function getInputsSign(event) {
  event.preventDefault();
  const inputData = formSign.getInfo();
  console.log(inputData)
  mainApi
    .signUp(inputData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

// поиск
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
        resultBlock.classList.remove('hidden');
      }
    })
    .then(() => {
      resultBlock.classList.remove('hidden');
      resultLoader.classList.add('hidden');
    })
    .catch((err) => console.log(err));
}

function exit() {
  mainApi.unlogin()
  .then(() => {
    header.render();
  })
  .catch((err) => console.log(err))
}

signInSubmitBtn.addEventListener("click", getInputsAuth); // кнопка входа
signUpSubmitBtn.addEventListener("click", getInputsSign); // кнопка регистрации попапа
searchFormButton.addEventListener("click", formSearchEvent); // кнопка Поиска
resultMoreButton.addEventListener('click', () => cardList.renderMore()); // кнопка Показать еще

quitButton.addEventListener('click', exit); // кнопка разлогина

header.render();