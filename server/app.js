var express = require('express');
var app = express();

var bodyParser = require('body-parser');

//routes
var api = require('./routes/api');
var login = require('./routes/login');
var register = require('./routes/register');
var profile = require('./routes/user');
var index = require('./routes/index');

//authentication
var passport = require('passport');
var session = require('express-session');
var localStrategy = require('passport-local').Strategy;
var User = require('./models/user');


var mongoose = require("mongoose");

//mongoose.connect('mongodb://localhost/todo_task_app');

// Mongo setup
//var mongoURI = "mongodb://localhost/todo_task_app";
var mongoURI = "mongodb://JRKeck:koda8587@ds051853.mongolab.com:51853/task-list";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error', err);
});

MongoDB.once('open', function () {
    console.log('mongodb connection open');
});

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new localStrategy({ passReqToCallback : true, usernameField: 'username' },
    function(req, username, password, done) {
    }
));

app.use('/login', login);
app.use('/signup', register);
app.use('/user', profile);
app.use('/api', api);
app.use('/', index);

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});

passport.use('local', new localStrategy({
        passReqToCallback : true,
        usernameField: 'username'
    },
    function(req, username, password, done){
        User.findOne({ username: username }, function(err, user) {
            if (err) throw err;
            if (!user)
                return done(null, false, {message: 'Incorrect username and password.'});

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch)
                    return done(null, user);
                else
                    done(null, false, { message: 'Incorrect username and password.' });
            });
        });
    }));

module.exports = app;