let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() );

function Calculator() {
  this.read = function() {
    this.a = Number(prompt("Put value a", 0));
    this.b = Number(prompt("Put value b", 0));
  }
  this.sum = function() {
    return this.a + this.b;
  }
  this.mul = function() {
    return this.a * this.b;
  }
}