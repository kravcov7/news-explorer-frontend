import './../styles/articles.css';

import { defaultMainApi, resultContainer, cardTemplate, headerIcon } from "../js/constants/constants";
import MainApi from "../js/api/MainApi";
import Header from "../js/components/Header";
import NewsCardList from "../js/components/NewsCardList";
import NewsCard from "../js/components/NewsCard";
import ArticlesCard from "../js/components/ArticlesCard";

const mainApi = new MainApi(defaultMainApi);
const header = new Header(mainApi);
const createCard = (...args) => new NewsCard(...args);
const addCard = (...arg) => new NewsCardList(resultContainer, cardTemplate, createCard, mainApi).addCard(...arg);
const cardList = new NewsCardList(resultContainer, cardTemplate, createCard, mainApi);
const articlesCard = new ArticlesCard(mainApi);

mainApi.getArticles()
  .then((res) => {
    // const savedArticlesArr = res.data;

    articlesCard.render(res);
    cardList.renderSavedArticles(res);
  })
  .catch(err => console.log(err));

header.render();