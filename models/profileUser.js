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





















  // add(connection, rsvp){
  //   var connectionsList = [];
  //   var added = false;
  //   if(this.getConnectionsUser() == undefined || this.getConnectionsUser().length == 0){
  //     connectionsList.push(new userConnection(connection,rsvp));
  //   }else{
  //     var currentconnections = this.getConnectionsUser();
  //     currentconnections.forEach(function(item){
  //       if(item.getConnection.getConnectionID == connection.getConnectionID){
  //         connectionsList.push(new userConnection(connection,rsvp));
  //         added = true;
  //       }else{
  //         connectionsList.push(item);
  //       }
  //     });
  //     if(!added){
  //       connectionsList.push(new userConnection(connection,rsvp));
  //     }
  //   }
  //   this.setConnectionsUser(connectionsList);
  // }
  //
  // remove(connection){
  //     var activeconnections = this.getConnectionsUser();
  //     var newconnections = activeconnections.filter(item => item.getConnection.getConnectionID != connection.getConnectionID);
  //     this.setConnectionsUser(newconnections);
  // }
  //
  // getConnectionsUser(){
  //   return this.connections;
  // }
  //
  // setConnectionsUser(connectionsList){
  //   this.connections = connectionsList;
  // }

//}
