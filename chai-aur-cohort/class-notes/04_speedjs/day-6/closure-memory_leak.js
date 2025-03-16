let fname = "John";

function sayName() {
  let mname = "Doe";

  return function inner() {
    let lname = "Smith";

    function inner() {
      console.log(`${fname} ${mname} ${lname}`);
    }

    inner();
  };
}

let sayNameInner = sayName();
sayNameInner();
sayNameInner();
sayNameInner();
sayNameInner();
//no more future calls to sayNameInner
sayNameInner = null; // declare it as null to avoid Memory leak
