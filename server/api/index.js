const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/rooms', require('./rooms'));
router.use('/playlists', require('./playlists'));
router.use('/music', require('./music'));

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
