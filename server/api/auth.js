const router = require('express').Router();
const User = require('../db/models/user');

// can test only when database is seeded

router.put('/login', async (req, res, next) => {
  try {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const foundUser = await User.findOne({
      where: {
        email: userEmail,
        password: userPassword
      }
    });
    if (foundUser) {
      req.session.userId = foundUser.id;
      res.json(foundUser);
    } else {
      res.status(401).send();
    }
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    if (req.session.userId) {
      const thisUser = await User.findOne({
        where: {
          id: req.session.userId
        }
      });
      if (thisUser) {
        res.json(thisUser);
      } else {
        res.status(404).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', async (req, res, next) => {
  try {
    // destroy the session (not just set id to null but destroy complete data)
    await req.session.destroy();
    // send a notification that the user has been deleted
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
