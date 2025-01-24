const fs = require('fs');
const VendorGeneralDetails = require('../models/vendorModel');
const uploadFile = require('../utils/fileUpload');
const mongoose = require('mongoose');

// Extract all fields ending with "Id" except "userId" from the schema
const schemaFields = Object.keys(VendorGeneralDetails.schema.paths).filter(
  (field) => field.endsWith('Id') && field !== 'userId'
);

async function uploadVendorDetails(req, res){
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
    const newVendorDetails = new VendorGeneralDetails({
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