export default class MainApi {
  constructor() {}

  signUp = ({ email, password, name }) => {
    return fetch(`http://178.154.231.202/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => this._returnJson(res))
      .catch((err) => {
        throw err;
      });
  };

  signIn = ({email, password }) => {
    return fetch(`http://178.154.231.202/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({email, password }),
    })
      .then((res) => this._returnJson(res))
      .catch((err) => {
        throw err;
      });
  };

  getUser() {
    return fetch(`http://localhost:3000/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => this._returnJson(res))
      .catch((err) => {
        throw err;
      });
  }

  _returnJson(res) {
    if (!res.ok) {
      return Promise.resolve(res.json());
    }
    return res.json();
  }
}
