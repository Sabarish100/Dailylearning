document.addEventListener("DOMContentLoaded", () => {
    const logButton = document.getElementsByClassName("submit-btn")[0]; // Access the first button
    logButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        login();
    });

    
    function login() {
        const username = document.getElementById("userid").value;
        const password = document.getElementById("password").value;
        console.log(username, password);

        // Simple hardcoded validation
        if (username === "sab" && password === "sab") {
            sessionStorage.setItem("loggedIn", "true");
            document.location = "index.html"; // Redirect to another page

        } else {
            document.getElementById("error").textContent = "Invalid username or password.";
        }
    };
});

