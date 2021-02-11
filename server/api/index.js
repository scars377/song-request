const Router = require('express').Router;
const playlist = require('./playlist');
const songRequest = require('./songRequest');

const router = new Router();

router.use('/playlist', playlist);
router.use('/requests', songRequest);

module.exports = router;
