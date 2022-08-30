const axios = require('axios');

/**
 * Create Axios connection
 * @type {AxiosInstance}
 */
const catApi = axios.create({
  baseURL: 'https://cataas.com',
  timeout: 5000,
});

/**
 * Generate cat API according to the params
 * @param saying ex: text to add into the image
 * @param params ex: image details
 * @returns {Promise<null|any>}
 */
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
