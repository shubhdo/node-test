import 'idempotent-babel-polyfill';
import env from 'dotenv';

const envfile =
  process.env.NODE_ENV === 'production' ? '.prod.env' : '.dev.env';
env.config({
  path: `${__dirname}/environments/${envfile}`
});

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import i18n from 'i18n';
import passport from 'passport';
import User from './models/user';
import Session from 'express-session';
import flash from 'connect-flash';
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGO_URL + '/' + process.env.DB_NAME, {
      useNewUrlParser: true
    }
  )
  .catch(err => console.log(err));
const app = express();
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(Session({
  secret: 'secret'
}));
app.use(passport.initialize());
app.use(passport.session());

i18n.configure({
  locales: ['en', 'zh'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en'
});
app.use(i18n.init);
app.use(function (req, res, next) {
  // console.log(JSON.parse(req.body.query));
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  );
  next();
});


passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});

app.options('*', cors());
require('./routes/index')(app);
require('./routes/user')(app);

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
require('./passport-configuration');

// Error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res
    .status(err.status || 500)
    .json({
      status: false,
      error: err,
      code: err.status || 500
    })
    .end();

  next();
});

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});