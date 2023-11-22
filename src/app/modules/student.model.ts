import { Aggregate, Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from './student/student.interface';
import validator from 'validator';
import { boolean, func } from 'joi';
import bcrypt from 'bcrypt';
import config from '../config';

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        //capitalize- Rimon
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: '{VALUE} is not in capitalize format.',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid.',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father ContactNo is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'mother Occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'mother ContactNo is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local guardian name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local guardian occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local guardian contactNo is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local guardian address is required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'ID is required'], unique: true },
  password: {
    type: String,
    required: [true, 'password is required'],
    maxlength: [20, 'password xan not be more than 20 characters'],
  },
  name: {
    type: UserNameSchema,
    required: [true, 'Name is required'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: { type: String, trim: true },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    // validate: {
    //     validator: (value: string) => validator.isEmail(value),
    //     message: '{VALUE} is not valid email type.'
    // }
  },
  contactNo: {
    type: String,
    required: [true, 'contactNo is required'],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergencyContactNo is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'present Address is required'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanent Address is required'],
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian is required'],
    trim: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local Guardian is required'],
    trim: true,
  },
  profileImage: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
  isDeleted: { type: Boolean, default: false },
},
{
    toJSON:{
        virtuals: true,
    }
});


//mongoose virtual
studentSchema.virtual('fullName').get(function(){
    return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})


//pre save middleware/ hook: will work on create(), save()
studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //doc
  //hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post save middleware/ hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});


//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// [{$match: {idDeleted: {$ne: true}}},    { '$match': { id: '1233145' }}]
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});


//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function(id: string){
//     const existingUser = await Student.findOne({id: id})
//     return existingUser;
// }

//create model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
