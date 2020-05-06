var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var router = express.Router();
var session = require('express-session');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var connection = require('../models/connection');
var connectionUser = require('../models/connectionUser');
var profileUser = require('../models/profileUser');
var user = require('../models/User');

var connectionDB = require('../models/db/connectionsDB');
var profileUserDB = require('../models/db/profileuserDB');
var usersDB = require('../models/db/usersDB');
var utilObjClass = require('../models/utility');
const {check, validationResult} = require('express-validator');
const validation = [
  check('username').trim().not().isEmpty()
    .withMessage('username is required').escape(),
  check('password').trim().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Username and password mismatch')
];

async function handleValidationErrors(req, res, next){
  const errors = validationResult(req);
  console.log(errors);
  let errorMsg;
  if(!errors.isEmpty()){
    return res.render('login',{session: undefined, errorMsg:errors.array(), successMsg: new Array()});
  } else{
    try{
      let userDetails = await new usersDB().validateUser(req.body.username, req.body.password);
      if(userDetails.length>0){
        userProfileObj = new profileUser(req.body.username, new Array());
        req.session.userSession = userProfileObj;
      } else{
        errorMsg = new Array({msg:'Username and password mismatch, please login again!!'});
        return res.render('login',{session: undefined, errorMsg:errorMsg, successMsg:new Array()});
      }
    } catch(err){
      errorMsg = new Array({msg:'Username and password mismatch, please login again!!'});
      return res.render('login',{session: undefined, errorMsg:errorMsg, successMsg:new Array()});
    }

  }
  next();
}



let dummyUser;
//session
async function Session(req, res, next){
  let profileuserObj = undefined;
  const usersDBObj = new usersDB();
  if(req.session.userSession == undefined && req.body != undefined){
    console.log(req.body.username);
    let us = await usersDBObj.getUser(req.body.username);
    if(us.length > 0){
      dummyUser = new user(us[0].userID,
                           us[0].firstName,
                           us[0].lastName,
                           us[0].emailAddress,
                           us[0].address1Field,
                           us[0].address2Field,
                           us[0].city,
                           us[0].state,
                           us[0].postCode,
                           us[0].country);
      profileuserObj = new profileUser(dummyUser.getUserID,new Array());
      req.session.userSession = profileuserObj;
    }
  }else if(req.session.userSession!=undefined){
    let us = await usersDBObj.getUser(req.session.userSession.userID);
    dummyUser = new user(us[0].userID,
                         us[0].firstName,
                         us[0].lastName,
                         us[0].emailAddress,
                         us[0].address1Field,
                         us[0].address2Field,
                         us[0].city,
                         us[0].state,
                         us[0].postCode,
                         us[0].country);
  }
  next();
}

function conObjList(activeUserProfile){
  var activeConsList = [];

  activeUserProfile.userConnections.forEach(function(item) {
    const con = item.connection;
    let conObj = new connection(con.ConnectionID,
                                con.ConnectionCategory,
                                con.Sport, con.Description,
                                con.Host, con.Location,
                                con.dateAndTime,
                                con.Imageurl);
    let userConObj = new connectionUser(conObj, item.rsvp);
    activeConsList.push(userConObj);
  });
  return activeConsList;
}

router.post('/login',urlencodedParser,validation, handleValidationErrors,Session,async function(req,res){

  try {
      if(req.session.userSession){
        res.redirect('savedconnections');
      }else{
        res.redirect('login');
      }
  } catch (e) {
    console.log(e);
    res.redirect('login');
  }
});
//savedconnections* router
router.post('/savedconnections*', urlencodedParser, Session,async function(req,res){
  try{

    const utilObjClassObj = new utilObjClass();
    const userProfileDBObj = new profileUserDB();
    const connectionDBObj = new connectionDB();
    const activeUserProfile = req.session.userSession;


    let activeUserProfileList = conObjList(activeUserProfile);


    let userProfileObj = new profileUser(dummyUser.getUserID, activeUserProfileList);
    let action = req.query.action;
    let connid = req.query.ID;
    let connectionResponse = req.body.response;
    if(!action){
      userProfileObj = await utilObjClassObj.stubProfilesToObj(activeUserProfile.userID);
      res.render('savedConnections', {session: dummyUser, userProfileSession: userProfileObj});
    } else if(/^\d+$/.test(connid)){
      if(action == 'save' || action == 'update' || action == 'delete'){
        console.log('delete');
        const connectionDetails = await connectionDBObj.getConnection(req.query.ID);
        if(action == 'save'){
          await userProfileDBObj.addRSVP(activeUserProfile.userID, connectionDetails, connectionResponse);
        } else if(action == 'update'){
          await userProfileDBObj.updateRSVP(activeUserProfile.userID, connectionDetails, connectionResponse);
        } else if(action == 'delete'){
          await userProfileDBObj.removeConnection(activeUserProfile.userID, connectionDetails);
        }
        userProfileObj = await utilObjClassObj.stubProfilesToObj(activeUserProfile.userID);
        req.session.userSession = userProfileObj;

        res.render('savedConnections',{session: dummyUser, userProfileSession: userProfileObj});
      } else{
        res.redirect('connections');
      }
    }
  } catch(err){
    console.error(err);
  }

});

router.get('/savedconnections*',Session, async function(req,res){
  var activeuserProfile = req.session.userSession;

  if(activeuserProfile == undefined){
    res.redirect('login');
  }else{
    const utilObjClassObj = new utilObjClass();
    //const userProfileDBObj = new profileUserDB();

    const userProfileObj = await utilObjClassObj.stubProfilesToObj(activeuserProfile.userID);
    res.render('savedconnections',{session:dummyUser, userProfileSession: userProfileObj });
  }
});


module.exports = router;
