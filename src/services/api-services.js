const axios = require("axios");

const baseURL = " https://jsonplaceholder.typicode.com";    // setting baseURL here instead of .env file

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
