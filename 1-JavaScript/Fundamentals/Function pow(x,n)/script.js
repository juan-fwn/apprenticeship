function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

const x = prompt("Put a number as base");
const n = prompt("Put a number as exponent");

if (n <= 1) {
    alert("Exponent must be greater than 1");
} else {
    alert(pow(x, n));
}