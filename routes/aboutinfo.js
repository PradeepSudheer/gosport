var express = require('express');
var router = express.Router();
var utility = require('../util/connectionDB.js');
//about route
router.get('/',function(req,res){
  res.render('about',{session: req.session.userSession});
});

module.exports = router;
