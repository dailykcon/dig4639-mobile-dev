var Adder = require("./Adder.js");
var adderInstance = new Adder();
var input = {
    a: 10,
    b: 5,
};

var adderInstance = new Adder(input);


console.log(adderInstance.render());