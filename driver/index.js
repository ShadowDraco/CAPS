"use-strict";
const eventEmitter = require("../eventEmitter");

const { pickupPackage, deliverPackage } = require("./handler");

eventEmitter.on("PACKAGE AVAILABLE", pickupPackage);
eventEmitter.on("PACKAGE PICKUP", deliverPackage);
