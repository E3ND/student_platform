import express from "express";
import { StudentController } from "../controllers/StudentController.js";
import { verifyToken } from "../middleware/verify-token.js";

const routerStudent = express.Router();

routerStudent.get("/", StudentController.findAllStudents);
routerStudent.post("/create", verifyToken, StudentController.createStudent);
routerStudent.put("/update", verifyToken, StudentController.updateStudent);
routerStudent.delete("/delete/:id", verifyToken, StudentController.deleteStudent);

export default routerStudent;