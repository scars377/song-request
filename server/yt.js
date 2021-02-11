const axios = require('axios');

const { YT_KEY } = process.env;

const client = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3/',
  params: { key: YT_KEY },
});

module.exports = client;
