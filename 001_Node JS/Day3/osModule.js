const os = require("os");
console.log("Computer Architecture", os.arch());
console.log("Platform", os.platform());
console.log("CPUs", os.cpus());
console.log("Free Memory", os.freemem());
console.log("Total Memory", os.totalmem());
console.log("uptime", os.uptime());
console.log("Home directory", os.homedir());
