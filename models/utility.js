var connection = require('./connection');
var userConnection = require('./connectionUser');
var user = require('./User');
var userProfile = require('./profileUser');
var connectionsDB = require('./db/connectionsDB');
var userProfileDB = require('./db/profileuserDB');
var userProfile = require('./profileUser');

module.exports = class objectUtil{

    getConnectionsObj(connectionsList){
      let connectionsObj = [];
      connectionsList.forEach((item) => {
        connectionsObj.push(new connection(item.ConnectionID,
                                          item.ConnectionCategory,
                                          item.Sport,
                                        item.Description,
                                        item.Host,
                                      item.Location,
                                    item.dateAndTime,
                                  item.Imageurl));
      });
      return connectionsObj;
    }
    getCategories(connectionsList){
      let categories = new Set();
      connectionsList.forEach(function(item){
        categories.add(item.ConnectionCategory);
      });
      return Array.from(categories);
    }

    async stubProfilesToObj(userID){
      const userProfileDBObj = new userProfileDB();
      const connectionDBObj = new connectionsDB();

      let list = await userProfileDBObj.getUserProfile(userID);
      let userConnectionList = new Array();

      if(list.length>0){
        let userConList = list[0].userConnections;
        for(let i=0; i<userConList.length;i++){
          let con = await connectionDBObj.getConnection(userConList[i].connectionID);
          userConnectionList.push(new userConnection(new connection(con.ConnectionID,
                                                              con.ConnectionCategory,
                                                              con.Sport,
                                                              con.Description,
                                                              con.Host,
                                                            con.Location,
                                                          con.dateAndTime,
                                                        con.Imageurl),userConList[i].rsvp));
        }
        
      }

      return new userProfile(userID, userConnectionList);
    }
}
