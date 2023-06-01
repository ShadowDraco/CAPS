"use-strict";

const eventEmitter = require("./eventEmitter");

// require the modules so they can listen when the hub is run by node
const eventPool = require("./eventpool");
const vendor = require("./vendor");
const driver = require("./driver");

// Initial event to start the loop
eventEmitter.emit("START", {});
