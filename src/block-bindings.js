'use strict';
(function () {

// Let declarations
  function getValue(condition) {

    if (condition) {
      let value = "blue";

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

    let count = 40;
    console.log(count);
    // more code
  }

// Valid constant
  const maxItems = 30;

// Syntax error: missing initialization
// const name;


// Let Declarations in Loops

  var funcs = [];

  for (let i=0; i < 10; i++) {
    funcs.push(function() {
      console.log(i);
    });
  }

  funcs.forEach(function(func) {
    func();     // outputs 0, then 1, then 2, up to 9
  });

})();

