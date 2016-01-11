var express = require('express');
var router = express.Router();

/* GET users listing. */
var users=[]

router.get('/', function(req, res) {
  res.send('respond with a resource');
});
router.post("/",function(req,res){
  req.body.id=Date.now();
  users.push(req.body);
  res.json(users)
})

module.exports = router;
