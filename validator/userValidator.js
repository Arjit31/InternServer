const { z } = require("zod");

const signupValidationSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email address is required"),
    phoneNumber: z
        .string()
        .regex(/^\d{10}$/, "Phone number must be a 10-digit number"), // Assuming phone number format
    password: z
        .string()
        .min(6, "Password hash must be at least 6 characters long"),
});

const loginValidationSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .min(1, "Email address is required"),
    password: z
        .string()
        .min(6, "Password hash must be at least 6 characters long"),
});

function validateUser(details, route, res) {
    try {
        if(route == "signup"){
            signupValidationSchema.parse(details);
        }
        else if(route == "login"){
            loginValidationSchema.parse(details);
        }
        else{
            throw new Error('Wrong Route');
        }
        return true;
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.status(200).json({ error: err.issues });
        } else {
            res.status(500).json({ error: err.message });
        }
        return false;
    }
}

module.exports = validateUser;