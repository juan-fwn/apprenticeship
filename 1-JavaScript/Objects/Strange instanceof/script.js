function A() {}
function B() {}

A.prototype = B.prototype = {};

let a = new A();

alert( a instanceof B ); // true

// Because A.__proto__ = A.prototype = B.prototype