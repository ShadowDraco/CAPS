"use-strict";

require("dotenv").config();
const PORT = process.env.PORT || 3001;
const { Server } = require("socket.io");
const Queue = require("./lib/queue");
const mainQueue = new Queue();

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
  }, 6000);

  //? log every event that comes through
  socket.onAny((eventName, payload) => {
    console.log(`EVENT: ${eventName}`, payload);

    // ? Get or create a message queue for the client
    let subscribedEvents = ["PACKAGE AVAILABLE", "PACKAGE DELIVERED"]; // list of events that have subscriptions
    if (subscribedEvents.includes(eventName)) {
      // add this event to the queue
      let currentQueue = mainQueue.read(eventName);
      // check if that queue exists
      if (!currentQueue) {
        let queueId = mainQueue.store(eventName, new Queue());
        currentQueue = mainQueue.read(queueId);
      }
      //? store the event in the queue with unique id
      currentQueue.store(payload.orderId, payload);
    }
  });

  //? when a package is available broadcast it to the vendors
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

  //? When someone receives the queued messages
  socket.on("RECEIVED", (payload) => {
    //? find the right queue
    console.log(payload);
    let currentQueue = mainQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error("There is no queue for this message");
    }

    //? Remove from queue and return it to the receivers by ORDER id
    let message = currentQueue.remove(payload.orderId);

    // note that NO ONE is listening for this!
    socket.broadcast.emit("RECEIVED", message);
  });

  //? provide an endpoint for clients to receive queued messages
  socket.on("GET-QUEUE", (payload) => {
    // get the queue to send

    let currentQueue = mainQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data) {
      console.log("sending", payload.queueId);
      Object.keys(currentQueue.data).forEach((orderId) => {
        //? send each message to the client in the queue
        socket.emit(payload.queueId, currentQueue.read(orderId));
        socket.emit("RECEIVE", payload);
      });
    }

    return; // if there are no messages do nothing
  });
});
