let user = { name: "John", years: 30 };

// your code to the left side:
const { name, years: age, isAdmin = false } = user;

alert(name); // John
alert(age); // 30
alert(isAdmin); // false
