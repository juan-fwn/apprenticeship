const rangerNumberInput = prompt("Insert n of range");
const numbersToBeOutPut = [];

for (let i = 2; i <= rangerNumberInput; i++) {
    let isPrime = true;
    let aux = 2;
    while (isPrime && aux < i) {
        if (i % aux === 0) isPrime = false;
        aux++;
    }
    aux = 2;

    if (isPrime) numbersToBeOutPut.push(i);
}

console.log(numbersToBeOutPut);