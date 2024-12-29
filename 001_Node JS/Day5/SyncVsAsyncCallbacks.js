// //Synchronous Callbacks
// function greet(name, callback) {
//   callback(name);
// }
// greet("harsh", function (name) {
//   console.log(`${name}`);
// });
//Asynchronous callbacks
setTimeout(() => {
  console.log("this call after 2 seconds");
}, 2000);
console.log("this calls first");
