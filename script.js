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

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDS6uw6xr5jEXKq7S_g99axbud79DCv8co",
    authDomain: "ahhhhh-bf359.firebaseapp.com",
    projectId: "ahhhhh-bf359",
    storageBucket: "ahhhhh-bf359.firebasestorage.app",
    messagingSenderId: "1098708920968",
    appId: "1:1098708920968:web:2c6d309862396b9bf10d3d",
    measurementId: "G-L7BNRCZ330"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
