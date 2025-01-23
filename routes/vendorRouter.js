const {Router} = require('express');
const uploadFile = require('../utils/fileUpload');
const multer = require('multer');
const fs = require('fs');

const auth = require('../middleware/auth');
const router = Router();

// Configure Multer to store files temporarily on the server
const upload = multer({
    dest: 'temp/', // Temporary folder for storing files
  });

router.get('/', auth, async (req, res) => {
    console.log(req.user);
    res.json('vendor Route');
});

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
      const tempFilePath = req.file.path; // Path to the temporary file uploaded by Multer
      console.log(req.body.type);
      const fileName = req.user._id +"_"+ req.body.type;
      const result = await uploadFile(tempFilePath, fileName); // Call your Cloudinary upload function
      // Remove the temporary file after uploading to Cloudinary
      fs.unlink(tempFilePath, (err) => {
          if (err) console.error('Failed to delete temp file:', err);
        });
        
      res.json({
        message: 'File uploaded successfully!',
        public_id: result, // The Cloudinary public ID
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(400).json({ error: 'Failed to upload file' });
    }
  });

module.exports = router;