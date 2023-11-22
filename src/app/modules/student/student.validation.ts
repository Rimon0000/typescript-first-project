import * as z from 'zod';

const UserNameValidationSchema = z.object({
    firstName: z.string()
        .min(1)
        .max(20)
        .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
            message: 'First Name must be in capitalize format'
        }),
    middleName: z.string().optional(),
    lastName: z.string()
        .refine(value => /^[a-zA-Z]+$/.test(value), {
            message: 'Last Name must contain only alphabetic characters'
        })
});

const GuardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1)
});

const LocalGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1)
});

const StudentValidationSchema = z.object({
    id: z.string().nonempty(),
    password: z.string().max(20),
    name: UserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImage: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
    isDeleted: z.boolean()
});

export default StudentValidationSchema;
