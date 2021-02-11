require('dotenv').config();

const express = require('express');
const path = require('path');
const api = require('./api');
const { json } = require('body-parser');
const socket = require('./socket');
const PlayList = require('./models/Playlist');

const { PORT = 4000, PLAYLIST_ID } = process.env;

const app = express();
const server = app.listen(PORT, () => console.log(`server started at ${PORT}`));
socket.listen(server);

app.use(json());
app.use('/api', api);

const start = async () => {
  await PlayList.getInstance().setId(PLAYLIST_ID).getItems();
  app.use(express.static(path.resolve(__dirname, '../build')));
};

start();
