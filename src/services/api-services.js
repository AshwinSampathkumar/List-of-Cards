const axios = require("axios");

const baseURL = " https://jsonplaceholder.typicode.com";

module.exports = {
  fetchAPI: (API) => {
    return new Promise((resolve, reject) => {
      axios
        .get(baseURL + API)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  },
};
