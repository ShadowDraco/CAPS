"use-strict";

const eventEmitter = require("../eventEmitter");
const { pickupPackage, transitPackage, deliverPackage } = require("./handler");
const createOrder = require("../eventpool");

// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock("../eventEmitter", () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe.skip("Driver", () => {
  it("receives a package to deliver", () => {
    const payload = createOrder();

    pickupPackage(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith("PACKAGE PICKUP", payload);

    expect(
      packageDelivered(payload).toEqual("DRIVER: picked up", payload.orderId)
    );
  });

  it("it goes into transit", () => {
    const payload = createOrder();

    transitPackage(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith("IN TRANSIT", payload);
  });

  it("delivers the package", () => {
    const payload = createOrder();

    deliverPackage(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "PACKAGE DELIVERED",
      payload
    );

    expect(
      packageDelivered(payload).toEqual("DRIVER: delivered", payload.orderId)
    );
  });
});
