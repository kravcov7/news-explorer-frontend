import { firstTagSpan, secondTagSpan, tagAmountSpan, articlesAmountSpan, articlesAmountCaptionSpan, tagCaptionSpan, userSpan, tagCopulativeSpan } from '../constants/constants'

export default class ArticlesCard {
  constructor(api) {
    this.api = api;
    this.savedArticlesArr = [];
  }

  render(savedArticlesArr) {
    this.savedArticlesArr = savedArticlesArr;
    this._setUserName();

  }

  _setUserName() {
    this.api.getUser()
      .then((res) => {
        userSpan.textContent = res.name;
      })
      .catch(err => console.log(err));
  }


  
}