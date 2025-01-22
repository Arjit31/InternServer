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

  // hash the password
  const password = details.password;
  const hash = await bcrypt.hash(password, saltRounds);
  details.password = hash;

  // save the new user details in the database
  const user = new User(details);
  console.log(details);
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
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  }).json("login successful");
}

module.exports = { signupUser, loginUser };