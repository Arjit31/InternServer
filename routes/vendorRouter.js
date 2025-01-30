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

router.post('/registerGeneralDetails', auth, upload.fields(generalUploadFields), uploadVendorDetails);
router.get('/getGeneralDetails/:userId', auth, getVendorDetails);
router.put('/updateGeneralDetails/:userId', auth, upload.fields(generalUploadFields), updateVendorDetails);
router.delete('/deleteGeneralDetails/:userId', auth, deleteVendorDetails);
router.get('/getAllGeneralDetails', auth, getAllVendorDetails);

router.post('/registerBankDetails', auth, upload.fields(bankUploadFields), uploadVendorDetails);
router.get('/getBankDetails/:userId', auth, getVendorDetails);
router.put('/updateBankDetails/:userId', auth, upload.fields(bankUploadFields), updateVendorDetails);
router.delete('/deleteBankDetails/:userId', auth, deleteVendorDetails);
router.get('/getAllBankDetails', auth, getAllVendorDetails);

module.exports = router;