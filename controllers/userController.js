const User = require('../models/userModel');
const validateUser = require('../validator/userValidator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function signupUser(req, res) {
  // validate the user details
  const details = req.body;
  console.log(details);
  if (!validateUser(details, "signup", res)) {
    return;
  };

  if(details.type || details.permission){
    res.status(403).json("You cannot perform that action");
    return;
  }

  // hash the password
  const password = details.password;
  const hash = await bcrypt.hash(password, saltRounds);
  details.password = hash;
  if(details.type == "admin"){
    details.permission = true;
  }

  // save the new user details in the database
  const user = new User(details);
  try {
    const result = await user.save();
    res.json(result);
  } catch (err) {
    console.log(err)
    res.status = 400;
    res.json({ "error": err });
  }
}

async function loginUser(req, res) {
  // validate the user details
  const details = req.body;
  console.log(details);
  if (!validateUser(details, "login", res)) {
    return;
  };

  // check if the user exists
  const user = await User.findOne({ email: details.email });
  if (!user) {
    res.status(404).json("user not found");
    return;
  }
  console.log(user);

  // check if the password is correct
  const match = await bcrypt.compare(details.password, user.password);
  if (!match) {
    res.json("incorrect password!");
    return;
  }

  // create a JWT token
  const token = jwt.sign({ _id: user._id, type: user.type, permission: user.permission}, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }).json("login successful");
}

async function updateUser(req, res) {
  const userId = req.params.userId;
  // check if the same user or admin is performing the action
  if(req.user._id != userId && req.user.type != "admin"){
    res.status(401).json("Unauthorized");
    return;
  }
  const details = req.body;
  // check if the user is authorized to perform the action
  if(req.user.type != "admin" && (details.type || details.permission)){
    res.status(403).json("You cannot perform that action");
    return;
  }
  console.log(details);
  
  // validate the user details
  if (!validateUser(details, "update", res)) {
    return;
  };

  // update the user details
  let doc;
  try {
    doc = await User.findOneAndUpdate({ _id: userId }, details, { new: true });
  } catch (error) {
    console.log(error);
    res.status = 400;
    res.json({ "error": error });
  }
  res.json(doc);
}

async function deleteUser(req, res) {
  const userId = req.params.userId;
  // check if the same user or admin is performing the action
  if(req.user._id != userId && req.user.type != "admin"){
    res.status(401).json("Unauthorized");
    return;
  }

  // delete the user details
  try {
    const doc = await User.findOneAndDelete({ _id: userId });
    res.clearCookie("access_token");
  } catch (error) {
    console.log(error);
    res.status = 400;
    res.json({ "error": error });
  }
  res.json("User deleted successfully");
}

async function getUser(req, res) {
  const userId = req.params.userId;
  // check if the same user or admin is performing the action
  if(req.user._id != userId && req.user.type != "admin"){
    res.status(401).json("Unauthorized");
    return;
  }

  // get the user details
  try {
    const doc = await User.findOne({ _id: userId });
    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status = 400;
    res.json({ "error": error });
  }
}

async function getAllUsers(req, res) {
  // check if the user is authorized to perform the action
  if(req.user.type != "admin"){
    res.status(403).json("You cannot perform that action");
    return;
  }

  // get all the users details
  try {
    const doc = await User.find();
    res.json(doc);
  } catch (error) {
    console.log(error);
    res.status = 400;
    res.json({ "error": error });
  }
}

module.exports = { signupUser, loginUser, updateUser, deleteUser, getUser, getAllUsers};