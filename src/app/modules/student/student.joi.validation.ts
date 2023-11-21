import Joi from "joi"

// Define Joi schema for UserName
const UserNameJoiValidationSchema = Joi.object({
    firstName: Joi.string().required().trim().max(20)
        .pattern(new RegExp(/^[A-Z][a-zA-Z]*$/))
        .message('First Name must start with a capital letter and contain only alphabetic characters'),
    middleName: Joi.string().trim(),
    lastName: Joi.string().required().trim()
        .pattern(new RegExp(/^[A-Za-z]+$/))
        .message('Last Name must contain only alphabetic characters')
});

// Define Joi schema for Guardian
const GuardianJoiValidationSchema = Joi.object({
    fatherName: Joi.string().required().trim(),
    fatherOccupation: Joi.string().required().trim(),
    fatherContactNo: Joi.string().required().trim(),
    motherName: Joi.string().required().trim(),
    motherOccupation: Joi.string().required().trim(),
    motherContactNo: Joi.string().required().trim()
});

// Define Joi schema for LocalGuardian
const LocalGuardianJoiValidationSchema = Joi.object({
    name: Joi.string().required().trim(),
    occupation: Joi.string().required().trim(),
    contactNo: Joi.string().required().trim(),
    address: Joi.string().required().trim()
});

// Define Joi schema for Student
const StudentJoiValidationSchema = Joi.object({
    id: Joi.string().required(),
    name: UserNameJoiValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    dateOfBirth: Joi.string().trim(),
    email: Joi.string().email().required().trim(),
    contactNo: Joi.string().required().trim(),
    emergencyContactNo: Joi.string().required().trim(),
    bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    presentAddress: Joi.string().required().trim(),
    permanentAddress: Joi.string().required().trim(),
    guardian: GuardianJoiValidationSchema.required(),
    localGuardian: LocalGuardianJoiValidationSchema.required(),
    profileImage: Joi.string(),
    isActive: Joi.string().valid('active', 'blocked').default('active')
});

export default StudentJoiValidationSchema;