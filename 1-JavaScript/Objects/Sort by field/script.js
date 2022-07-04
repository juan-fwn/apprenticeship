let users = [
  { name: "John", age: 20, surname: "Johnson" },
  { name: "Pete", age: 18, surname: "Peterson" },
  { name: "Ann", age: 19, surname: "Hathaway" },
];

function byField(propertyName) {
  return function (value1, value2) {
    return value1[propertyName] < value2[propertyName] ? -1 : 1;
  };
}

console.log(users.sort(byField("name")));
// console.log(users.sort(byField("age")));
