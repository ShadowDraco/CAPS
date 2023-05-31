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
eventEmitter.on("event", (eventName, payload) => {
  const event = {
    event: eventName,
    time: new Date(),
    payload: payload,
  };

  console.log("EVENT:", event);
});

module.exports = createOrder;
