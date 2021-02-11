const Router = require('express').Router;
const SongRequest = require('../models/SongRequest');

const request = SongRequest.getInstance();
const router = new Router();

router
  .route('/')
  .get((req, res) => {
    res.json(request.items);
  })
  .post((req, res) => {
    const { id } = req.body;
    try {
      request.addItem(id);
      res.json({ success: true });
    } catch (err) {
      res.json({ success: false, msg: err.message });
    }
  });

router.route('/:id').delete((req, res) => {
  const { id } = req.params;
  try {
    request.removeItem(id);
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, msg: err.message });
  }
});

module.exports = router;
