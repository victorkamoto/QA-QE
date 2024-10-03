const EventEmitter = require("events");
const LogEvents = require("./LogEvents");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("logEvent", async (message) => {
  await LogEvents(message);
  console.log("Log event processed:", message);
});

// Emit the log event after 2 seconds
setTimeout(() => {
  myEmitter.emit("logEvent", "New log event emitted");
}, 2000);
