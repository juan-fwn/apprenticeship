function unique(arr) {
  const set = new Set();

  arr.forEach((element) => set.add(element));

  const arrayResult = [];

  for (let element of set) {
    arrayResult.push(element);
  }

  return arrayResult;
}

let strings = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(strings) ); // Hare, Krishna, :-O