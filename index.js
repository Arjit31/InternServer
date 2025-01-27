const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const vendorRouter = require('./routes/vendorRouter');
const productRouter = require('./routes/productRouter');

dotenv.config();
const app = express();
const port = 3000;

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

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

app.use('/product', productRouter);

app.use((err, req, res, next) => {
  res.status(500).json('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
