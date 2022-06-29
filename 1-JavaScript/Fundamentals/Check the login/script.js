const userInput = prompt("Who's there?");
let passwordInput = null;

if (userInput === "Admin") {
    passwordInput = prompt("Password?");
    if (passwordInput === "TheMaster") {
        alert("Welcome!")
    } else if (passwordInput !== "Admin" && !!passwordInput) {
        alert("Wrong password");
    } else {
        alert("Canceled");
    }   
} else if (userInput !== "Admin" && !!userInput) {
    alert("I don't know you");
} else {
    alert("Canceled");
}