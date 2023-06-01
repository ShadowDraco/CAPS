"use-strict";

const socket = require("../socket");
const createOrder = require("../createOrder");

const {
  packageAvailable,
  packageDelivered,
  availablePackage,
  deliveredMessage,
} = require("./handler");

// to mock, first require in (see above eventEmitter) they take it over with a mock
jest.mock("../socket.js", () => {
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

    availablePackage(payload, socket);
    expect(socket.emit).toHaveBeenCalledWith("PACKAGE AVAILABLE", payload);
    expect(socket.emit).toHaveBeenCalledWith("PACKAGE AVAILABLE", payload);
  });

  it("says thank you when package delivered", () => {
    const payload = createOrder();

    deliveredMessage(payload, socket);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Thank you for your order, ",
      payload.customer,
      "!!"
    );
  });
});
