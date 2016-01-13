var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res) {
  var room = req.query.room
  var user = req.query.user
  user= JSON.parse(user)
  console.log(typeof user)
  res.render('index',
      {
        title: 'Express',
        user:user,
        room:room
      }
  );
});

module.exports = router;
