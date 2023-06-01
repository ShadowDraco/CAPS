"use-strict";

const packagePickup = (payload, socket) => {
  console.log("DRIVER: picked up", payload.orderId);
  socket.emit("PACKAGE PICKUP", payload);
};

const pickupPackage = (payload, socket) => {
  setTimeout(() => {
    packagePickup(payload, socket);
  }, 2000);
};

const packageDeliver = (payload, socket) => {
  console.log("DRIVER: delivered", payload.orderId);
  socket.emit("PACKAGE DELIVERED", payload);
};

const deliverPackage = (payload, socket) => {
  setTimeout(() => {
    packageDeliver(payload, socket);
  }, 2000);
};

module.exports = {
  pickupPackage,
  deliverPackage,
  packagePickup,
  packageDeliver,
};
