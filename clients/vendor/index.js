"use-strict";
const eventEmitter = require("../eventEmitter");

const { packageAvailable, packageDelivered } = require("./handler");

eventEmitter.on("pickup", packageAvailable);
eventEmitter.on("PACKAGE DELIVERED", packageDelivered);
