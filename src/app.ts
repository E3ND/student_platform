import express from "express";
import cors from "cors";

import routerStudent from "./routes/StudentRouter.js"
import routerUser from "./routes/UserRouter.js";

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/student", routerStudent);
app.use("/user", routerUser);

app.listen(3333, () => {
    console.log("Running in server http://localhost:3333")
});