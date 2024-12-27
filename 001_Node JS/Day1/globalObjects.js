//UnderStanding Global Objects
const unserstandingSetTimeOut = setTimeout(() => {
  console.log("this message is shows after 1 seconds");
}, 1000);
const understandingSetInterval = setInterval(() => {
  console.log("this function is plyed after 1 second repeatedly for 5 seconds");
}, 1000);
setTimeout(() => {
  clearInterval(understandingSetInterval);
  console.log("this function will stopped after 5 seconds");
}, 5000);
