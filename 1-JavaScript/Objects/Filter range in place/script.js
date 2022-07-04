let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4

alert( arr ); // [3, 1]

function filterRangeInPlace(array, min, max) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] < min || array[i] > max) {
      array.splice(i, 1);
    }
  }
}