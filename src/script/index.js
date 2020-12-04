import "./../styles/index.css";
import { auth, popupAuthorization, signUp, enterButton, popupRegistr, succesPopup, formLogin, formSignup, signInSubmitBtn, signUpSubmitBtn, searchFormInput, searchFormButton, resultNotFound, resultLoader,
   resultContainer, resultBlock, resultMoreButton, successMessageIn, resultTitle, inputTag, savedArticle, noUser, quitButton, userName, cardTemplate, inputDataAuthorization, inputDataSignUp, inputDataSearch } from "../js/constants/constants";
import { newsApiServer, defaultMainApi } from '../js/config/config';
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
import PopupMessage from "../js/components/PopupMessage";
import Header from "../js/components/Header";
import Result from "../js/components/Result";

const mainApi = new MainApi(defaultMainApi);
const header = new Header(mainApi);
const popupMessage = new PopupMessage(succesPopup);
const popupSignIn = new PopupSignIn(popupAuthorization, mainApi, header);
const popupSignUp = new PopupSignUp(popupRegistr, mainApi, popupMessage);
const formAuth = new Form(formLogin, inputDataAuthorization);
const formSign = new Form(formSignup, inputDataSignUp);
const formSearch = new Form(searchFormInput, inputDataSearch);
const newsApi = new NewsApi(newsApiServer);
const validateLogin = new FormValidator(formLogin, errorMessages);
const validateSignUp = new FormValidator(formSignup, errorMessages);
const createCard = (...args) => new NewsCard(...args);
const addCard = (...arg) => new NewsCardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);
const cardList = new NewsCardList(resultContainer, cardTemplate, createCard, mainApi);
const result = new Result(newsApi, cardList);

auth.addEventListener('click', () => {
  popupSignIn.open();
});
signUp.addEventListener('click', () => {
  popupSignIn.close();
  popupSignUp.open();
});
enterButton.addEventListener('click', () => {
  popupSignUp.close();
  popupSignIn.open();
});
successMessageIn.addEventListener('click', () => {
  popupMessage.close();
  popupSignIn.open();
});

function getInputsAuth(event) {  // авторизация
  event.preventDefault();
  const inputData = formAuth.getInfo();
}

function getInputsSign(event) {  // регистрация
  event.preventDefault();
  const inputData = formSign.getInfo();
  mainApi
    .signUp(inputData)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function exit() { // выход с акка
  mainApi.unlogin()
  .then(() => {
    header.render();
  })
  .catch((err) => console.log(err))
}

// signInSubmitBtn.addEventListener("click", getInputsAuth); // кнопка входа
// signUpSubmitBtn.addEventListener("click", getInputsSign); // кнопка регистрации попапа
searchFormInput.addEventListener('submit', () => result.formSearchEvent(inputTag.value)); // кнопка Поиска
resultMoreButton.addEventListener('click', () => cardList.renderMore()); // кнопка Показать еще
quitButton.addEventListener('click', exit); // кнопка разлогина

header.render();