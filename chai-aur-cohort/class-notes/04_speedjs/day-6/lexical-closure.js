let fname = "Piyush";

function sayName() {
    let lname = "Garg";
    
    function closureFunction() {
        console.log(`Hello ${fname} ${lname}`);
    }

    closureFunction();
}

sayName(); // Hello Piyush Garg