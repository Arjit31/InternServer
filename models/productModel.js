const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
