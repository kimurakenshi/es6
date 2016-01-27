
function blockScope(create) {
  if (create) {
    let myVar = 12;
  }
  console.log(myVar);
}

blockScope(false);
blockScope(true);

