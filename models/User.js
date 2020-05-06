//user model
module.exports = class User{
  constructor(UserID,firstName,lastName,emailAddress,address1Field,address2Field,city,state,postCode,country){
    this.UserID=UserID;
    this.firstName=firstName;
    this.lastName=lastName;
    this.emailAddress=emailAddress;
    this.address1Field=address1Field;
    this.address2Field=address2Field;
    this.city=city;
    this.state=state;
    this.postCode=postCode;
    this.country=country;
  }

  get getUserID(){
    return this.UserID;
  }
  set setUserID(UserID){
    return this.UserID;
  }

  get getfirstName(){
    return this.firstName;
  }
  set setfirstName(firstName){
    return this.firstName;
  }

  get getlastName(){
    return this.lastName;
  }
  set setlastName(lastName){
    return this.lastName;
  }

  get getemailAddress(){
    return this.emailAddress;
  }
  set setemailAddress(emailAddress){
    return this.emailAddress;
  }

  get getaddress1Field(){
    return this.address1Field;
  }
  set setaddress1Field(address1Field){
    return this.address1Field;
  }

  get getaddress2Field(){
    return this.address2Field;
  }
  set setaddress2Field(address2Field){
    return this.address2Field;
  }

  get getcity(){
    return this.city;
  }
  set setcity(city){
    return this.city;
  }

  get getstate(){
    return this.state;
  }
  set setstate(state){
    return this.state;
  }

  get getpostCode(){
    return this.postCode;
  }
  set setpostCode(postCode){
    return this.postCode;
  }

  get getcountry(){
    return this.country;
  }
  set setcountry(country){
    return this.country;
  }
}
