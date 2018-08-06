var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

// routes that end in /users
router.route('/')
    .post(function(req, res) {
          var user = new User();
          user.name = req.body.name;
          
          user.save()
          .then(function(user) {
              res.json({message: 'User created.'});
          })
          .catch(function(error){
              res.send(error);
          });
    })
    
    .get(function(req, res){
        User.find(function(err, users) {
            if (err)
                res.send(err);
            
            res.json(users);
        });
    });

router.route('/:user_id')

    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    
    .put(function(req,res){
         User.findById(req.params.user_id, function(err, user){
             if (err)
                 res.send(err);
             
             user.name = req.body.name;
             
             user.save()
                .then(function(user){
                 res.json({message: 'User updated!'});
             })
             .catch(function(error){
                 res.send(error);
             });
        });
    })
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);
            
            res.json({message: 'Successfully deleted user.'});
        });
    });

module.exports = router;
