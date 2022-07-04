let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (no changes)

function copySorted(array) {
  const copy = [...array];

  copy.sort((a, b) => a.localeCompare(b));

  return copy;
}