"use-strict";
//? Create socket connection
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001/caps");
const createOrder = require("../createOrder");
//? Join the vendors room
const name = "amca-widget";
socket.emit("JOIN", "vendors");
socket.emit("GET-QUEUE", { queueId: "PACKAGE DELIVERED" });

const { packageAvailable, packageDelivered } = require("./handler");

socket.on("pickup", (payload) => packageAvailable(createOrder(name), socket));
socket.on("PACKAGE DELIVERED", (payload) =>
  packageDelivered(payload, socket, name)
);
