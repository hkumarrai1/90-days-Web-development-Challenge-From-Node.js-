//Basic Promise syntax
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("Operation successfull");
  } else {
    reject("Operation Unsuccessfull");
  }
});
myPromise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
//reading file using promises Api
const fs = require("fs").promises;

fs.readFile(`example.txt`, "utf-8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.err(err);
  });
//chaining process
fs.readFile("example.txt", "utf-8")
  .then((data) => {
    console.log(data);
    return fs.readFile("example2.txt", "utf-8");
  })
  .then((data1) => {
    console.log(data1);
    return fs.readFile("example3.txt", "utf-8");
  })
  .then((data2) => {
    console.log(data2);
  });
//  .catch((err) => {
//   console.error(err);
// });
