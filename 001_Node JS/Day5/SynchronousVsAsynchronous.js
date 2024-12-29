//synchronous code
console.log("start");
for (let i = 1; i < 5; i++) {
  console.log(i);
}
console.log("End");

//Asynchronous code
console.log("Start");
setTimeout(() => {
  console.log("Inside Timeout");
}, 2000); //execute after 2 seconds
console.log("End");
