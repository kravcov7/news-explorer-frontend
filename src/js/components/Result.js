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
  while (resultContainer.firstChild) {
    resultContainer.removeChild(resultContainer.firstChild);
  };
  resultLoader.classList.remove('hidden');
  resultBlock.classList.add('hidden');
  this.api
    .getNews({keyword})
    .then((res) => {
      if (res.articles.length === 0) {
        resultNotFound.classList.remove("hidden");
        resultBlock.classList.add('hidden');

      } else {
        resultNotFound.classList.add("hidden");
        this.cardList.render(res.articles);
        resultBlock.classList.remove('hidden');
      }
    })
    .then(() => {
      // resultBlock.classList.remove('hidden');
      resultLoader.classList.add('hidden');
    })
    .catch((err) => console.log(err));
}
}