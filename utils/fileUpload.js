const cloudinary = require('cloudinary').v2;

const uploadFile = async (filePath, fileName) => {
    // allow overwriting the asset with new versions
    const options = {
      public_id: fileName,
      unique_filename: true,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(filePath, options);
      // console.log(result);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
};

module.exports = uploadFile;