const fs = require("fs").promises;
//async await synatx and basic program
async function fileReading() {
  try {
    const data = await fs.readFile("example.txt", "utf-8");
    console.log(data);
    const data2 = await fs.readFile("example2.txt", "utf-8");
    console.log(data2);
  } catch (err) {
    console.error(err);
  }
}
fileReading();
//reading from a api
async function api() {
  const response = await fetch("https://dummyjson.com/test");
  const data = await response.json();
  console.log(data);
}
api();
