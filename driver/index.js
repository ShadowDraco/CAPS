"use-strict";
const eventEmitter = require("../eventEmitter");

const { pickupPackage, transitPackage, deliverPackage } = require("./handler");

eventEmitter.on("PACKAGE AVAILABLE", pickupPackage);
eventEmitter.on("PACKAGE PICKUP", transitPackage);
eventEmitter.on("IN TRANSIT", deliverPackage);
