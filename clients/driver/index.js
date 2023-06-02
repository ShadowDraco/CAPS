"use-strict";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001/caps");
//? Join the drivers room
socket.emit("JOIN", "drivers");
socket.emit("GET-QUEUE", { queueId: "PACKAGE AVAILABLE" });

const { pickupPackage, deliverPackage } = require("./handler");

socket.on("PACKAGE AVAILABLE", (payload) => pickupPackage(payload, socket));
socket.on("DELIVER PACKAGE", (payload) => deliverPackage(payload, socket));
socket.on("RECEIVED", (payload) => socket.emit("RECEIVED", payload));
