//profile user model
var userConnection = require('./connectionUser.js');
var connectionDB = require('../util/connectionDB.js');
var connection = require('./connection.js');

module.exports = class profileUser{
  constructor(userID,connectionsList){
    this.userID = userID;
    this.userConnections = connectionsList;
  }

   getConnectionsList(){
    return this.userConnections;
  }

   setConnectionsList(connectionsList){
    this.userConnections = connectionsList;
  }

  get getUserID(){
    return this.userID;
  }

}
