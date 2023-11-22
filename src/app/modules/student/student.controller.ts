import { Request, Response } from "express";
import { studentServices } from "./student.service";
// import Joi from 'joi'
// import StudentJoiValidationSchema from "./student.validation";
import StudentValidationSchema from "./student.validation";

const createStudent =  async(req : Request, res : Response) =>{
    try{

        //creating a schema validation using Zod
        const {student: studentData} = req.body

        //data validation using joi
    //    const {error, value} = StudentJoiValidationSchema.validate(studentData)
       // console.log({error}, {value});


       //data validation using zod
       const zodParsedData = StudentValidationSchema.parse(studentData)


       //will call service function to send this data
       const result = await studentServices.createStudentIntoDb(zodParsedData)

    //    if(error){
    //     res.status(500).json({
    //         success: false,
    //         message: "something went wrong",
    //         error: error.details
    //     })
    //    }

        //send response
        res.status(200).json({
            success: true,
            message: "student created successfully",
            data: result
        })

    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
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
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
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
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}


//delete single
const deleteStudent = async(req: Request, res: Response) =>{
    try {
        const id = req.params.studentId
        const result = await studentServices.deleteStudentFromDb(id)
        res.status(200).json({
            success: true,
            message: "student is deleted successfully",
            data: result
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "something went wrong",
            error: error
        })
    }
}

export const studentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent
}