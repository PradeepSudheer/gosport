//new connectiom route
var express = require('express');
var router = express.Router();
var utility = require('../util/connectionDB.js');


router.get('/',function(req,res){
  if(req.session.userSession){
    res.render('newConnection',{session: req.session.userSession, errorMsg:new Array()})
  }else{
    res.render('login', {session: undefined});
  }

})


module.exports = router;
