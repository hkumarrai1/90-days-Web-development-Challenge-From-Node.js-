const fs = require("fs");
const dataToWrite = "hey i am gonna change the text of the example.txt";
fs.writeFile("example.txt", dataToWrite, "utf-8", (err) => {
  if (err) throw err;
  return console.log("data write to the file is successfull");
});
