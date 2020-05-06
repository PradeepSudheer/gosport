const mongoose = require('mongoose');
const connectdb = require('./connectdb');
const userModel = connectdb.userModel;
const userPasswordModel = connectdb.userPasswordModel;
const bcrypt = require('bcrypt');

module.exports = class UserUtility{
  constructor(){}

  async getUsersAll(){
    return new Promise(async(resolve,reject)=>{
      userModel.find({},function(err,usersList){
        if(err){
          console.log(error);
          reject('could not retrive users from source');
        }else{
          resolve(usersList);
        }
      });
    });
  }

  async getUserOne(userID){
    return new Promise(async (resolve,reject)=>{
      userModel.find({userID:userID},function(err,userDetails){
        if(err){
          console.log(err);
          reject('could find user in source');
        }else{
          resolve(userDetails);
        }
      });
    });
  }


  async createUserSave(user){
    return new Promise(async(resolve, reject)=>{
      new userModel(
        {
          userID:user.getUserID,
          firstName:user.getfirstName,
          lastName:user.getlastName,
          emailAddress:user.getemailAddress,
          address1Field:user.getaddress1Field,
          address2Field:user.getaddress2Field,
          city: user.getcity,
          state:getstate,
          postCode:getpostCode,
          country:getcountry,

        }
      ).save(function(err, data){
        if(err){
          console.log(error);
          reject('user failed to be saved');
        }else{
          resolve(data);
        }
      });
    });
  }

  async getUsers(){
    try{
      let usersList = await this.getUsersAll();
      return usersList;
    }catch(err){
      console.error(err);
    }
  }

  async getUser(userID){
    try{
      let user_one = await this.getUserOne(userID);
      return user_one;
    }catch(err){
      console.log(err);
    }
  }

  async createUser(user){
    try{
      await this.createUsersave(user);
    }catch(err){
      console.log('user not saved');
    }
  }

  async validateUser(username, password){
    try{
      return new Promise(async (resolve, reject) => {
        userPasswordModel.find({username:username},async function (err, data){
          if(err){
            reject(err);
          } else if(data.length>0){
            let compared = bcrypt.compare(password, data[0].password);
            console.log('Compare:',compared)
            if(compared){
              resolve(data);
            } else{
              reject(err);
            }
          } else{
            reject(err);
          }
        });
      })
    }
    catch (err){
      console.err(err);
    }
  }

}
