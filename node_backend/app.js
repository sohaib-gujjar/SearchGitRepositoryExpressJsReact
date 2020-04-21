var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');
var repoRouter = require('./routes/repository');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//all
app.use('/', indexRouter);

//repo
app.use('/repository', repoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// api documentation endpoint
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var options = { // line 27
  swaggerDefinition: {
    info: {
      title: 'swagger-express-jsdoc', // Title (required)
      version: '1.0.0', // Version (required)
    },
  },
  apis: ['./routes/*'], // Path to the API docs
};

const swaggerDocument = swagger(options);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
