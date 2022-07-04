/* .. your code for inBetween and inArray */
function inBetween(minValue, maxValue) {
  return function filterAux(value) {
    return value <= maxValue && value >= minValue;
  }
}

function inArray([...values]) {
  return function filterAux(value) {
    return values.includes(value);
  }
}

let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2