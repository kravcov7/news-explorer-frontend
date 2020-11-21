export default class NewsCardList {
  constructor(resultContainer, cardTemplate, createCard, api) {
    this.resultContainer = resultContainer;
    this.cardTemplate = cardTemplate;
    this.api = api;
    this.createCard = createCard;
    this.articlesArr = [];
    // this.resultMoreButton = document.querySelector('.result__button');
  };

  addCard = (data) => {
    this.resultContainer.append(this.createCard(data, this.cardTemplate, this.api).create());
  }

  addArticle = (data) => {
    this.resultContainer.append(this.createCard(data, this.cardTemplate, this.api).createArticle());
  }

  render(articles) {
    this.articlesArr = articles;
    const initArr = articles.slice(0, 3);
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

  renderSavedArticles(savedArticlesArr) {
    savedArticlesArr.forEach(data => {
      this.addArticle(data, this.resultContainer)
    });
  }

}