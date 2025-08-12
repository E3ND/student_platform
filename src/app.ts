import express from "express";
import cors from "cors";

import routerStudent from "./routes/StudentRouter.js"

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/student", routerStudent);

app.listen(3333, () => {
    console.log("Running in server http://localhost:3333")
});