const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');
const session = require('express-session');
const passport = require('passport');
const db = require('./db');
const User = require('./db/models/user');

const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({db});

const socketio = require('socket.io');
module.exports = app;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', require('./api'));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({extended: true}));

  app.use(compression());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const port = process.env.PORT || 3000; // this can be very useful if you deploy to Heroku!

const startListening = () => {
  const server = app.listen(port, () =>
    console.log(`Mixing it up on port ${port}`)
  );
  const io = socketio(server);
  require('./socket')(io);
};

const syncDb = () => db.sync({force: true});

async function bootApp() {
  await sessionStore.sync();
  await syncDb();
  await createApp();
  await startListening();
}

if (require.main === module) {
  bootApp();
} else {
  createApp();
}
