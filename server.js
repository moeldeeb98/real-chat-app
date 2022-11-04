const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// set static folder
app.use(express.static(path.join(__dirname, "public")));

// run when a client connects
io.on("connection", (socket) => {
  // Welcome current user
  socket.emit("message", "welcome to chatcord");

  // Broadcast when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  //  Runs when client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    console.log("chatMessage", msg);
    io.emit("message", msg);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
