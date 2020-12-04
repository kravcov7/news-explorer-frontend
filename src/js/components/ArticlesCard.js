
import { articlesText, articlesNum, articlesCaption, userSpan } from '../constants/constants';

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
    this.api
      .getUser()
      .then((res) => {
        userSpan.textContent = res.name;
      })
      .catch((err) => console.log(err));
  }

  _fillArticlesAmount() {
    const articlesAmount = this.savedArticlesArr.length;
    if (articlesAmount <= 0) {
      document.querySelector('.user-info__text').classList.add('hidden');
    }articlesNum.textContent = articlesAmount;

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

    this.savedArticlesArr.forEach((article) => {
      keywordsArr.push(article.keyword);
    });

    // создадим объект, содержащий ключевое слово и количество повторений
    const keywordsObj = keywordsArr.reduce(function (prevVal, item) {
      if (!prevVal[item]) {
        prevVal[item] = 1;
      } else {
        prevVal[item] += 1;
      }
      return prevVal;
    }, {});

    const valuesArr = Object.values(keywordsObj);
    // посчитаем количество тегов
    const allTagAmount = valuesArr.length;
    // отсортируем массив с количеством повторений по убыванию
    const sortedValuesArr = valuesArr.sort();
    sortedValuesArr.sort(function (a, b) {
      return b - a;
    });

    const firstValue = sortedValuesArr[0];
    const secondtValue = sortedValuesArr[1];
    const thirdValue = sortedValuesArr[2];

    function getKeyByValue(object, value) {// функ для поиска ключей в объекте по их значениям
      return Object.keys(object).find((key) => object[key] === value);
    }
    const firstTag = getKeyByValue(keywordsObj, firstValue);
    // удалим из объекта первый тег для избежания повторения при равных значениях, нотация для ключа-переменной скобочная
    delete keywordsObj[firstTag];
    const secondTag = getKeyByValue(keywordsObj, secondtValue);
    // удалим второй тег
    delete keywordsObj[secondTag];
    const thirdTag = getKeyByValue(keywordsObj, thirdValue);
    const anoverTagAmount = allTagAmount - 2;

    const firstArticle = `<span class="user-info__tag">${firstTag}</span>`;
    let secondArticle = '';
    let thirdArticle = '';

    if (secondtValue && thirdValue > 0) {
      secondArticle = `, <span class="user-info__tag">${secondTag}</span>`;
    } else if (secondTag) {
      secondArticle = ` и <span class="user-info__tag">${secondTag}</span>`;
    }

    if (anoverTagAmount > 1) {
      thirdArticle = ` и <span class="user-info__tag">${anoverTagAmount} другим</span>`;
    } else if (anoverTagAmount === 1) {
      thirdArticle = ` и <span class="user-info__tag">${thirdTag}</span>`;
    }

    const template = `По ключевым словам: ${firstArticle}${secondArticle}${thirdArticle}`;

    articlesText.insertAdjacentHTML('beforeend', template);
  }
}
