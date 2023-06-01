"use-strict";

//* Socket is included in all of these functions and is
//* passed in from index so that new sockets aren't created
//* between handler and index and connecting to server.

const availablePackage = (payload, socket) => {
  socket.emit("PACKAGE AVAILABLE", payload);
};

const packageAvailable = (payload, socket) => {
  setTimeout(() => {
    availablePackage(payload, socket);
  }, 1000);
};

const deliveredMessage = (payload, socket) => {
  console.log("Thank you for your order, ", payload.customer, "!!");
};

const packageDelivered = (payload, socket) => {
  setTimeout(() => {
    deliveredMessage(payload, socket);
  }, 1000);
};

module.exports = {
  packageAvailable,
  packageDelivered,
  availablePackage,
  deliveredMessage,
};
