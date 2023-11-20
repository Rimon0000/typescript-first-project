import { Request, Response, response } from "express";
import { studentServices } from "./student.service";

const createStudent =  async(req : Request, res : Response) =>{
    try{
        const {student: studentData} = req.body

        //will call service function to send this data
        const result = await studentServices.createStudentIntoDb(studentData)

        //send response
        res.status(200).json({
            success: true,
            message: "student created successfully",
            data: result
        })

    }catch(error){
        console.log(error);
    }
}

//get all
const getAllStudents = async(req : Request, res : Response) =>{
    try{
        const result = await studentServices.getAllStudentsFromDb()
        res.status(200).json({
            success: true,
            message: "students are retrieved successfully",
            data: result
        })
    }catch(error){
        console.log(error);
    }
}

//get single
const getSingleStudent = async(req: Request, res: Response) =>{
    try {
        const id = req.params.studentId
        const result = await studentServices.getSingleStudentFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is retrieved successfully",
            data: result
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const studentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent
}