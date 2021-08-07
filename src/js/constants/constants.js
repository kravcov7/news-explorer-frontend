export const auth = document.querySelector("#authorization-button");  //авторизоваться
export const signUp = document.querySelector("#signin-button");  // Зарегистрироваться - переход нп попап регистрации
export const signInSubmitBtn = document.querySelector("#signin-submit-button"); //Войти кнопка
export const signUpSubmitBtn = document.querySelector("#signup-submit-button"); // Зарегистрироваться
export const enterButton = document.querySelector("#enter-button"); //Войти - переход на попап успеха
export const successMessageIn = document.querySelector("#success-message-in"); //Войти - переход на попап успеха


export const popupAuthorization = document.querySelector("#authorization"); //вход попап
export const popupRegistr = document.querySelector("#signup-popup");  // попап регитсрации
export const succesPopup = document.querySelector("#succes-popup");

export const formLogin = document.querySelector("#form-login");
export const formSignup = document.querySelector("#form-signup");
export const searchFormInput = document.querySelector("#search-form");
export const searchFormButton = document.querySelector(".search__button");
export const resultNotFound = document.querySelector('#not-found');
export const resultLoader = document.querySelector('#preloader');
export const resultContainer = document.querySelector('.result__articles');
export const resultBlock = document.querySelector('.result_container');
export const resultMoreButton = document.querySelector('.result__button');
export const resultTitle = document.querySelector('.result__title');
export const inputTag = document.querySelector('#inputtag');
export const searchWord = document.querySelector('.search__input');

// Header
export const savedArticle = document.querySelector('.header-menu__article');
export const noUser = document.querySelector('.menu__li_nouser');
export const quitButton = document.querySelector('#quit-button');

export const userName = document.querySelector('.menu__button_auth_user');

export const userSpan = document.querySelector('#user-greeting');
export const articlesNum = document.querySelector('#articles-num');
export const articlesCaption = document.querySelector('#articles-caption');
export const articlesText = document.querySelector('.user-info__text');

export const cardTemplate = document.querySelector('#card-template').content.querySelector('.article');

export const inputDataAuthorization = { email: "", password: "" };
export const inputDataSignUp = { email: "", password: "", name: "" };
export const inputDataSearch = { keyword: "" };

// const defaultMainApi = 'http://localhost:3000';
// export { defaultMainApi }