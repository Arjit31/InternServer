const {Router} = require('express');
const multer = require('multer');
const {VendorGeneralDetails, VendorBankDetails} = require('../models/vendorModel');
const {uploadVendorDetails, getVendorDetails, updateVendorDetails, deleteVendorDetails, getAllVendorDetails} = require('../controllers/vendorController');
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

router.post('/generalDetails', auth, upload.fields(generalUploadFields), uploadVendorDetails);
router.get('/generalDetails/:userId', auth, getVendorDetails);
router.put('/generalDetails/:userId', auth, upload.fields(generalUploadFields), updateVendorDetails);
router.delete('/generalDetails/:userId', auth, deleteVendorDetails);
router.get('/generalDetails', auth, getAllVendorDetails);

router.post('/bankDetails', auth, upload.fields(bankUploadFields), uploadVendorDetails);
router.get('/bankDetails/:userId', auth, getVendorDetails);
router.put('/bankDetails/:userId', auth, upload.fields(bankUploadFields), updateVendorDetails);
router.delete('/bankDetails/:userId', auth, deleteVendorDetails);
router.get('/bankDetails', auth, getAllVendorDetails);

module.exports = router;