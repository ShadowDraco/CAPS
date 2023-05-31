"use-strict";
const eventEmitter = require("./eventEmitter");

const chance = require("chance").Chance();

// create a new order to start the process
const createOrder = () => {
  return {
    store: `${chance.word()}-flowers`,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
};

const CAPSLOOP = () => {
  eventEmitter.emit("pickup", createOrder());
  setTimeout(() => {
    CAPSLOOP();
  }, 8000);
};
//* entry point */
eventEmitter.on("START", CAPSLOOP);

//* Event logger */

const EventLogger = (payload, name) => {
  const event = {
    event: name,
    time: new Date(),
    payload: payload,
  };

  console.log("EVENT:", event);
};

eventEmitter.on("pickup", (payload) => EventLogger(payload, "pickup"));

eventEmitter.on("PACKAGE AVAILABLE", (payload) =>
  EventLogger(payload, "PACKAGE AVAILABLE")
);

eventEmitter.on("PACKAGE PICKUP", (payload) =>
  EventLogger(payload, "PACKAGE PICKUP")
);
eventEmitter.on("IN TRANSIT", (payload) => EventLogger(payload, "IN TRANSIT"));

eventEmitter.on("PACKAGE DELIVERED", (payload) =>
  EventLogger(payload, "PACKAGE DELIVERED")
);

module.exports = createOrder;
