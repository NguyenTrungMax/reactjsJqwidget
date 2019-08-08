import axios from "axios";
// import store from "../store/index";

/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = () => {
  const options = {
    baseURL: "http://localhost/service/rest",
    headers: {
      Authorization: "NSDTL02,190726100046,DD,,hnlis2019@6868"
    }
  };

  const client = axios.create(options);

  // Add a request interceptor
  client.interceptors.request.use(
    requestConfig => requestConfig,
    requestError => {
      // Raven.captureException(requestError);
      console.log(requestError);
      return Promise.reject(requestError);
    }
  );

  // Add a response interceptor
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status >= 500) {
        console.log(error);
      }

      return Promise.reject(error);
    }
  );

  return client;
};

class ApiClient {
  constructor() {
    this.client = getClient();
  }

  get(url, conf = {}) {
    console.log("request");
    return this.client
      .get(url, conf)
      .then(response => {
        if (response.data.code == "1") {
          let data = JSON.parse(response.data.message);
          return Promise.resolve(data);
        } else {

        }
      })
      .catch(error => Promise.reject(error));
  }


  delete(url, conf = {}) {
    return this.client
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  head(url, conf = {}) {
    return this.client
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  options(url, conf = {}) {
    return this.client
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  post(url, data = {}, conf = {}) {
    return this.client
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  put(url, data = {}, conf = {}) {
    return this.client
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }

  patch(url, data = {}, conf = {}) {
    return this.client
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
}

export { ApiClient };

/**
 * Base HTTP Client
 */
export default {
  // Provide request methods with the default base_url
  get(url, conf = {}) {
    console.log("get default");
    return getClient()
      .get(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  delete(url, conf = {}) {
    return getClient()
      .delete(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  head(url, conf = {}) {
    return getClient()
      .head(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  options(url, conf = {}) {
    return getClient()
      .options(url, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  post(url, data = {}, conf = {}) {
    return getClient()
      .post(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  put(url, data = {}, conf = {}) {
    return getClient()
      .put(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  },

  patch(url, data = {}, conf = {}) {
    return getClient()
      .patch(url, data, conf)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error));
  }
};
