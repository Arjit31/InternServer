const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const vendorRouter = require('./routes/vendorRouter');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
const port = 3000;

mongoose.connect(process.env.MONGO_URL, {
  w: "majority",  // Write concern
  wtimeoutMS: 5000  // Optional write concern timeout in milliseconds
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));


app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRouter);

app.use('/vendor', vendorRouter);

app.use((err, req, res, next) => {
  res.status(500).json('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
