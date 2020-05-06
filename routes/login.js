//login route
var express = require('express');
var router = express.Router();
//var utility = require('../util/connectionDB.js');
var userDB = require('../models/db/usersDB');
var user = require('../models/User');

var sessionInput = undefined;

async function sessionCheck(req, res, next) {
  sessionInput = undefined;
  var userSession = req.session.userSession;
  if(userSession!=undefined){
    console.log('user session defined');
    const userDBObj = new userDB();
    let u = await userDBObj.getUser(userSession.userID);

    sessionInput = new user(u[0].userID,u[0].firstName,u[0].lastName,u[0].emailAddress,u[0].address1Field,u[0].address2Field, u[0].city, u[0].state, u[0].postCode, u[0].country);
  }
  next();
}

router.get('/',sessionCheck,function(req,res){
  if(sessionInput == undefined){
      res.render('login',{session: undefined});
  }else{
    res.render('index',{session: sessionInput});
    console.log('user already logged in');
  }

});


module.exports = router;
