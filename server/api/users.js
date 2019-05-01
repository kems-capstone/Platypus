const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('This is the api for users');
});

module.exports = router;
