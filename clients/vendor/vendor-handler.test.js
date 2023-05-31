"use-strict";

const eventEmitter = require("../eventEmitter");
const {
  packageAvailable,
  packageDelivered,
  availablePackage,
  deliveredMessage,
} = require("./handler");
const createOrder = require("../eventpool");

// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock("../eventEmitter.js", () => {
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

describe("Vendor", () => {
  it("receives a package", () => {
    const payload = createOrder();

    availablePackage(payload);
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "PACKAGE AVAILABLE",
      payload
    );
    expect(eventEmitter.emit).toHaveBeenCalledWith(
      "event",
      "PACKAGE AVAILABLE",
      payload
    );
  });

  it("says thank you when package delivered", () => {
    const payload = createOrder();

    deliveredMessage(payload);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Thank you for your order, ",
      payload.customer,
      "!!"
    );
  });
});
