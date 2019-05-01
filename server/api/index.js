const router = require('express').Router();

router.use('/users', require('./users.js'));
router.use('/rooms', require('./rooms.js'));
router.use('/playlists', require('./playlists.js'));

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
