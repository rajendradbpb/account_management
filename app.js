var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./server/db.js');
var passport = require('passport');
var jwt     = require('jsonwebtoken');
var passwordHash = require('password-hash-and-salt');
// initilising routes
var routes = require('./server/routes/index');
// swagger integration
//const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./temp/swagger-sample.json');
//const swaggerDocument = require('./swagger.json');


// custom files starts
var userModel = require('./server/models/userModel');
var response = require("./server/component/response")
var config = require("config")


var app = express();

// swagger
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS

    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,If-Modified-Since,Authorization');

    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// passport init
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
/*
  * this is used to check the user in the database existence
  used in case of the signIn and signUp user
*/
passport.use('login', new LocalStrategy(
  function(username, password, done) {
    userModel.findOne({ username: username }).populate('role').exec(function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      console.log("got user/pass",username,password);
      console.log("got user/pass >>>>>>>",user.username,user.password);
      passwordHash(password).verifyAgainst(user.password,function(error, verified) {
        console.log("after verification ",error,user);
        if (error) { return done(err); }
        else if (!verified) { return done(null, false); }
        else return done(null, user);
      })
    });
  }
)
);


passport.use('token',new BearerStrategy(
  function(token, done) {
    jwt.verify(token,config.token.secret, function(err, decoded) {
      if (err) {
        //console.log("error in verify token  ",err);
        return done(err,null);
      }
      else if(!decoded) {
        // console.log("No  token  ",err);
        return done(null, false);
      }
      else {
        // console.log("yes  token  ",decoded);
        return done(null, decoded);
      }
     });

  }
));
passport.use('isAdmin',new BearerStrategy(
  function(token, done) {
    jwt.verify(token,config.token.secret, function(err, user) {
      if (err) {
        console.log("error in verify token  ",err);
        return done(err,null);
      }
      else if(!user || !user._doc.isAdmin) {
        console.log("No  token or user is not admin ",err);
        return done(null, false);
      }
      else {
        return done(null, user);
      }
     });

  }
));
passport.use('addCustomer',new BearerStrategy(
  function(token, done) {
    jwt.verify(token,config.token.secret, function(err, user) {
      if (err) {
        console.log("error in verify token  ",err);
        return done(err,null);
      }
      else if(!user || user._doc.role.type == "ghUser") {
        console.log("No  token or user is not admin ",err);
        return done(null, false);
      }
      else {
        return done(null, user);
      }
     });

  }
));
passport.use('ghAuth',new BearerStrategy(
  function(token, done) {
    jwt.verify(token,config.token.secret, function(err, user) {
      if (err) {
        console.log("error in verify token  ",err);
        return done(err,null);
      }
      else if(!user || user._doc.role.type == "ccare") {
        console.log("No  token or user is not admin ",err);
        return done(null, false);
      }
      else {
        return done(null, user);
      }
     });

  }
));


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
