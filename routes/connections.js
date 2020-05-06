//connections route
var express = require('express');
var router = express.Router();
var utility = require('../util/connectionDB.js');
var connectionsDB = require('../models/db/connectionsDB');
var utilityObj = require('../models/utility');
const {check, validationResult} = require('express-validator');

router.get('/',async function(req, res){
  const connectionsDBObj = new connectionsDB();
  const utilObj  = new utilityObj();
  var connectionsList = await connectionsDBObj.getConnections();

  var categories = utilObj.getCategories(connectionsList);
  console.log('utilObj.getConnectionsObj(connectionsList)');
  console.log(utilObj.getConnectionsObj(connectionsList));
  //console.log(utilObj.getConnectionsObj(connectionsList));
  res.render('connections',{qs:utilObj.getConnectionsObj(connectionsList),categories:categories,session: req.session.userSession,
                                                          userConnectionList: req.session.userConnectionsSessions});

});


module.exports = router;
