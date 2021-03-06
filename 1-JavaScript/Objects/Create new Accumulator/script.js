let accumulator = new Accumulator(1); // initial value 1

accumulator.read(); // adds the user-entered value
accumulator.read(); // adds the user-entered value

alert(accumulator.value); // shows the sum of these values

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function() {
    const newValue = Number(prompt("Put a new value", 0));
    this.value += newValue;
  }
}