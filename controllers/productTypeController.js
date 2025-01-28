const { Type, Category} = require('../models/productModel');
const { typeValidationSchema } = require('../validator/productValidator');

async function createType(req, res) {
    const typeData = req.body;
    try {
        typeValidationSchema.parse(typeData);
    } catch (error) {
        return res.status(400).json(error.errors);
    }
    try {
        const categoryExists = await Category.findById(typeData.categoryId);
        if (!categoryExists) {
            return res.status(400).json({ message: "Category does not exist" });
        }
        const type = new Type(typeData);
        await type.save();
        res.status(201).json(type);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function updateType(req, res) {
    const typeData = req.body;
    try {
        typeValidationSchema.parse(typeData);
    } catch (error) {
        return res.status(400).json(error.errors);
    }
    try {
        if (typeData.categoryId) {
            const categoryExists = await Category.findById(typeData.categoryId);
            if (!categoryExists) {
                return res.status(400).json({ message: "Category does not exist" });
            }
        }
        const typeId = req.params.typeId;
        const type = await Type.findByIdAndUpdate(
            { _id: typeId },
            typeData,
            { new: true }
        );
        res.status(200).json(type);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function getAllTypes(req, res) {
    try {
        const types = await Type.find().populate('categoryId');
        res.status(200).json(types);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function getType(req, res) {
    try {
        const typeId = req.params.typeId;
        const type = await Type.findById(typeId).populate('categoryId');
        res.status(200).json(type);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function deleteType(req, res) {
    try {
        const typeId = req.params.typeId;
        const type = await Type.findByIdAndDelete(typeId);
        res.status(200).json(type);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { createType, updateType, getAllTypes, getType, deleteType };
