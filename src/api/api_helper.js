import apiUrl from '../utils/Connection';

export const apiConfig = {
  host: apiUrl.baseUrl,
};

export const apiEndPoint = {
  account: 'Account',
};

class Api {
  static headers() {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json', // request
      dataType: 'application/json', // response
    };
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static async xhr(route, params, verb) {
    const url = apiConfig.host + route;
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null,
    );
    options.headers = Api.headers();
    // return Promise
    return fetch(url, options).then((resp) => {
      if (resp.status == 401) {
        // refresh token
      }
      const json = resp.json();
      if (resp.ok) {
        return json;
      }
      return json.then((err) => {
        throw err;
      });
    });
  }
}
export default Api;
