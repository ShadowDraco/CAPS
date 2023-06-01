const chance = require("chance").Chance();
// create a new order to start the process per vendor
const createOrder = () => {
  return {
    store: `${chance.word()}-flowers`,
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
};

module.exports = createOrder;
