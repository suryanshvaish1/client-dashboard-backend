import http from "http";
import app from "./app.js";
import { initSocket } from "./socket.js";

const server = http.createServer(app);

// initialize socket
const io = initSocket(server);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});