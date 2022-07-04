alert(sum(1)(2) == 3);
alert(sum(5)(-1) == 4);

function sum(number1) {
  return function sumInt(number2) {
    return number1 + number2;
  }
}