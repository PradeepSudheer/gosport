var mongoose = require('mongoose');
var connectdb = require('./connectdb');
var connection = require('../connection');
var connectionModel = connectdb.connectionModel;

module.exports = class connectionsDB{

  async getAllConnections(){
    return new Promise(async (resolve , reject) => {
      connectionModel.find({},function(err, connectionsList){
        if(err){
          console.error(err);
          reject('failed to fetch connections');
        }else{
          resolve(connectionsList);
        }
      });
    });
  }

  async getConnection_p(connectionID){
    return new Promise(async (resolve,reject)=>{

      connectionModel.find({ConnectionID: connectionID}, function(err, connectionDB){
        if(err){
          console.log(err);
          reject('could not find connection details');
        }else{
          resolve(connectionDB);
        }
      });
    });
  }




  async getConnections(){
    try {
      let connectionsList = await this.getAllConnections();
      return connectionsList;
    } catch (e) {
      console.log(e);
    }
  }

  async getConnection(connectionID){
    try{

      let r_connection = await this.getConnection_p(connectionID);

      if(r_connection.length > 0){
        return new connection(r_connection[0].ConnectionID,
                              r_connection[0].ConnectionCategory,
                              r_connection[0].Sport,
                              r_connection[0].Description,
                              r_connection[0].Host,
                              r_connection[0].Location,
                              r_connection[0].dateAndTime,
                              r_connection[0].Imageurl);
      }else{
        return new connection();
      }
    }catch(err){
      console.log(err);
    }
  }

  async getNewSequenceNumber(){
    try{
      let list = await this.getSequenceNumber();
      console.log(list);
      console.log('list');
      if(list.length!=0){
        return list[0].ConnectionID+1;
      } else{
        return 1001;
      }
    } catch(err){
      console.error(err);
    }
  }

  async getSequenceNumber(){
    return new Promise(async (resolve, reject) => {
      connectionModel.find({}, {ConnectionID:1}, function (err, data) {
        if(err){
          console.error(err);
          reject('Couldn\'t find sequence number');
        } else{
          resolve(data);
          console.log(data);
          console.log('data');
        }
      }).sort({ConnectionID:-1}).limit(1);
    });
  }

  async saveConnection(userID, connection){
    try{
      await this.createOrUpdateConnection(userID, connection);
    } catch(err){
      console.error(err);
    }
  }

  async createOrUpdateConnection(userID, connection){
    return new Promise(async (resolve, reject) => {
      console.log('Connection-update');
      console.log(connection);
      new connectionModel(
        {userID: userID, ConnectionID: connection.getConnectionID,
           ConnectionCategory: connection.ConnectionCategory,
          Sport: connection.getSport, Description: connection.getDescription,
          Host: connection.getHost,
          Location: connection.getLocation, dateAndTime: connection.getdateAndTime,
        Imageurl:connection.getImageurl})
          .save(function (err, data) {
            if(err){
              console.error(err);
              reject('Couldn\'t save connection');
            } else{
              resolve(data);
            }
        })
    });
  }

}
