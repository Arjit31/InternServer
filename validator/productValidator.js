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

module.exports = { productCategoryValidationSchema, typeValidationSchema, brandValidationSchema};