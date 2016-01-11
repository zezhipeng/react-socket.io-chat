var express = require('express');
var router = express.Router();

/* GET home page. */
var user={
  name:"zezhi",
  password:"2222"
}
var room ="12"

router.get('/', function(req, res) {
  res.render('index', { title: 'Express',user:JSON.stringify(user),room:room });
});

module.exports = router;
