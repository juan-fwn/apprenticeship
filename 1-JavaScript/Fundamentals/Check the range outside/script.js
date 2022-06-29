const ageInput = prompt("Put your age", 0);

if (!(ageInput >= 14 && ageInput <= 90)) {
    alert("Age is not between 14 and 90 inclusively");
}

if (ageInput < 14 && ageInput > 90) {
    alert("Age is not between 14 and 90 inclusively");
}