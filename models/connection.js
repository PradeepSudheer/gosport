//connection model
module.exports = class connection{
  constructor(ConnectionID, ConnectionCategory, Sport, Description, Host, Location, dateAndTime, Imageurl){
    this.ConnectionID = ConnectionID;
    this.ConnectionCategory = ConnectionCategory;
    this.Sport = Sport;
    this.Description = Description;
    this.Host = Host;
    this.Location = Location;
    this.dateAndTime = dateAndTime;
    this.Imageurl = Imageurl;
  }
  get getConnectionID(){
    return this.ConnectionID;
  }
  set setConnectionID(ConnectionID){
    return this.ConnectionID;
  }

  get getConnectionCategory(){
    return this.ConnectionCategory;
  }
  set setConnectioncategory(ConnectionCategory){
    return this.ConnectionCategory;
  }

  get getSport(){
    return this.Sport;
  }
  set setSport(Sport){
    return this.Sport;
  }

  get getDescription(){
    return this.Description;
  }
  set setDescription(Description){
    return this.Description;
  }

  set setHost(Host){
    return this.Host;
  }
  get getHost(){
    return this.Host;
  }
  get getLocation(){
    return this.Location;
  }
  set setLocation(Location){
    return this.Location;
  }

  get getdateAndTime(){
    return this.dateAndTime;
  }
  set setdateAndTime(dateAndTime){
    return this.dateAndTime;
  }

  get getImageurl(){
    return this.Imageurl;
  }
  set setImageurl(Imageurl){
    return this.Imageurl;
  }

}
