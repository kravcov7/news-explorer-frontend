export default class MainApi {
  constructor() {}

  signUp = ({ email, password, name }) => {
    return fetch(`http://localhost:3000/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.json().then(Promise.reject.bind(Promise));
    });
    // .then((res) => this._returnJson(res))
    // .catch((err) => {
    //   throw err;
    // });
  };

  signIn = ({ email, password }) => {
    return fetch(`http://localhost:3000/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email, password }),
    });
    // .then((res) => this._returnJson(res))
    // .catch((err) => {
    //   throw err;
    // });
  };
  getUser() {
    return fetch(`http://localhost:3000/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        return undefined;
      });
  }

  unlogin = () => {
    return fetch(`http://localhost:3000/exit`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email: '', password: '' }),
    });
    // console.log('res')
    // .then((res) => this._returnJson(res))
    // .catch((err) => {
    //   throw err;
    // });
  };

  getArticles = () => {
    return fetch(`http://localhost:3000/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        const json = res.json();
        return json.then(Promise.reject.bind(Promise));
      })
      .catch((err) => {
        throw err;
      });
  };

  createArticle = (saveData) => {
    return fetch(`http://localhost:3000/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        keyword: saveData.keyword,
        title: saveData.title,
        text: saveData.text,
        date: saveData.date,
        source: saveData.source,
        link: saveData.link,
        image: saveData.image,
      }),
    }).then((res) => this._returnJson(res));
  };

  deleteCard = (id) => {
    return fetch(`http://localhost:3000/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        id: id,
      }),
    }).then((res) => this._returnJson(res));
  };

  _returnJson(res) {
    if (!res.ok) {
      return Promise.resolve(res.json());
    }
    return res.json();
  }
}
