const url = require("url");
const parsedUrl = url.parse(
  "https://www.example.com:8080/pathname?search=test#hash"
);
console.log(parsedUrl);
const urlObject = {
  protocol: "https:",
  hostname: "www.example.com",
  port: 8080,
  pathname: "/pathname",
  search: "?search=test",
  hash: "#hash",
};
const formattedUrl = url.format(urlObject);
console.log(formattedUrl);
const baseUrl = "https://www.example.com/pathname/";
const relativeUrl = "page.html";
const resolvedUrl = url.resolve(baseUrl, relativeUrl);
console.log(resolvedUrl);
