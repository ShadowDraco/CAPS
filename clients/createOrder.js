const chance = require("chance").Chance();
// create a new order to start the process per vendor
const createOrder = (name) => {
  return {
    store: `${name}`,
    queueId: "PACKAGE AVAILABLE",
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
};

module.exports = createOrder;
