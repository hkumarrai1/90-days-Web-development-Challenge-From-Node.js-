//using the eventemitter
const EventEmiter = require("events");
const EventListener = new EventEmiter();
EventListener.on("greet", (name) => {
  console.log(`hey my name is ${name}`);
});
EventListener.emit("greet", "harsh kumar rai");
//chaning the multiple event emitter
const EventListener2 = new EventEmiter();
EventListener2.on("start", () => {
  console.log("the process is starting");
  EventListener2.emit("process");
});
EventListener2.on("process", () => {
  console.log("the data is processed");
  EventListener2.emit("end");
});
EventListener2.on("end", () => {
  console.log("the process is end");
});
EventListener2.emit("start");
//passing more than one parameters to callback
EventListener.on("order", (order, clientId) => {
  console.log(`your order is ${order} and client id is ${clientId}`);
});
EventListener.emit("order", "order", 9);
//handling errors
EventListener.on("error", (err) => {
  console.log(`Error detected:${err.message}`);
});
EventListener.emit("error", new Error("something went wrong"));
//emiting only once
EventListener.once("init", () => {
  console.log(`this will only run once`);
});
EventListener.emit("init");
EventListener.emit("init"); //if you try again than its not run
//off the event emitting
const callback = () => {
  console.log("this is the example of how you off the listener");
};
EventListener.on("offing", callback);
EventListener.emit("offing");
EventListener.off("offing", callback); //this will off the emitter
EventListener.emit("init"); //this will give error if again try to emit
