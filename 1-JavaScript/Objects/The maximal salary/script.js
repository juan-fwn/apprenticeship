let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

function topSalary(salaries) {
  let higherSalary = 0;
  let topPaidPerson = null;

  for (const [name, salary] of Object.entries(salaries)) {
    if (higherSalary < salary) {
      topPaidPerson = name;
      higherSalary = salary;
    }
  }

  return topPaidPerson;
}

alert(topSalary(salaries));
