import path from "path";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ErrorHandler from "./Services/ErrorHandler";
import dotenv from "dotenv";


dotenv.config({
  path: "../.env",
});
const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://127.0.0.1:5500",
//   })
// );


// Routes
import signUpRoute from "./routes/users";
import logninRoute from "./routes/users";
import sendMessageRoute from "./routes/messages";
import getMessageRoute from "./routes/messages";

app.use(signUpRoute);
app.use(logninRoute);
app.use(sendMessageRoute);
app.use(getMessageRoute);

// Error handler
app.use((err: ErrorHandler, req: any, res: any, next: any) => {
  const errMsg = err.message || "Server Error!";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(errMsg);
});

server.listen(5000, () => console.log("Server is live!"));
