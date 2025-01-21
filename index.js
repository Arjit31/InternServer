const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL, {
  w: "majority",  // Write concern
  wtimeoutMS: 5000  // Optional write concern timeout in milliseconds
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));


app.get('/', async (req, res) => {

  const user = new User({
    first_name: 'John',
    last_name: 'Doe',
    email_address: 'john@gmail.com',
    phone_number: '1234567890',
    password_hash: 'password',
    type: 'user',
    permission: false
  });

  try {
    const result = await user.save();
    res.send(result);
  } catch (err) {
    console.log(err)
    res.status = 400;
    res.send({"error": err});
  }
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});