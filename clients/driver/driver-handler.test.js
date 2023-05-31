"use-strict";

const eventEmitter = require("../eventEmitter");
const {
  pickupPackage,
  deliverPackage,
  packagePickup,
  packageDeliver,
} = require("./handler");
const createOrder = require("../eventpool");

// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock("../eventEmitter", () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});

let consoleSpy;

beforeAll(() => {
  consoleSpy = jest.spyOn(console, "log").mockImplementation();
});

afterAll(() => {
  consoleSpy.mockRestore();
});

describe("Driver", () => {
  it("receives a package to deliver", () => {
    const payload = createOrder();

    packagePickup(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith("PACKAGE PICKUP", payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "event",
      "PACKAGE PICKUP",
      payload
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "DRIVER: picked up",
      payload.orderId
    );
  });

  it("delivers the package", () => {
    const payload = createOrder();

    packageDeliver(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "PACKAGE DELIVERED",
      payload
    );
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "event",
      "PACKAGE DELIVERED",
      payload
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "DRIVER: delivered",
      payload.orderId
    );
  });
});
