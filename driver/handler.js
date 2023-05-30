"use strict";
const eventEmitter = require("../eventEmitter");

const pickupPackage = (payload) => {
  setTimeout(() => {
    console.log("DRIVER: picked up", payload.orderId);
    eventEmitter.emit("PACKAGE PICKUP", payload);
  }, 1000);

  return "DRIVER: picked up", payload.orderId;
};

const transitPackage = (payload) => {
  setTimeout(() => {
    eventEmitter.emit("IN TRANSIT", payload);
  }, 1000);
};

const deliverPackage = (payload) => {
  setTimeout(() => {
    console.log("DRIVER: delivered", payload.orderId);
    eventEmitter.emit("PACKAGE DELIVERED", payload);
  }, 1000);

  return "DRIVER: delivered", payload.orderId;
};

module.exports = { pickupPackage, transitPackage, deliverPackage };
