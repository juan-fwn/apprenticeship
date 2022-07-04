function printNumbers(from, to) {
  let number = from;

  const timer = setInterval(() => {
    if (number === to) clearInterval(timer);
    console.log(number);
    number++;
  }, 1000);
}

// printNumbers(5, 10);

function printNumbers(from, to) {
  let number = from;
  setTimeout(function printNumberAux() {
    console.log(number);
    number++;
    if (number <= to) setTimeout(printNumberAux, 1000);
  }, 1000);
}

printNumbers(4, 9);
