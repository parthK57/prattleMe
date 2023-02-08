import { io, app } from "../server";

// Routes
import sendMessageRoute from "../routes/messages";

io.on("connection", (socket: any) => {
  console.log(`Client connected with id:${socket.id}`);
  socket.on("send_message", (data: any) => {
    app.use(sendMessageRoute);
  });
});
