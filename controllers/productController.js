const fs = require('fs');
const uploadFile = require('../utils/fileUpload');
const getSchemaFields = require('../utils/getSchemaFields');
const { Product, Category, Type, Brand } = require('../models/productModel');
const User = require('../models/userModel');

async function createProduct(req, res) {
    try {
        let schemaFields = getSchemaFields(Product);
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
                    const fileName = `${req.user._id}_${field}${i != 0 ? '_'+i : ''}`;

                    // Upload the file to Cloudinary (or another service)
                    const result = await uploadFile(tempFilePath, fileName);

                    if(uploadedFiles[field].length > 1){
                        if(!fileFields[field]){
                            fileFields[field] = [];
                        }
                        fileFields[field].push(result);
                    } else {
                        fileFields[field] = result;
                    }

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
        const user = await User.findOneAndUpdate({ _id: userId }, { $push: { productIDs: newProduct._id } }, { new: true });
        res.status(201).json({
            message: 'Files uploaded and product details saved successfully!',
            data: newProduct,
        });
    } catch (error) {
        console.error('Error uploading product details:', error);
        res.status(400).json({ error: 'Failed to upload product details' });
    }
}

async function getAllProducts(req, res){
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(400).json({ error: 'Failed to fetch products' });
    }
}

async function getProduct(req, res){
    try {
        const productId = req.params.productId;
        const product = await Product.findOne({ _id: productId });
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(400).json({ error: 'Failed to fetch product' });
    }
}

async function updateProduct(req, res){
    try {
        let schemaFields = getSchemaFields(Product);
        const userId = req.user._id;
        const productId = req.params.productId;
        let body = req.body;
        console.log(body.productId);
        const product = await Product.findOne({ _id: productId });
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
        if(product.userId != userId){
            return res.status(403).json({error: "Unauthorized"});
        }
        if(body.brand){
            const brandData = await Brand.findOne({ _id: body.brand });
            if(!brandData){
                return res.status(404).json({error: "Brand not found"});
            }
            if(body.type){
                if(brandData.typeId != body.type){
                    return res.status(400).json({error: "Brand and type mismatch"});
                }
                const typeData = await Type.findOne({ _id: body.type });
                if(body.category && typeData.categoryId != body.category){
                    return res.status(400).json({error: "Type and category mismatch"});
                }
            }
        }
        const uploadedFiles = req.files;
        const fileFields = {};
        for (const field of schemaFields) {
            if (uploadedFiles[field]) {
                for (let i = 0; i < uploadedFiles[field].length; i++) {
                    const tempFilePath = uploadedFiles[field][i].path;
                    const fileName = `${req.user._id}_${field}${i != 0 ? '_'+i : ''}`;

                    // Upload the file to Cloudinary (or another service)
                    const result = await uploadFile(tempFilePath, fileName);

                    if(uploadedFiles[field].length > 1){
                        if(!fileFields[field]){
                            fileFields[field] = [];
                        }
                        fileFields[field].push(result);
                    } else {
                        fileFields[field] = result;
                    }

                    // Remove the temporary file after upload
                    fs.unlink(tempFilePath, (err) => {
                        if (err) console.error('Failed to delete temp file:', err);
                    });
                }
            }
        }
        body = {...body,
            ...fileFields,}
        const updatedProduct = await Product.findOneAndUpdate({ _id: productId }, body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(400).json({ error: 'Failed to update product' });
    }
}

async function deleteProduct(req, res){
    try {
        const userId = req.user._id;
        const productId = req.params.productId;
        const product = await Product.findOne({ _id: productId });
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
        if(product.userId != userId){
            return res.status(403).json({error: "Unauthorized"});
        }
        await Product.findOneAndDelete({ _id: productId });
        const user = await User.findOneAndUpdate({ _id: userId }, { $pull: { productIDs: productId } }, { new: true });
        res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(400).json({ error: 'Failed to delete product' });
    }
}

module.exports = { createProduct, getAllProducts, updateProduct, getProduct, deleteProduct};