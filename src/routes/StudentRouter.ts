import express from "express";
import { StudentController } from "../controllers/StudentController.js";

const routerStudent = express.Router();

routerStudent.get("/", StudentController.findAllStudents);
routerStudent.post("/create", StudentController.createStudent);
routerStudent.put("/update", StudentController.updateStudent);
routerStudent.delete("/delete/:id", StudentController.deleteStudent);

export default routerStudent;