"use-strict";

const eventEmitter = require("../eventEmitter");
const { packageAvailable, packageDelivered } = require("./handler");
const createOrder = require("../eventpool");

// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock("../eventEmitter.js", () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

describe.skip("Vendor", () => {
  it("receives a package and says thank you when its delivered", () => {
    const payload = createOrder();

    packageAvailable(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "PACKAGE AVAILABLE",
      payload
    );

    expect(
      packageDelivered(payload).toEqual(
        "Thank you for your order, ",
        payload.customer,
        "!!"
      )
    );
  });
});
