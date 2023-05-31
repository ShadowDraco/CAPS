"use strict";
const eventEmitter = require("../eventEmitter");

const packageAvailable = (payload) => {
  setTimeout(() => {
    eventEmitter.emit("PACKAGE AVAILABLE", payload);
  }, 1000);
};

const packageDelivered = (payload) => {
  setTimeout(() => {
    console.log("Thank you for your order, ", payload.customer, "!!");
  }, 1000);

  return "Thank you for your order, ", payload.customer, "!!";
};

module.exports = { packageAvailable, packageDelivered };
