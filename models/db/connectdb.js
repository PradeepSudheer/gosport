var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/gosport';

mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){
  console.log("Mongoose connected to ", url);
});

var Schema = mongoose.Schema;

const connectionSchema = new Schema({
  userID: String,
  ConnectionID: Number,
  ConnectionCategory: String,
  Sport: String,
  Description: String,
  Host: String,
  Location: String,
  dateAndTime: String,
  Imageurl: String
});

const userSchema = new Schema({
  userID: String,
  firstName: String,
  lastName: String,
  emailAddress: String,
  address1Field: String,
  address2Field: String,
  city: String,
  state: String,
  postCode: String,
  country: String
});

const userProfileSchema = new Schema({
  userID: String,
  userConnections:[
    {
      connectionID: Number,
      rsvp: String
    }
  ]
});

const userPassword = new mongoose.Schema({
  username: String,
  password: String
});

const connectionModel = mongoose.model('connections', connectionSchema);
const userModel = mongoose.model('user',userSchema);
const userProfileModel = mongoose.model('userprofile',userProfileSchema);
const userPasswordModel = mongoose.model('userpasswords', userPassword);

module.exports.userModel = userModel;
module.exports.connectionModel = connectionModel;
module.exports.userProfileModel = userProfileModel;
module.exports.userPasswordModel = userPasswordModel;
