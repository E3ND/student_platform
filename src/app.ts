import express from "express";
import cors from "cors";

import routerStudent from "./routes/StudentRouter.js"
import routerUser from "./routes/UserRouter.js";

const app = express();

//Cors permite que qualquer achamada acesse a API, isso só é aplicado apenas em desenvolvimento
//Em produção seria mudado apenas para a URL do front-end que usa ela
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