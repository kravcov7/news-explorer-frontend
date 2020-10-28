export default class NewsCardList {
  constructor(resultContainer, cardTemplate, createCard, resultMoreButton) {
    this.resultContainer = resultContainer;
    this.cardTemplate = cardTemplate;
    this.createCard = createCard;
    this.articlesArr = [];
    this.resultMoreButton = resultMoreButton;
    console.log(this.createCard)
  };

  addCard(data) {
    console.log(this.createCard)
    this.resultContainer.append(this.createCard(data, this.cardTemplate).create());
  }

  render(articles) {
    this.articlesArr = articles;
    const initArr = articles.slice(0, 3);
    console.log(initArr)
    initArr.forEach(data => {
      this.addCard(data)
    });
  }

  renderMore() {
    let newArr = this.articlesArr.splice(4, 3); //возвращает массив из удалённых элементов
    newArr.forEach(data => {
      this.addCard(data)
    });
    if (this.articlesArr.length <= 4) {
      this.resultMoreButton.classList.add('hidden');
    }
  }
  // constructor() {

  // }

  // renderResults() {

  // }

  // renderLoader() {

  // }

  // renderError() {

  // }

  // showMore() {

  // }

  // addCard() {

  // }
}