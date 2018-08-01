var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({})
    .then(users => {
      res.send(users);
    })
});

router.post("/", function(req,res){
  user = new User({
    "name" : req.body.name,
    "email": req.body.email
  });
  user.save()
  .then((user) => {
    res.json(user).status(200);
  })
  .catch((error)=>{
    console.log(error);
    res.send(error).status(500);
  })
})

module.exports = router;
