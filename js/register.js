
// Player class

class Player {

    constructor(name, email, age, password) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
    }

    displayDetails() {
        return "Welcome " + this.name + "! Your registration is successful.";
    }
}


// Get form element

const registerForm = document.getElementById("registerForm");


// Form submit event

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values

    const name = document.getElementById("playerName").value.trim();
    const email = document.getElementById("playerEmail").value.trim();
    const age = document.getElementById("playerAge").value.trim();
    const password = document.getElementById("playerPassword").value;

    // Get error elements

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const ageError = document.getElementById("ageError");
    const passwordError = document.getElementById("passwordError");
    const successMessage = document.getElementById("successMessage");

    // Clear old messages

    nameError.textContent = "";
    emailError.textContent = "";
    ageError.textContent = "";
    passwordError.textContent = "";
    successMessage.textContent = "";

    let isValid = true;

    // Name validation using Regex

    const namePattern = /^[A-Za-z ]{3,}$/;

    if (!namePattern.test(name)) {
        nameError.textContent = "Enter a valid name (minimum 3 letters).";
        isValid = false;
    }

    // Email validation using Regex

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    // Age validation

    const playerAge = Number(age);

    if (age === "" || !Number.isInteger(playerAge) ||
        playerAge < 5 || playerAge > 100) {

        ageError.textContent = "Age must be between 5 and 100.";
        isValid = false;
    }

    // Password validation

    if (password.length < 6) {
        passwordError.textContent = "Password must contain at least 6 characters.";
        isValid = false;
    }

    // Create player object if all validations pass

    if (isValid) {

        try {

            const player = new Player(name, email, playerAge, password);

            successMessage.textContent = player.displayDetails();

            console.log(player);

            registerForm.reset();

        } catch (error) {

            successMessage.textContent = "Something went wrong. Please try again.";

            console.log(error);

        }

    }

});
