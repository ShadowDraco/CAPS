"use strict";
const eventEmitter = require("../eventEmitter");

const availablePackage = (payload) => {
  eventEmitter.emit("PACKAGE AVAILABLE", payload);
  eventEmitter.emit("event", "PACKAGE AVAILABLE", payload);
};

const packageAvailable = (payload) => {
  setTimeout(() => {
    availablePackage(payload);
  }, 1000);
};

const deliveredMessage = (payload) => {
  console.log("Thank you for your order, ", payload.customer, "!!");
};

const packageDelivered = (payload) => {
  setTimeout(() => {
    deliveredMessage(payload);
  }, 1000);
};

module.exports = {
  packageAvailable,
  packageDelivered,
  availablePackage,
  deliveredMessage,
};
