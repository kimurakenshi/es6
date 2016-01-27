"use strict";

function blockScope(create) {
  if (create) {
    var _myVar = 12;
  }
  console.log(myVar);
}

blockScope(false);
blockScope(true);