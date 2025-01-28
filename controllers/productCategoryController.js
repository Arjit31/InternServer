const {Category} = require('../models/productModel')
const {productCategoryValidationSchema} = require('../validator/productValidator');

async function createCategory(req, res){
    const categoryName = req.body;
    try{
        productCategoryValidationSchema.parse(categoryName);
    } catch (error){
        return res.status(400).json(error.errors);
    }
    try{
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error){
        res.status(400).json(error);
    }
}

async function updateCategory(req, res){
    const categoryName = req.body;
    try{
        productCategoryValidationSchema.parse(categoryName);
    } catch (error){
        return res.status(400).json(error.errors);
    }
    try{
        const productId = req.params.productId;
        const category = await Category.findByIdAndUpdate({_id: productId}, req.body, { new: true });
        res.status(201).json(category);
    } catch (error){
        res.status(400).json(error);
    }
}

async function getAllCategory(req, res){
    try{
        const category = await Category.find();
        res.status(200).json(category);
    } catch (error){
        res.status(400).json(error);
    }
}

async function getCategory(req, res){
    try{
        const productId = req.params.productId;
        const category = await Category.findById(productId);
        res.status(200).json(category);
    } catch (error){
        res.status(400).json(error);
    }
}

async function deleteCategory(req, res){
    try{
        const productId = req.params.productId;
        const category = await Category.findByIdAndDelete(productId);
        res.status(200).json(category);
    } catch (error){
        res.status(400).json(error);
    }
}

module.exports = {createCategory, updateCategory, getAllCategory, getCategory, deleteCategory};