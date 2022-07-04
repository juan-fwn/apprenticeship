function sumTo1(n) {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}
function sumTo2(n) {
  if (n === 1) {
    return 1;
  } else {
    return n + sumTo2(n - 1)
  }
}
function sumTo3(n) {
  return n * (n + 1) / 2;
}

alert( sumTo1(100) ); // 5050
alert( sumTo2(100) ); // 5050
alert( sumTo3(100) ); // 5050