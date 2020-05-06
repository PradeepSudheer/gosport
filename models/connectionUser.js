//connection user model
module.exports = class connectionUser{
  constructor(connection,rsvp){
    this.connection = connection;
    this.rsvp = rsvp;
  }

  get getConnection(){
    return this.connection;
  }

  set setConnection(connection){
    this.connection = connection;
  }

  get getRsvp(){
    return this.rsvp;
  }

  set setRsvp(rsvp){
    this.rsvp = rsvp;
  }

}
