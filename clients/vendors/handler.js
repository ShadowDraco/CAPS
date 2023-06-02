"use-strict";

//* Socket is included in all of these functions and is
//* passed in from index so that new sockets aren't created
//* between handler and index and connecting to server.

const availablePackage = (payload, socket) => {
  socket.emit("PACKAGE AVAILABLE", payload);
};

const packageAvailable = (payload, socket) => {
  setTimeout(() => {
    payload.queueId = "PACKAGE AVAILABLE";
    availablePackage(payload, socket);
  }, 2000);
};

const deliveredMessage = (payload, socket, store) => {
  if (payload.store === store) {
    console.log(store, ": Thank you for your order, ", payload.customer, "!!");
  }
};

const packageDelivered = (payload, socket, store) => {
  if (store === payload.store) {
    setTimeout(() => {
      deliveredMessage(payload, socket, store);
    }, 2000);
  }
};

module.exports = {
  packageAvailable,
  packageDelivered,
  availablePackage,
  deliveredMessage,
};
