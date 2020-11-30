import { firstTagSpan, secondTagSpan, tagAmountSpan, articlesText, articlesNum, articlesCaption, tagCaptionSpan, userSpan, tagCopulativeSpan } from '../constants/constants'

export default class ArticlesCard {
  constructor(api) {
    this.api = api;
    this.savedArticlesArr = [];
  }

  render(savedArticlesArr) {
    this.savedArticlesArr = savedArticlesArr;
    this._setUserName();
    this._fillArticlesAmount();
    this._setTags();
  }

  _setUserName() {
    this.api.getUser()
      .then((res) => {
        userSpan.textContent = res.name;
      })
      .catch(err => console.log(err));
  }

  _fillArticlesAmount() {
    const articlesAmount = this.savedArticlesArr.length;
    articlesNum.textContent = articlesAmount;

    let saved = 'сохраненных статей';
    if (articlesAmount === 1) {
      saved = 'сохраненная статья';
    } else if (articlesAmount >= 2 && articlesAmount <= 4) {
      saved = 'сохраненные статьи';
    }
    articlesCaption.textContent = `${saved}`;
  }

  _setTags() {
    const keywordsArr = [];

    this.savedArticlesArr.forEach(article => {
      keywordsArr.push(article.keyword);
    });
    
    const template = `По ключевым словам: ${keywordsArr}`;

    articlesText.insertAdjacentHTML('beforeend', template);

  }



}