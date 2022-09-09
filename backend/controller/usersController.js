const express = require("express");
const Users = require("../models/users");
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//Showing the list of Users
const userList = async (req, res) => {
  
  let data = await Users.find();
  res.json(data);
};

var user;

const userAdd = async (req, res) => {
  // let  = req.body;
  console.log(req.body);
  try{
  let data = new Users({
    name:req.body.name,
    email:req.body.email,
    phone:req.body.phone,
    password:req.body.password
  });
  let response = await data.save();
  let myToken = await data.getAuthToken();
  res.status(200).json({ message: "ok" ,token:myToken});
}catch(error){
  res,json({status:"error",error:"duplicate email"})
}

  

  
};

//USer Login
const userLogin = async (req, res) => {
  //If request has empty fields pass error
  if (!req.body.email || !req.body.password) {
    res
      .status(301)
      .json({ message: "Error", message: "Please enter email/password" });
  }

  user = await Users.findOne({ email: req.body.email });
  var responseType = {
    message: "Ok",
  };

  if (user) {
    var match = await bcrypt.compare(req.body.password, user.password);
    console.log(match);
    if (match) {
      let myToken = await user.getAuthToken();
      responseType.message = "Login Successful";
      responseType.token = myToken;
    } else {
      responseType.message = "Not";
      responseType.error = true;
    }
  } else {
    responseType.message = "Invalid Email ID";
  }

  res.status(200).json({ message: "ok", data: responseType });
};

const userLogout = (req, res) => {
  // user.tokens = user.tokens.filter()
  console.log(user);
};

// Exporting all the functions
module.exports = {
  userList,
  userAdd,
  userLogin,
  userLogout,
};
