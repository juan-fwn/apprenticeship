class Calculator {
  operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  }

  calculate(operation) {
    const [a, operator, b] = operation.split(" ");

    if (!this.operations[operator] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    const operatorFunction = this.operations[operator];

    return operatorFunction(Number(a), Number(b));
  }

  addMethod(operator, functionAux) {
    this.operations[operator] = functionAux;
  }
}

let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10
alert( calc.calculate("10 - 7") ); // 3

// let powerCalc = new Calculator;
calc.addMethod("*", (a, b) => a * b);
calc.addMethod("/", (a, b) => a / b);
calc.addMethod("**", (a, b) => a ** b);

let result = calc.calculate("2 ** 3");
alert( result ); // 8