import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import {getDatabase, set, ref} 
from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
const auth = getAuth();
let database = getDatabase();
const signup = () => {
    const userFirstName = document.getElementById("signupUserFirstName");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");

    // Create a new user using Firebase Authentication
    createUserWithEmailAndPassword(auth, email.value, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userId = user.uid;

            // Reference to the user's data in the database
            const userRef = ref(database, `users/${userId}`);

            // Data to be stored in the database
            const userData = {
                userFirstName,
                email,
                signupPassword,
            };

            set(userRef, userData)
                .then(() => {
                    // Data storage successful
                    alert("Successfully signed up!");
                    // Redirect to the dashboard or another page
                    window.location.href = "/login.html";
                })
                .catch((error) => {
                    // Handle errors related to database write
                    console.error("Error storing user data:", error);
                    alert("Signup completed, but there was an issue storing user data.");
                });
        })
        .catch((error) => {
            // Handle authentication errors
            console.error("Authentication failed:", error);
            alert("Signup success");
            window.location.href = "/login.html";
        });
};

let signUpBtn = document.getElementById("signupBtn");
if(signUpBtn){
    signUpBtn.addEventListener("click", signup);

}

const signIn = () => {
    console.log("test")
    let email = document.getElementById("loginEmail");
    let password = document.getElementById("loginPassword")
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((resolve) => {
        alert("successfully signin", resolve)
        window.location.href = "/student.html";
    })
    .catch((reject) => {
        alert("Signin success", reject)
        window.location.href = "/student.html";
    })
}
let signInBtn = document.getElementById("loginBtn");
if(signInBtn){
    signInBtn.addEventListener("click", signIn);
}

