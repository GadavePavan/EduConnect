const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
});

// Admin Schema
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const groupSchema = new mongoose.Schema({
    groupName :{ type:String, required:true , trim:true},
    members:[
        {
            user:{ type:mongoose.Schema.Types.objectId, ref:'User', required:true},
            role: { type:String, enum:['admin','member'], required:true},
        },
    ],
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Group = mongoose.model("Group" ,groupSchema );

module.exports = {
  User,
  Admin,
  Group
};
