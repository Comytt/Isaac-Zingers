// Predefined correct password
const correctPassword = "fortnite"; // Change this to your password

let counter = 0;

// Check password function
function checkPassword() {
    const inputPassword = document.getElementById('password-input').value;

    if (inputPassword === correctPassword) {
        document.getElementById('password-section').classList.add('hidden');
        document.getElementById('counter-section').classList.remove('hidden');
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Increment counter function
function incrementCounter() {
    counter++;
    document.getElementById('counter-value').textContent = counter;
}
