//saved connection route
var express = require('express');
var router = express.Router();
var utility = require('../util/connectionDB.js');

router.get('/',function(req,res){
  res.render('savedConnections');
});

module.exports = router;
