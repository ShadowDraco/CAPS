"use-strict";

const socket = require("../test-socket");
const createOrder = require("../createOrder");
const {
  pickupPackage,
  deliverPackage,
  packagePickup,
  packageDeliver,
} = require("./handler");

// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock("../test-socket.js", () => {
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

    packagePickup(payload, socket);
    expect(socket.emit).toHaveBeenCalledWith("PACKAGE PICKUP", payload);
    expect(socket.emit).toHaveBeenCalledWith("PACKAGE PICKUP", payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      "DRIVER: picked up",
      payload.orderId
    );
  });

  it("delivers the package", () => {
    const payload = createOrder();

    packageDeliver(payload, socket);
    expect(socket.emit).toHaveBeenCalledWith("PACKAGE DELIVERED", payload);
    expect(socket.emit).toHaveBeenCalledWith("PACKAGE DELIVERED", payload);

    expect(consoleSpy).toHaveBeenCalledWith(
      "DRIVER: delivered",
      payload.orderId
    );
  });
});
