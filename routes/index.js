var express = require('express');
var router = express.Router();
var _ = require("underscore")
/* GET home page. */
var user={
    name:"test"
}

router.get('/', function(req, res) {
  res.render('index',
      {
        title: 'Express',
        user:JSON.stringify(user),
        room:req.query.room
      }
  );
});

module.exports = router;
