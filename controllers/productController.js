const fs = require('fs');
const uploadFile = require('../utils/fileUpload');
const getSchemaFields = require('../utils/getSchemaFields');
const { Product, Category, Type, Brand } = require('../models/productModel');

async function createProduct(req, res) {
    let schemaFields = getSchemaFields(Product);
    try {
        // const userId = new mongoose.Types.ObjectId(req.user._id);
        const userId = req.user._id;
        const body = req.body;
        const category = req.body.category;
        const type = req.body.type;
        const brand = req.body.brand;
        const brandData = await Brand.findOne({ _id: brand });
        if(!brandData){
            return res.status(404).json({error: "Brand not found"});
        } else if(brandData.typeId != type){
            return res.status(400).json({error: "Brand and type mismatch"});
        }
        const typeData = await Type.findOne({ _id: type });
        if(typeData.categoryId != category){
            return res.status(400).json({error: "Type and category mismatch"});
        }
        const uploadedFiles = req.files;
        const fileFields = {};
        for (const field of schemaFields) {
            if (uploadedFiles[field]) {
                for (let i = 0; i < uploadedFiles[field].length; i++) {
                    const tempFilePath = uploadedFiles[field][i].path;
                    const fileName = `${req.user._id}_${field}_${i != 0 ? i : ''}`;

                    // Upload the file to Cloudinary (or another service)
                    const result = await uploadFile(tempFilePath, fileName);

                    fileFields[field] = result;

                    // Remove the temporary file after upload
                    fs.unlink(tempFilePath, (err) => {
                        if (err) console.error('Failed to delete temp file:', err);
                    });
                }
            } else {
                fileFields[field] = null;
            }
        }
        // Merge the request body and uploaded file URLs
        const newProduct = new Product({
            userId,
            ...body,
            ...fileFields,
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Files uploaded and vendor details saved successfully!',
            data: newProduct,
        });
    } catch (error) {
        console.error('Error uploading vendor details:', error);
        res.status(400).json({ error: 'Failed to upload vendor details' });
    }
}

module.exports = { createProduct };