const Queue = require("./queue");
const createOrder = require("../../clients/createOrder");

describe("Message Queue", () => {
  it("it can create a new queue", () => {
    const queue = new Queue();
    expect(queue).toBeTruthy();
  });
  it("it can store items", () => {
    const queue = new Queue();
    queue.store("order1", createOrder("flower-store"));

    expect(queue.read("order1").store).toEqual("flower-store");
  });
});
