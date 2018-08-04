// server.js

//Setup

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./app/models/user');

// configuring the app to use the bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongoDB://localhost:27017/UsersDB');

var port = process.env.PORT || 8080; //Setting the port


// Routes for the API

var router = express.Router();

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});


// routes that end in /users
router.route('/users')
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

router.route('/users/:user_id')

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
        })
    });
// Test to make sure everything is working

// Accessing at GET http://localhost:8080/api
router.get('/', function(req, res) {
    res.json({ message: 'We did it. API is go.' });
});


// Register our routes
app.use('/api', router);


// Start the server
app.listen(port);
console.log('Working on port ' + port);