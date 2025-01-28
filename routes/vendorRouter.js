const {Router} = require('express');
const multer = require('multer');
const {VendorGeneralDetails, VendorBankDetails} = require('../models/vendorModel');
const {uploadVendorDetails} = require('../controllers/vendorController');
const {auth} = require('../middleware/auth');
const router = Router();
const getSchemaFields = require('../utils/getSchemaFields');

// Configure Multer to store files temporarily on the server
const upload = multer({
  dest: 'temp/', // Temporary folder for storing files
});

// Dynamic Multer field configuration based on schema fields
const generalSchemaFields = getSchemaFields(VendorGeneralDetails);
const bankSchemaFields = getSchemaFields(VendorBankDetails);
const generalUploadFields = generalSchemaFields.map((field) => ({ name: field, maxCount: 1 }));
const bankUploadFields = bankSchemaFields.map((field) => ({ name: field, maxCount: 1 }));

router.get('/', auth, async (req, res) => {
  console.log(req.user);
  res.json('vendor Route');
});

router.post('/registerGeneralDetails', auth, upload.fields(generalUploadFields), uploadVendorDetails);
router.post('/registerBankDetails', auth, upload.fields(bankUploadFields), uploadVendorDetails);

module.exports = router;