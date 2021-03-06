const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require("./config/config")
const session = require("express-session");
const fileUpload = require("express-fileupload")

const { checkAdminExist } = require("./middlewares/checkAdminExist")

const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const hospitalRouter = require('./routes/hospital');
const clinicRouter = require('./routes/clinic');
const labRouter = require('./routes/lab');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(fileUpload())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 } //max age 1 hour
}))

async function connect() {
  try {
    await connectDB();
    console.log("Connected Database")
  } catch (error) {
    console.log(error)
  }
}
connect()



app.use('/', usersRouter);
app.use('/hospital', hospitalRouter);
app.use('/lab', labRouter);
app.use('/clinic', clinicRouter);
app.use('/admin', checkAdminExist, adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
