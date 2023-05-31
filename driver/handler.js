"use strict";
const eventEmitter = require("../eventEmitter");

const packagePickup = (payload) => {
  console.log("DRIVER: picked up", payload.orderId);
  eventEmitter.emit("PACKAGE PICKUP", payload);
  eventEmitter.emit("event", "PACKAGE PICKUP", payload);
};

const pickupPackage = (payload) => {
  setTimeout(() => {
    packagePickup(payload);
  }, 2000);
};

const packageDeliver = (payload) => {
  console.log("DRIVER: delivered", payload.orderId);
  eventEmitter.emit("PACKAGE DELIVERED", payload);
  eventEmitter.emit("event", "PACKAGE DELIVERED", payload);
};

const deliverPackage = (payload) => {
  setTimeout(() => {
    packageDeliver(payload);
  }, 2000);
};

module.exports = {
  pickupPackage,
  deliverPackage,
  packagePickup,
  packageDeliver,
};
