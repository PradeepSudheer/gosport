//connection route
var express = require('express');
var router = express.Router();
var utility = require('../models/utility.js');
var connectionDB = require('../models/db/connectionsDB');
var userDB = require('../models/db/usersDB');
var user = require('../models/User');

var sessionInput = undefined;

async function sessionCheck(req, res, next) {
  sessionInput = undefined;
  var userSession = req.session.userSession;
  if(userSession!=undefined){
    const userDBObj = new userDB();
    let u = await userDBObj.getUser(userSession.userID);
    sessionInput = new user(u[0].userID,u[0].firstName,u[0].lastName,u[0].emailAddress,u[0].address1Field,u[0].address2Field, u[0].city, u[0].state, u[0].postCode, u[0].country);
  }
  next();
}

router.all('/',sessionCheck, async function(req,res){
  if(Object.keys(req.query).length!=0 && /^\d+$/.test(req.query.ID)){
    let action = req.query.action;
    var connectionDBObj = new connectionDB();
    var connectionDetails = await connectionDBObj.getConnection(req.query.ID);
    console.log('connectionDetails');
    console.log(connectionDetails);
    if(connectionDetails.getConnectionID == undefined){
      res.redirect('connections');
    }else{
      res.render('connection',{qs:connectionDetails,
                                session: sessionInput,
                                action:action ? action : 'save'});
    }
  }else{
    res.redirect('connections');
  }
});


module.exports = router;
