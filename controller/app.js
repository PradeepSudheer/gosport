var express = require('express');
var app = express();
var path = require('path');
var utility = require('../util/connectionDB.js');
var session = require('express-session');
app.use(session({secret: "secretID"}));

app.set('view engine','ejs');
app.set('views','../views');


app.use('/assets/stylesheets',express.static(path.join(__dirname,'/../assets/stylesheets')));
app.use('/assets/images',express.static(path.join(__dirname,'/../assets/images')));

//routes
var index = require('../routes/indexinfo.js');
var connection = require('../routes/connection.js');
var connections = require('../routes/connections.js');
var about = require('../routes/aboutinfo.js');
var contact = require('../routes/contact.js');
var newconnection = require('../routes/newconnection.js');
var savedconnections = require('../routes/savedconnections.js');
//var newconnectionsaved = require('../routes/newconnectionsaved.js');
var login = require('../routes/login.js');
var usercontroller = require('./usercontroller.js');
var logout = require('../routes/logout.js');
var wurl = require('../routes/wurl.js');
var addconnection = require('../routes/addconnection.js');
//routes
app.use('/',index);

app.use('/connections',connections);

app.use('/connection*',connection);

app.use('/savedconnections',usercontroller);

app.use('/newconnection',newconnection);

app.use('/about',about);

app.use('/contact',contact);

//app.use('/newconnectionsaved',newconnectionsaved);

app.use('/login',login);

app.use('/',usercontroller);

app.use('/logout',logout);

app.use('/',usercontroller);

app.use('/addconnection',addconnection);

app.use('/*',wurl);

//listening to server
app.listen(9000,function(){
    console.log('app started')
    console.log('listening on port 9000')
});
