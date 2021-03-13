const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Users = new Schema(
  {
    firstName : {
      type: String,
      required: true,
      trim: true,
 
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
   
      },
    userName:{
      type: String,
      required: true,
      trim: true,
    },
    email:{
       type: String,
       required: true,
       trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
  },
  },
  {
    versionKey: false
}
);

const usersList = mongoose.model("Users", Users);
module.exports = usersList;
