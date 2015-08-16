var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');

var Task = mongoose.model('task', {text: String, complete: Boolean});

router.post("/addtask", function(req,res,next){
    var task = new Task({text: req.body.text, complete: false});
    task.save(function(err){
        if(err) console.log('Post Error', err);
        res.send('Post Complete');
    });
});

router.get("/gettasks", function(req,res,next){
    return Task.find({}).exec(function(err, info){
        if(err) throw new Error(err);
        res.send(JSON.stringify(info));
    });
});

router.put("/updatetask/:id", function(req, res, next){
    Task.findByIdAndUpdate(req.params.id, {complete: !req.body.complete}, function(err, post){
        if(err){
            console.log("Error: ", err);
        }
        res.json(post);
    });
});

router.delete("/deletetask/:id", function(req, res, next){
    Task.findByIdAndRemove(req.params.id, function(err, post){
        if(err){
            console.log("Error: ", err);
        }
        res.json(post);
    });
});

module.exports = router;