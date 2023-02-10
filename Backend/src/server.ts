import http from "http";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ErrorHandler from "./Services/ErrorHandler";
import dotenv from "dotenv";
import { Server } from "socket.io";

dotenv.config({
  path: "../.env",
});
export const app = express();
const server = http.createServer(app);
app.use(cors());

app.use(bodyParser.json());

// SOCKET.IO CONFIG
const io = new Server(server, {
  cors: {
    origin: "http://127.0.0.1:5173",
  },
});
io.on("connection", async (socket: any) => {
  io.emit("server", "Connection: LIVE");

  // PRIVATE MESSAGE
  socket.on("send_message", (data: any) => {
    socket.to(data.room).emit("server-client-message", data.message);
  });

  // JOIN PRIVATE ROOM FOR PRIVATE MESSAGES
  socket.on("join-room", (data: any) => {
    socket.join(data.room);
  });
});



// Routes
import signUpRoute from "./routes/users";
import logninRoute from "./routes/users";
import addUserRoute from "./routes/users";
import getFriendsRoute from "./routes/users";
import getMessageRoute from "./routes/messages";
import sendMessageRoute from "./routes/messages";
import createGroupRoute from "./routes/users";
import joinGroupRoute from "./routes/users";

app.use(signUpRoute);
app.use(logninRoute);
app.use(addUserRoute);
app.use(getFriendsRoute);
app.use(getMessageRoute);
app.use(sendMessageRoute);
app.use(createGroupRoute);
app.use(joinGroupRoute);

// Error handler
app.use((err: ErrorHandler, req: any, res: any, next: any) => {
  const errMsg = err.message || "Server Error!";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(errMsg);
});

server.listen(5000, () => console.log("Server is live!"));
