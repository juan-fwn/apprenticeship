let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert(filtered); // 3,1 (matching values)

alert(arr); // 5,3,8,1 (not modified)

function filterRange(array, min, max) {
  const filteredArray = array.filter(
    (element) => element >= min && element <= max
  );

  return filteredArray;
}
