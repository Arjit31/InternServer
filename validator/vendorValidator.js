const { z } = require("zod");

const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");
const cloudinaryIdSchema = z.string().min(1, "Cloudinary public ID is required");

const generalDetailsSchema = z.object({
    userId: objectIdSchema,
    generalVendorName: z.string().min(1, "Vendor name is required"),
    generalAadharCardId: cloudinaryIdSchema,
    generalPancardId: cloudinaryIdSchema,
    generalPrimaryNumber: z.string().min(10, "Primary number must be at least 10 digits"),
    generalSecondaryNumber: z.string().optional(),
    generalAddressProofId: cloudinaryIdSchema,
    generalEmail: z.string().email("Invalid email format"),
    generalDesignation: z.string().min(1, "Designation is required"),
    generalCountry: z.string().min(1, "Country is required"),
    generalState: z.string().min(1, "State is required"),
    generalCity: z.string().min(1, "City is required"),
    generalPincode: z.string().min(6, "Pincode must be at least 6 digits"),
});

const updateGeneralDetailsSchema = generalDetailsSchema.partial();

const bankDetailsSchema = z.object({
    userId: objectIdSchema,
    bankName: z.string().min(1, "Bank name is required"),
    bankAccountNumber: z.string().min(1, "Bank account number is required"),
    bankBranch: z.string().min(1, "Bank branch is required"),
    ifscCode: z.string().min(1, "IFSC code is required"),
    accountHolderName: z.string().min(1, "Account holder name is required"),
    passbookId: cloudinaryIdSchema,
    email: z.string().email("Invalid email format"),
    mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits"),
    gstNumber: z.string().optional(),
    pancardNumber: z.string().min(1, "PAN card number is required"),
    pancardId: cloudinaryIdSchema,
    pincode: z.string().min(6, "Pincode must be at least 6 digits"),
});

const updateBankDetailsSchema = bankDetailsSchema.partial();

module.export = {
    generalDetailsSchema,
    updateGeneralDetailsSchema,
    bankDetailsSchema,
    updateBankDetailsSchema,
};