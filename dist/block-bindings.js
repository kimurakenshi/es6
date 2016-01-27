"use strict";

// Let declarations
function getValue(condition) {

  if (condition) {
    var value = "blue";

    // other code

    return value;
  } else {

    // value doesn't exist here

    return null;
  }

  // value doesn't exist here
}

var count = 30;

// Does not throw an error
if (count > 0) {

  var _count = 40;

  // more code
}

// Valid constant
var maxItems = 30;

// Syntax error: missing initialization
// const name;

// Let Declarations in Loops

var funcs = [];

var _loop = function _loop(i) {
  funcs.push(function () {
    console.log(i);
  });
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}

funcs.forEach(function (func) {
  func(); // outputs 0, then 1, then 2, up to 9
});