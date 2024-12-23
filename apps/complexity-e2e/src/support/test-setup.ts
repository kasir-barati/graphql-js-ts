/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  // Configure axios for tests to use.
  const { HOST, PORT } = process.env;

  if (!HOST || !PORT) {
    console.dir(process.env, { depth: null });
    throw 'UndefinedHostOrPort';
  }

  axios.defaults.baseURL = `http://${HOST}:${PORT}`;
};
