import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDb =async (student:Student) => {
    const result = await StudentModel.create(student)
    return result; 
}

//get all student
const getAllStudentsFromDb = async() =>{
    const result = await StudentModel.find()
    return result;
}

//get single student
const getSingleStudentFromDb = async(id: string) =>{
    const result = await StudentModel.findOne({id})
    return result
}

export const studentServices = {
    createStudentIntoDb,
    getAllStudentsFromDb,
    getSingleStudentFromDb
}