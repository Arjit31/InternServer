const fs = require('fs');
const uploadFile = require('../utils/fileUpload');
const getSchemaFields = require('../utils/getSchemaFields');
const {VendorGeneralDetails, VendorBankDetails} = require('../models/vendorModel');
// const mongoose = require('mongoose');

async function uploadVendorDetails(req, res){
  const params = req.originalUrl;
  const routes = params.split('/');
  let schemaFields = [];
  let Schema;

  console.log(routes[routes.length-1]);
  // setting the schema
  if(routes[routes.length-1] === 'registerGeneralDetails'){
    Schema = VendorGeneralDetails;
  }
  else if(routes[routes.length-1] === 'registerBankDetails'){
    Schema = VendorBankDetails;
  }

  // checking if user allready regestered these details
  let checkDuplicate;
  try {
    checkDuplicate = await Schema.findOne({userId: req.user._id});
  } catch (error) {
    console.log(error);
  }
  if(checkDuplicate){
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

module.exports = { uploadVendorDetails };