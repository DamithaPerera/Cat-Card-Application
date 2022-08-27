const axios = require('axios');

const catApi = axios.create({
  baseURL: 'https://cataas.com',
  timeout: 5000,
});

const fetchRandomCatWithSaying = async (saying, params) => {
  try {
    const response = await catApi.get(`cat/says/${saying}`, {
      params,
      responseType: 'arraybuffer',
    });
    console.log(
      `Received response for [${response.request.path}] with status:`,
      response.status,
      response.statusText,
    );

    return response.data;
  } catch (error) {
    console.log(
      `Received error response for path [${error.config.url}] with message:`,
      error.message,
    );
    return null;
  }
};

module.exports = {
  fetchRandomCatWithSaying,
};
