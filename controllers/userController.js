const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function signupUser(req, res) {
    const details = req.body;
    console.log(details);
    const password = details.password_hash;
    const password_hash = await bcrypt.hash(password, saltRounds);
    details.password_hash = password_hash;
    const user = new User(details);
    console.log(details);
    try {
      const result = await user.save();
      res.send(result);
    } catch (err) {
      console.log(err)
      res.status = 400;
      res.send({"error": err});
    }
}

module.exports = signupUser;