const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
});

// Type Schema
const typeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

// Brand Schema
const brandSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    typeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
});

// Product Schema
const productSchema = new mongoose.Schema({
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    name: { type: String, required: true },
    productId: { type: String, unique: true, required: true },
    unit: { type: String, required: true },
    variant: { type: String, default: "Standard" },
    color: { type: String, default: "Assorted" },
    material: { type: String, default: "Not specified" },
    price: { type: Number, required: true, min: 0 },
    unitPerItems: { type: Number, required: true, min: 1 },
    unitPricePerItem: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    manufacturer: { type: String, required: true },
    productBarcodeId: { type: String, default: null },
    detailedDescription: { type: String, default: "No description available" },
    keyFeatures: { type: String, default: "Not specified" },
    manufacturerDetails: { type: String, default: "Not specified" },
    productImageIds: { type: [String], default: [] },
}, { timestamps: true });

const Brand = mongoose.model('Brand', brandSchema);
const Type = mongoose.model('Type', typeSchema);
const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Category, Type, Brand };
