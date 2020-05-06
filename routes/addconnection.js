//new connectionsaved route
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var utility = require('../util/connectionDB.js');
var userDB = require('../models/db/usersDB');
var user = require('../models/User');
var connectionDB = require('../models/db/connectionsDB');
var userProfileDB = require('../models/db/profileuserDB');
var connection = require('../models/connection');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const {check, validationResult} = require('express-validator');

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

router.post('/',urlencodedParser, [
  check('topic','Connection Category should have minimum 2 characters').not().isEmpty().trim().isLength({min:2}),
  check('name','Connection name should have minimum length 5 characters').not().isEmpty().trim().isLength({min:5}),
  check('host','Connection hosted by is mandatory').not().isEmpty().trim(),
  check('details','Connection details should have minimum 10 characters').not().isEmpty().trim().isLength({min:10}),
  check('location','Connection location by is mandatory').not().isEmpty().trim(),
  check('date','Connection date and time is mandatory').not().isEmpty().trim()
], sessionCheck, async function(req,res){
  const errors = validationResult(req);
  console.log(req.body);
  console.log(errors);
  if(!errors.isEmpty()){
    return res.render('newConnection',{session: sessionInput, errorMsg:errors.array()});
  }
  try{
    const connectionDBObj = new connectionDB();
    const userProfileDBObj = new userProfileDB();
    const connectionId = await connectionDBObj.getNewSequenceNumber();
    console.log(connectionId);
    console.log('connectionID');
    const req_body = req.body;

    const con = new connection(connectionId, req_body.topic,
                                req_body.name,
                                req_body.details,
                                req_body.host,
                                req_body.location,
                                req_body.date);
    console.log(con);
    await connectionDBObj.saveConnection(sessionInput.getUserID, con);
    await userProfileDBObj.addRSVP(sessionInput.getUserID, con, 'yes');
    res.redirect('savedConnections');
  } catch(err){
    console.error(err);
  }




});


module.exports = router;
