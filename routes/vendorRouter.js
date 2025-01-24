const {Router} = require('express');
const multer = require('multer');
const VendorGeneralDetails = require('../models/vendorModel');
const {uploadVendorDetails} = require('../controllers/vendorController');
const auth = require('../middleware/auth');
const router = Router();

// Configure Multer to store files temporarily on the server
const upload = multer({
  dest: 'temp/', // Temporary folder for storing files
});

// Dynamic Multer field configuration based on schema fields
const schemaFields = Object.keys(VendorGeneralDetails.schema.paths).filter(
  (field) => field.endsWith('Id') && field !== 'userId'
);
const uploadFields = schemaFields.map((field) => ({ name: field, maxCount: 1 }));

router.get('/', auth, async (req, res) => {
  console.log(req.user);
  res.json('vendor Route');
});

router.post('/register', auth, upload.fields(uploadFields), uploadVendorDetails);

module.exports = router;