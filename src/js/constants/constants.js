export const auth = document.querySelector("#authorization-button");
export const popupAuthorization = document.querySelector("#authorization");
export const signUp = document.querySelector("#signin-button");
export const enterButton = document.querySelector("#enter-button");
export const popupRegistr = document.querySelector("#signup-popup");
export const succesPopup = document.querySelector("#succes-popup");
export const formLogin = document.querySelector("#form-login");
export const formSignup = document.querySelector("#form-signup");
export const signInSubmitBtn = document.querySelector("#signin-submit-button");
export const signUpSubmitBtn = document.querySelector("#signup-submit-button");
export const searchFormInput = document.querySelector("#search-form");
export const searchFormButton = document.querySelector(".search__button");
export const resultNotFound = document.querySelector('#not-found');
export const resultLoader = document.querySelector('#preloader');
export const resultContainer = document.querySelector('.result__articles');
export const resultBlock = document.querySelector('.result_container');
export const resultMoreButton = document.querySelector('.result__button');
export const resultTitle = document.querySelector('.result__title');
export const inputTag = document.querySelector('#inputtag');


// Header
export const savedArticle = document.querySelector('.header-menu__article');
export const noUser = document.querySelector('.menu__li_nouser');
export const quitButton = document.querySelector('#quit-button');

export const userName = document.querySelector('.menu__button_auth_user');

export const cardTemplate = document.querySelector('#card-template').content.querySelector('.article');

export const inputDataAuthorization = { email: "", password: "" };
export const inputDataSignUp = { email: "", password: "", name: "" };
export const inputDataSearch = { keyword: "" };

const defaultMainApi = 'http://localhost:3000';

export {
  defaultMainApi
}
