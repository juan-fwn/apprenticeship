let userNumber = Number(prompt("Put a number greater than 100"));

while (userNumber < 100 && !!userNumber) {
    userNumber = prompt("Try again... Put a number greater than 100");
}