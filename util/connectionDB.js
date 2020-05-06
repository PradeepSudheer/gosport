//connectionDB
var connection = require('../models/connection');

var Swimming = {
  ConnectionID: "AQ01" ,
  ConnectionCategory: "AquaticSports",
  Sport: "Swimming",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "Heisenberg",
  Location: "FootyMonks",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};

var Marcopolo = {
  ConnectionID: "AQ02" ,
  ConnectionCategory: "AquaticSports",
  Sport: "Marcopolo",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "Saul",
  Location: "Monkspalace",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};

var BeachballRace = {
  ConnectionID: "AQ03" ,
  ConnectionCategory: "AquaticSports",
  Sport: "beachballRace",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "Jesse",
  Location: "uptown",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};


var Soccer = {
  ConnectionID: "BS01" ,
  ConnectionCategory: "BallSports",
  Sport: "Soccer",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "fring",
  Location: "mecklenberg",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};


var Football = {
  ConnectionID: "BS02" ,
  ConnectionCategory: "BallSports",
  Sport: "Football",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "tuco",
  Location: "charlotte",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};


var Cricket = {
  ConnectionID: "BS03" ,
  ConnectionCategory: "BallSports",
  Sport: "Cricket",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "peter",
  Location: "hyderabad",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};

var F1racing = {
  ConnectionID: "MS01" ,
  ConnectionCategory: "MotorSports",
  Sport: "F1racing",
  Description: "5vs5 match on 31st January, 5:00 AM at FootyMonks. Game would be for 2 hours. Price for the Turf is shared evenly among players.",
  Host: "zech",
  Location: "hyderabad",
  dateAndTime: "November 25th,2019 10:30am-2:00pm",
  Imageurl: '../assets/images/heisenberg.jpg'
};


var allConnections = [
  Swimming,
  Marcopolo,
  BeachballRace,
  Soccer,
  Football,
  Cricket,
  F1racing
];

var getConnections = function(){
  var myList = [];
  for(var i=0;i<allConnections.length;i++){
    let connectionobject = new connection(allConnections[i].ConnectionID,
                                          allConnections[i].ConnectionCategory,
                                          allConnections[i].Sport,
                                          allConnections[i].Description,
                                          allConnections[i].Host,
                                          allConnections[i].Location,
                                          allConnections[i].dateAndTime,
                                          allConnections[i].Imageurl);
    myList.push(connectionobject);
  }
  return myList;
};


var getConnection = function(ConnectionID){
  for(var i=0;i<allConnections.length;++i){
    console.log(ConnectionID);
    console.log(allConnections[i].ConnectionID);
    if(ConnectionID == allConnections[i].ConnectionID){
      console.log('sdfg');
      let connectionobj = new connection(allConnections[i].ConnectionID,
                                          allConnections[i].ConnectionCategory,
                                          allConnections[i].Sport,
                                          allConnections[i].Description,
                                          allConnections[i].Host,
                                          allConnections[i].Location,
                                          allConnections[i].dateAndTime,
                                          allConnections[i].Imageurl);

      return connectionobj;
    }
  }
}

var getCategories = function(){
  var categories = [];
  for(var i=0;i<allConnections.length;++i){
    categories.push(allConnections[i].ConnectionCategory);
  }
  categories = categories.filter((v, i, a) => a.indexOf(v) === i);
  return categories;
}


module.exports.getCategories = getCategories;
module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;
