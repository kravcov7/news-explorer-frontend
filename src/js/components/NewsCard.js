import { searchWord, imageUrl } from '../constants/constants';
import { editDataFormat } from '../utils/utils'

export default class NewsCard {
  constructor(data, cardTemplate, api) {
    this.api = api;
    this.data = data;
    this.data.url = data.url;
    this.card = null;
    this.cardTemplate = cardTemplate;
    this.articleID = null;
    this._hoverIcon = this._hoverIcon.bind(this);
    this._unHoverIcon = this._unHoverIcon.bind(this);
    this._saveArticle = this._saveArticle.bind(this);
    this._deleteArticle = this._deleteArticle.bind(this);
    this._cancelSaveArticle = this._cancelSaveArticle.bind(this);
  };

  create() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.article__source').setAttribute('href', this.data.url)
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__image').setAttribute('src', this.data.urlToImage);
    // this.card.querySelector('.article__date').textContent = this.data.publishedAt;
    this.card.querySelector('.article__date').textContent = editDataFormat(this.data.publishedAt.slice(0, 10));
    this.card.querySelector('.article__text').textContent = this.data.description;
    this.card.querySelector('.article__source').textContent = this.data.source.name;
    this.card.querySelector('.article__icon').addEventListener('click', this._saveArticle);
    this._setHoverListeners();
    return this.card;
  }

  createArticle() {
    this.card = this.cardTemplate.cloneNode(true);
    this.card.querySelector('.article__item').dataset.id = this.data._id;
    this.card.querySelector('.article__link').setAttribute('href', this.data.link);
    this.card.querySelector('.article__label').textContent = this.data.keyword;
    this.card.querySelector('.article__title').textContent = this.data.title;
    this.card.querySelector('.article__image').setAttribute('src', this.data.image);
    this.card.querySelector('.article__date').textContent = this.data.date;
    this.card.querySelector('.article__text').textContent = this.data.text;
    this.card.querySelector('.article__source').textContent = this.data.source;
    this.card.querySelector('.article__icon').addEventListener('click', this._deleteArticle);
    this._setHoverListeners();
    return this.card;
  }

  _hoverIcon() {
    const iconSave = this.card.querySelector('.article__login');
    // const userId = this.api.getUser();
    this.card.querySelector('#icon-hover').classList.remove('hidden');
    this.card.querySelector('#icon-unhover').classList.add('hidden');

    if (document.URL.includes('articles')) {
      iconSave.classList.remove('hidden');
    } else if (localStorage.getItem('token') === null) {
      iconSave.classList.remove('hidden');
    }
    // console.log(userId)
  }

  _unHoverIcon() {
    this.card.querySelector('#icon-hover').classList.add('hidden');
    this.card.querySelector('#icon-unhover').classList.remove('hidden');
    this.card.querySelector('.article__login').classList.add('hidden');
  }

  _saveArticle() {
    this.api.getUser()
      .then((res) => {
        if (res != undefined) {
          this.card.querySelector('.article__login').classList.add('hidden');
          this.card.querySelector('#icon-hover').classList.add('hidden');
          this.card.querySelector('#icon-unhover').classList.add('hidden');
          this.card.querySelector('#icon-mark').classList.remove('hidden');
          this._removeListeners();
          this.card.querySelector('.article__icon').addEventListener('click', this._cancelSaveArticle);
          const articleData = {
            keyword: searchWord.value,
            title: this.data.title,
            text: this.data.description,
            date: editDataFormat(this.data.publishedAt.slice(0, 10)),
            source: this.data.source.name,
            link: this.data.url,
            image: this.data.urlToImage
          };
          this.api.postArticle(articleData)
            .then((res) => {
              this.articleID = res.data._id;
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  }

  _cancelSaveArticle() {
    this.card.querySelector('#icon-unhover').classList.remove('hidden');
    this.card.querySelector('#icon-mark').classList.add('hidden');
    this.api.deleteCard(this.articleID)
      .then(() => {
        const articleIcon = this.card.querySelector('.article__icon');
        articleIcon.addEventListener('click', this._saveArticle);
        articleIcon.addEventListener('mouseover', this._hoverIcon);
        articleIcon.addEventListener('mouseout', this._unHoverIcon);
      })
      .catch(err => alert(err));
  }

  _deleteArticle() {
    this._removeListeners();
    const articleID = this.card.querySelector('.article__item').dataset.id;
    this.card.closest('.article').remove();
    this.api.deleteCard(articleID)
      .then(() => { window.location.reload(); })
      .catch(err => alert(err));
  }

  _setHoverListeners() {
    const articleIcon = this.card.querySelector('.article__icon');
    articleIcon.addEventListener('mouseover', this._hoverIcon);
    articleIcon.addEventListener('mouseout', this._unHoverIcon);
  }

  _removeListeners() {
    const articleIcon = this.card.querySelector('.article__icon');

    articleIcon.removeEventListener('mouseover', this._hoverIcon);
    articleIcon.removeEventListener('mouseout', this._unHoverIcon);
    articleIcon.removeEventListener('click', this._saveArticle);
    articleIcon.removeEventListener('click', this._deleteArticle);
  }
}