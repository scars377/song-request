const Router = require('express').Router;
const PlayList = require('../models/Playlist');

const router = new Router();

const list = PlayList.getInstance();

router
  .route('/')
  .get(async (req, res) => {
    res.json(list);
  })
  .put(async (req, res) => {
    const { id } = req.body;
    list.setId(id).getItems();
    res.json({ success: true });
  });

module.exports = router;
