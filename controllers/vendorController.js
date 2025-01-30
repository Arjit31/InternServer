const fs = require('fs');
const uploadFile = require('../utils/fileUpload');
const getSchemaFields = require('../utils/getSchemaFields');
const { VendorGeneralDetails, VendorBankDetails } = require('../models/vendorModel');
const cloudinary = require('cloudinary').v2;
// const mongoose = require('mongoose');

// setting the schema
function setSchema(route) {
  if (route == 'generalDetails') {
    return VendorGeneralDetails;
  }
  else if (route == 'bankDetails') {
    return VendorBankDetails;
  }
}

async function uploadVendorDetails(req, res) {
  const params = req.originalUrl;
  const routes = params.split('/');
  let schemaFields = [];

  const Schema = setSchema(routes[routes.length - 1]);

  // checking if user allready regestered these details
  let checkDuplicate;
  try {
    checkDuplicate = await Schema.findOne({ userId: req.user._id });
  } catch (error) {
    console.log(error);
  }
  if (checkDuplicate) {
    res.status(409).json("User already registered these details");
    return;
  }

  // setting the schema fields
  schemaFields = getSchemaFields(Schema);

  try {
    // const userId = new mongoose.Types.ObjectId(req.user._id);
    const userId = req.user._id;
    const body = req.body;
    const uploadedFiles = req.files;
    const fileFields = {};
    for (const field of schemaFields) {
      if (uploadedFiles[field]) {
        const tempFilePath = uploadedFiles[field][0].path;
        const fileName = `${req.user._id}_${field}`;

        // Upload the file to Cloudinary (or another service)
        const result = await uploadFile(tempFilePath, fileName);

        fileFields[field] = result;

        // Remove the temporary file after upload
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error('Failed to delete temp file:', err);
        });
      } else {
        fileFields[field] = null;
      }
    }

    // Merge the request body and uploaded file URLs
    const newVendorDetails = new Schema({
      userId,
      ...body,
      ...fileFields,
    });

    await newVendorDetails.save();

    res.status(201).json({
      message: 'Files uploaded and vendor details saved successfully!',
      data: newVendorDetails,
    });
  } catch (error) {
    console.error('Error uploading vendor details:', error);
    res.status(400).json({ error: 'Failed to upload vendor details' });
  }
};

async function getVendorDetails(req, res) {
  const params = req.originalUrl;
  const routes = params.split('/');
  const Schema = setSchema(routes[routes.length - 2]);
  try {
    const userId = req.params.userId;
    if(userId !== req.user._id && req.user.type !== 'admin'){
      res.status(401).json("Unauthorized access");
      return;
    }
    const vendorDetails = await Schema.findOne({ userId: req.user._id });
    if (!vendorDetails) {
      res.status(404).json("No details found");
      return;
    }
    res.status(200).json(vendorDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to get details");
  }
}

async function updateVendorDetails(req, res) {
  const params = req.originalUrl;
  const routes = params.split('/');
  const Schema = setSchema(routes[routes.length - 2]);
  const schemaFields = getSchemaFields(Schema);
  try {
    const userId = req.params.userId;
    if(userId !== req.user._id && req.user.type !== 'admin'){
      res.status(401).json("Unauthorized access");
      return;
    }
    const vendorDetails = await Schema.findOne({ userId: req.user._id });
    if (!vendorDetails) {
      res.status(404).json("No details found");
      return;
    }
    let body = req.body;
    const uploadedFiles = req.files;
    const fileFields = {};
    for (const field of schemaFields) {
      if (uploadedFiles[field]) {
        cloudinary.uploader.destroy(vendorDetails[field], function (error, result) {
          console.log(result, error)
        });
        const tempFilePath = uploadedFiles[field][0].path;
        const fileName = `${req.user._id}_${field}`;

        // Upload the file to Cloudinary (or another service)
        const result = await uploadFile(tempFilePath, fileName);

        fileFields[field] = result;

        // Remove the temporary file after upload
        fs.unlink(tempFilePath, (err) => {
          if (err) console.error('Failed to delete temp file:', err);
        });
      }
    }
    body = {
      ...body,
      ...fileFields,
    };
    const updatedDetails = await Schema.findOneAndUpdate({ userId: req.user._id }, body, { new: true });
    res.status(200).json(updatedDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to update details");
  }
}

async function deleteVendorDetails(req, res) {
  const params = req.originalUrl;
  const routes = params.split('/');
  const Schema = setSchema(routes[routes.length - 2]);
  try {
    const userId = req.params.userId;
    if(userId !== req.user._id && req.user.type !== 'admin'){
      res.status(401).json("Unauthorized access");
      return;
    }
    const vendorDetails = await Schema.findOne({ userId: req.user._id });
    if (!vendorDetails) {
      res.status(404).json("No details found");
      return;
    }
    const schemaFields = getSchemaFields(Schema);
    for (const field of schemaFields) {
      cloudinary.uploader.destroy(vendorDetails[field], function (error, result) {
        console.log(result, error)
      });
    }
    const deletedDetails = await Schema.findOneAndDelete({ userId: req.user._id });
    res.status(200).json(deletedDetails);
  } catch (error) {
    console.log(error);
    res.status(400).json("Failed to delete details");
  }
}

function getAllVendorDetails(req, res) {
  const params = req.originalUrl;
  const routes = params.split('/');
  if(req.user.type !== 'admin'){
    res.status(401).json("Unauthorized access");
    return;
  }
  const Schema = setSchema(routes[routes.length - 1]);
  Schema.find({}, function (err, data) {
    if (err) {
      res.status(400).json("Failed to get details");
      return;
    }
    res.status(200).json(data);
  });
}

module.exports = { uploadVendorDetails, getVendorDetails, updateVendorDetails, deleteVendorDetails, getAllVendorDetails };