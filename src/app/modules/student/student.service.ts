import { Student } from '../student.model';
import { TStudent } from './student.interface';

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already Exist');
  }

  const result = await Student.create(studentData); //built in static method

  //using instance method
  // const student = new Student(studentData)             //create an instance

  // if(await student.isUserExists(studentData.id)){
  //     throw new Error("User already Exist");

  // }

  // const result = await student.save()                  //built-in instance method

  return result;
};

//get all student
const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

//get single student
const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({id})
  const result = await Student.aggregate([{ $match: { id: id }}]);
  return result;
};

//delete single student
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
