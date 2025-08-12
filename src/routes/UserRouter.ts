import express from "express";
import { UserController } from "../controllers/UserController.js";

const routerUser = express.Router();

routerUser.post("/register", UserController.createUser);
routerUser.post("/login", UserController.loginUser);

export default routerUser;