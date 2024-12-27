const path = require("path");
console.log("Joined Path", path.join("folder", "path.txt"));
console.log("Absolute Path", path.resolve("folder", "path.txt"));
console.log("Base Name", path.basename("/folder/file.txt"));
console.log("Extension Name", path.extname("file.txt"));
console.log("Dir Name", path.dirname("folder/file.txt"));
console.log("Parsing", path.parse("folder/file.txt"));
