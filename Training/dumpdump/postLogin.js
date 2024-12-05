document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const searchButton = document.querySelector('.submit-btn');
    const usernameSpan = document.getElementById('username');
    const resultsContainer = document.createElement('div');
    resultsContainer.id = 'results-container';
    document.querySelector('main').appendChild(resultsContainer);



    // Store form results in an array
    let employeeData = [];

    searchButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission to keep page from refreshing

        // Get values from form inputs
        const empId = document.getElementById('emp-id').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const dob = document.getElementById('dob').value;
        const grade = document.getElementById('grade').value;

        // Store the result in the employeeData array
        const employee = {
            empId,
            firstName,
            lastName,
            dob,
            grade
        };

        employeeData.push(employee);

        // Call function to display data
        displayResults();
    });

    function displayResults() {
        // Clear previous results
        resultsContainer.innerHTML = '';

        // Create table
        const table = document.createElement('table');
        table.border = '1';

        // Table header
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['Employee ID', 'First Name', 'Last Name', 'Date of Birth', 'Grade'];

        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        // Table body
        const tableBody = document.createElement('tbody');
        employeeData.forEach(employee => {
            const row = document.createElement('tr');
            Object.values(employee).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            tableBody.appendChild(row);
        });

        table.appendChild(tableBody);

        // Append the table to the results container
        resultsContainer.appendChild(table);
    }
});

    const logOutButton = document.getElementById("button");
    logOutButton.addEventListener("click", (event) => {
        logout();
    });

// document.getElementById('username').textContent = username;


function logout() {
    sessionStorage.removeItem("loggedIn");
    window.location.href = "loginPage.html"; // Redirect to login page
}

// Check if the user is already logged out
window.onload = function() {
    if (!sessionStorage.getItem("loggedIn")) {
        window.location.href = "loginPage.html"; // Redirect if not logged in
    }
};

