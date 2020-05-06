//wrong url route
var express = require('express');
var router = express.Router();
var utility = require('../util/connectionDB.js');


router.all('/',function(req,res){
  res.send('Please check the credentials!!');
});


module.exports = router;
