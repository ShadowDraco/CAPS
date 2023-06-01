"use-strict";
//? Create socket connection
const { io } = require("socket.io-client");
const socket = io("http://localhost:3001/caps");
const createOrder = require("../createOrder");
//? Join the vendors room
socket.emit("JOIN", "vendors");

const { packageAvailable, packageDelivered } = require("./handler");

socket.on("pickup", (payload) => packageAvailable(createOrder(), socket));
socket.on("PACKAGE DELIVERED", (payload) => packageDelivered(payload, socket));
