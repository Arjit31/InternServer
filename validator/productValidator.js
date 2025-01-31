const { z } = require("zod");

const productCategoryValidationSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name cannot exceed 100 characters" }),
});

const typeValidationSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name cannot exceed 100 characters" }),
    categoryId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid categoryId format" }),
});

const brandValidationSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" })
        .max(100, { message: "Name cannot exceed 100 characters" }),
    typeId: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid typeId format" }),
});

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
const cloudinaryIdSchema = z.string().min(1, "Cloudinary public ID is required");

const productValidationSchema = z.object({
    userId: objectIdSchema,
    category: objectIdSchema,
    type: objectIdSchema,
    brand: objectIdSchema,
    name: z.string().min(1, "Name is required"),
    productId: z.string().min(1, "Product ID is required"),
    unit: z.string().min(1, "Unit is required"),
    variant: z.string().default("Standard"),
    color: z.string().default("Assorted"),
    material: z.string().default("Not specified"),
    price: z.number().min(0, "Price must be non-negative"),
    unitPerItems: z.number().min(1, "Unit per item must be at least 1"),
    unitPricePerItem: z.number().min(0, "Unit price per item must be non-negative"),
    stock: z.number().min(0, "Stock must be non-negative").default(0),
    discount: z.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%").default(0),
    manufacturer: z.string().min(1, "Manufacturer is required"),
    productBarcodeId: cloudinaryIdSchema.nullable().default(null),
    detailedDescription: z.string().default("No description available"),
    keyFeatures: z.string().default("Not specified"),
    manufacturerDetails: z.string().default("Not specified"),
    productImageId: z.array(cloudinaryIdSchema).default([]),
});

const updateProductValidationSchema = z.object({
    userId: objectIdSchema.optional(),
    category: objectIdSchema.optional(),
    type: objectIdSchema.optional(),
    brand: objectIdSchema.optional(),
    name: z.string().min(1, "Name must have at least 1 character").optional(),
    productId: z.string().min(1, "Product ID must have at least 1 character").optional(),
    unit: z.string().min(1, "Unit must have at least 1 character").optional(),
    variant: z.string().min(1, "Variant must have at least 1 character").optional(),
    color: z.string().min(1, "Color must have at least 1 character").optional(),
    material: z.string().min(1, "Material must have at least 1 character").optional(),
    price: z.number().min(0, "Price must be non-negative").optional(),
    unitPerItems: z.number().min(1, "Unit per item must be at least 1").optional(),
    unitPricePerItem: z.number().min(0, "Unit price per item must be non-negative").optional(),
    stock: z.number().min(0, "Stock must be non-negative").optional(),
    discount: z.number().min(0, "Discount cannot be negative").max(100, "Discount cannot exceed 100%").optional(),
    manufacturer: z.string().min(1, "Manufacturer must have at least 1 character").optional(),
    productBarcodeId: cloudinaryIdSchema.nullable().optional(),
    detailedDescription: z.string().min(1, "Description must have at least 1 character").optional(),
    keyFeatures: z.string().min(1, "Key features must have at least 1 character").optional(),
    manufacturerDetails: z.string().min(1, "Manufacturer details must have at least 1 character").optional(),
    productImageId: z.array(cloudinaryIdSchema).min(1, "At least one image is required if updating").optional(),
  });  

module.exports = { productCategoryValidationSchema, typeValidationSchema, brandValidationSchema, productValidationSchema, updateProductValidationSchema};