const mongoose = require('mongoose');
const connectionsDB = require('./connectionsDB');
const connectdb = require('./connectdb');

const userProfileModel = connectdb.userProfileModel;

module.exports = class userProfileDB {

  async getUserProfileOne(userID){
    return new Promise(async(resolve, reject)=>{
      userProfileModel.find({userID:userID}, function(err, data){
        if(err){
          console.log(err);
          reject('couldn\'t fetch user profile from source');
        }else{
          resolve(data);
        }
      });
    });
  }

  async addNewConnectionUser(userID, connection,rsvp){
    return new Promise(async(resolve, reject) =>{
      console.log(connection);
      userProfileModel.updateOne({userID:userID, "userConnections.connectionID": {$ne: connection.getConnectionID}},
          {$push:{userConnections:{connectionID:connection.getConnectionID, rsvp: rsvp}}},function(err,data){
              if(err){
                console.log(err);
                reject('');
              }else{
                resolve(data);
              }
          })
    });
  }

  async updateConnectionUser(userID, connection, rsvp){
    return new Promise(async (resolve, reject)=>{
      userProfileModel.updateOne({userID:userID, "userConnections.connectionID":connection.getConnectionID},
      {$set:{"userConnections.$.rsvp":rsvp}},function(err, data){
          if(err){
            console.log(err);
            reject('-----');
          }else{
            resolve(data);
          }
      })
    });
  }

  async removeConnectionUser(userID, connection){
    return new Promise(async(resolve,reject)=> {
      userProfileModel.updateOne({userID: userID},
      {$pull:{userConnections:{connectionID:connection.getConnectionID}}},function(err,data){
        if(err){
          console.log(err);
          reject('');
        }else{
          resolve(data);
        }
      });
    });
  }

  async addNewUserProfile(userID, connection, rsvp){
    return new Promise(async(resolve, reject)=>{
      userProfileModel.updateOne({userID:{$ne:userID},"userConnections.connectionID": {$ne: connection.getConnectionId}},
      {userID:userID,$push:{userConnections:{connectionID:connection.getConnectionID,rsvp:rsvp}}},{upsert:true},function(err,data){
        if(err){
          console.log(err);
          reject('----');
        }else{
          resolve(data);
        }
      });
    });
  }

  async getUserProfile(userID){
    try{
      let profileDetails = await this.getUserProfileOne(userID);
      return profileDetails;
    }catch(err){
      console.log(err);
    }
  }

  async addRSVP(userID, connection, rsvp){
    try{
      let resp = await this.addNewConnectionUser(userID, connection,rsvp);
      if(resp.nModified == 0){
        console.log("000000");
        resp = await this.updateConnectionUser(userID, connection,rsvp);
        if(resp.nModified == 0){
          console.log("111111");
          resp = await this.addNewUserProfile(userID, connection,rsvp);
        }
      }
    }catch(err){
      console.log(error);
    }
  }

  async updateRSVP(userID, connection, rsvp){
    try{
      let resp = await this.updateConnectionUser(userID,connection,rsvp);
      console.log(resp);
      console.log('resp');
    } catch(err){
      console.log(error);
    }
  }

  async removeConnection(userID, connection){
    try{
      let resp = await this.removeConnectionUser(userID, connection);
    }catch(err){
      console.log(err);
    }
  }

}
