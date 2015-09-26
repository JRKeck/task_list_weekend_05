var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Users = require('../models/user');

router.get('/', function(req, res, next){
    var file = req.params[0] || 'assets/views/signup.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});

router.post('/', function(req,res,next) {
    Users.create(req.body, function (err, post) {

        if (err)
            next(err);
        else
            res.redirect('/user');
    })
});

module.exports = router;
