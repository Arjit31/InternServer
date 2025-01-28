const { Brand, Type} = require('../models/productModel');
const { brandValidationSchema } = require('../validator/productValidator');

async function createBrand(req, res) {
    const brandData = req.body;
    try {
        brandValidationSchema.parse(brandData);
    } catch (error) {
        return res.status(400).json(error.errors);
    }
    try {
        const typeExists = await Type.findById(brandData.typeId);
        if (!typeExists) {
            return res.status(400).json({ message: "Type does not exist" });
        }
        const brand = new Brand(brandData);
        await brand.save();
        res.status(201).json(brand);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function updateBrand(req, res) {
    const brandData = req.body;
    try {
        brandValidationSchema.parse(brandData);
    } catch (error) {
        return res.status(400).json(error.errors);
    }
    try {
        if (brandData.typeId) {
            const typeExists = await Type.findById(brandData.typeId);
            if (!typeExists) {
                return res.status(400).json({ message: "Type does not exist" });
            }
        }
        const brandId = req.params.brandId;
        const brand = await Brand.findByIdAndUpdate(
            { _id: brandId },
            brandData,
            { new: true }
        );
        res.status(200).json(brand);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function getAllBrands(req, res) {
    try {
        const brands = await Brand.find().populate('typeId');
        res.status(200).json(brands);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function getBrand(req, res) {
    try {
        const brandId = req.params.brandId;
        const brand = await Brand.findById(brandId).populate('typeId');
        res.status(200).json(brand);
    } catch (error) {
        res.status(400).json(error);
    }
}

async function deleteBrand(req, res) {
    try {
        const brandId = req.params.brandId;
        const brand = await Brand.findByIdAndDelete(brandId);
        res.status(200).json(brand);
    } catch (error) {
        res.status(400).json(error);
    }
}

module.exports = { createBrand, updateBrand, getAllBrands, getBrand, deleteBrand };
