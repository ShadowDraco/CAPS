"use-strict";

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { Server } = require("socket.io");

// create a socket server singleton
const io = new Server();

io.listen(PORT);

// create a main namespace
io.on("connection", (socket) => {
  console.log(socket.id, " connected to main namespace");
});

// create a namespace for delivery service
const caps = io.of("/caps");

// configure sockets in the delivery service

caps.on("connection", (socket) => {
  console.log(socket.id, "connected to caps");

  socket.on("JOIN", (room) => {
    socket.join(room);
    console.log(socket.id, " joined ", room);
  });

  //? create new packages every 5 seconds
  setInterval(() => {
    socket.emit("pickup", {});
  }, 5000);

  //? log every event that comes through
  socket.onAny((eventName, payload) => {
    console.log(`EVENT: ${eventName}`, payload);
  });

  //? when a package is available broadcast it to the drivers
  socket.on("pickup", (payload) => {
    socket.broadcast.emit("pickup", payload);
  });
  //? Vendor notifies Driver that package is ready
  socket.on("PACKAGE AVAILABLE", (payload) => {
    socket.broadcast.emit("PACKAGE AVAILABLE", payload);
  });
  //? Driver notifies server that package picked up
  socket.on("PACKAGE PICKUP", (payload) => {
    //* */ SERVER tells driver to continue delivery
    socket.emit("DELIVER PACKAGE", payload);
  });

  //? When driver delivers notify everyone
  socket.on("PACKAGE DELIVERED", (payload) => {
    socket.broadcast.emit("PACKAGE DELIVERED", payload);
  });
});
