// modules =================================================
var express     = require('express');
 session        = require('express-session'),
 app            = express(),
 bodyParser     = require('body-parser'),
 methodOverride = require('method-override'),
 path           = require('path'),
 favicon        = require('serve-favicon'),
 logger         = require('morgan'),
 cookieParser   = require('cookie-parser'),
 mongoose       = require( 'mongoose' );
 

// config files
var db = require('./config/db');


//Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());


//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
// app.use(favicon(__dirname + '/public/assets/img/favicon.ico'));



// parse application/json 
app.use(bodyParser.json()); 

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// app.use(csrf());

// // routes ==================================================
// var index = require('./routes/index')(passport);
// var user = require('./routes/user');

// app.use('/', index);
// app.use('/', user);




/// catch 404 and forward to error handler
//Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

//development error handler
//will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

//production error handler
//no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
      message: err.message,
      error: {}
  });
});


var server = app.listen(parseInt(process.env.OPENSHIFT_NODEJS_PORT) || 8080,process.env.OPENSHIFT_NODEJS_IP, function() {
console.log('Express server listening on port ' + server.address().port);
});
   
