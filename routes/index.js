var express = require('express');
var router = express.Router();
var _ = require("underscore")
/* GET home page. */


router.get('/', function(req, res) {
  req.session.user = {
      name:req.query.name
  };
  req.session.room = req.query.room;
  res.render('index',
      {
        title: 'Express',

      }
  );
});

module.exports = router;
