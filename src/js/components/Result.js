import { resultSection, resultBlock, resultNotFound, resultLoader, resultTitle, resultError, resultContainer, resultMoreButton } from '../constants/constants';
export default class Result {
  constructor(api, cardList) {
    this.api = api;
    this.cardList = cardList;
  };

  // поиск
formSearchEvent(keyword) {
  event.preventDefault();
  // const inputData = formSearch.getInfo();
  resultLoader.classList.remove('hidden');
  this.api
    .getNews({keyword})
    .then((res) => {
      console.log(keyword)
      if (res.articles.length === 0) {
        resultNotFound.classList.remove("hidden");
      } else {
        this.cardList.render(res.articles);
        resultBlock.classList.remove('hidden');
      }
    })
    .then(() => {
      resultBlock.classList.remove('hidden');
      resultLoader.classList.add('hidden');
    })
    .catch((err) => console.log(err));
}
}