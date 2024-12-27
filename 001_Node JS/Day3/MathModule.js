//creating a module for basic operations of math
const PI = 3.14;
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function division(a, b) {
  return a / b;
}
function areaOfCircle(radius) {
  return 2 * PI * radius * radius;
}
module.exports = { add, subtract, multiply, division, areaOfCircle, PI };
