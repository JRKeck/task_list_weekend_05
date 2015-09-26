var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(req, res, next){

    if(req.isAuthenticated()) {
        console.log('User signed in as '+req.user.username);
        console.log(req.user);
        res.json(req.user);
    }
    else{
        console.log("User not signed in");
        res.redirect('/login');
        return
    }
    var file = req.params[0] || 'assets/views/user.html';
    res.sendFile(path.join(__dirname, '../public/', file));
});




module.exports = router;

