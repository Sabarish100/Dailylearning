// Sample Employee Data
const employees = [
    { id: "50003", firstName: "Vijay", lastName: "V", dob: "2002-06-05", doj: "2017-06-21", grade: "M3" },
    { id: "50000", firstName: "Tanmayi", lastName: "S", dob: "2001-07-04", doj: "2015-06-22", grade: "M1" },
    { id: "50001", firstName: "Aditya", lastName: "M", dob: "2002-03-22", doj: "2014-06-05", grade: "M2" },
    { id: "50002", firstName: "Vijay", lastName: "S", dob: "2002-04-03", doj: "2011-06-25", grade: "M3" },
    { id: "50004", firstName: "Prathick", lastName: "B", dob: "2002-07-07", doj: "2013-06-12", grade: "M1" },
    { id: "50005", firstName: "Aditya", lastName: "T", dob: "2002-05-14", doj: "2019-06-15", grade: "M2" },
    { id: "50006", firstName: "Vijay", lastName: "K", dob: "2002-09-18", doj: "2020-06-17", grade: "M3" },
    { id: "50007", firstName: "Adithya", lastName: "M", dob: "2002-11-21", doj: "2022-06-02", grade: "M1" },
    { id: "50008", firstName: "Aditya", lastName: "K", dob: "2002-10-25", doj: "2018-06-01", grade: "M2" },
];

// Global variable to track current operation (search or modify)
let currentEmployeeId = null;

// Event Listener for Search Button
document.getElementById("search-button").addEventListener("click", () => {
    if (currentEmployeeId) {
        // Modify operation
        modifyEmployee();
    } else {
        // Search operation
        searchEmployee();
    }
});

// Function to Search Employees
function searchEmployee() {
    const id = document.getElementById("empId").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value;
    const doj = document.getElementById("doj").value;
    const grade = document.getElementById("grade").value;

    // Filter Employees
    const results = employees.filter((emp) => {
        return (
            (id === "" || emp.id === id) &&
            (firstName === "" || emp.firstName.toLowerCase().includes(firstName.toLowerCase())) &&
            (lastName === "" || emp.lastName.toLowerCase().includes(lastName.toLowerCase())) &&
            (dob === "" || emp.dob === dob) &&
            (doj === "" || emp.doj === doj) &&
            (grade === "" || emp.grade === grade)
        );
    });
    displayResults(results);
}

// Function to Display Results
function displayResults(results) {
    const tableBody = document.querySelector("#results-table tbody");
    tableBody.innerHTML = "";

    if (results.length === 0) {
        showMessage("No matching employees found.");
        return;
    }

    results.forEach((emp) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.firstName}</td>
            <td>${emp.lastName}</td>
            <td>${emp.dob}</td>
            <td>${emp.doj}</td>
            <td>${emp.grade}</td>
            <td><button class="modify-btn" data-id="${emp.id}">Modify</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("results-section").style.display = "block";
    attachModifyButtons(); // Attach event listeners to modify buttons
}

// Function to Attach Event Listeners to Modify Buttons
function attachModifyButtons() {
    const modifyButtons = document.querySelectorAll(".modify-btn");
    modifyButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const empId = btn.dataset.id;
            const employee = employees.find((emp) => emp.id === empId);
            loadEmployeeIntoForm(employee);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
}

// Function to Load Employee Details into the Form for Modification

function loadEmployeeIntoForm(employee) {
    document.getElementById("empId").value = employee.id;
    document.getElementById("empId").disabled = true; // Disable the Employee ID field

    document.getElementById("firstName").value = employee.firstName;
    document.getElementById("lastName").value = employee.lastName;
    document.getElementById("dob").value = employee.dob;
    document.getElementById("doj").value = employee.doj;
    document.getElementById("grade").value = employee.grade;

    currentEmployeeId = employee.id; // Set currentEmployeeId to track the employee being modified
    document.getElementById("search-button").textContent = "Modify"; // Change button text to Modify
}


// Function to Modify Employee Details
function modifyEmployee() {
    const id = currentEmployeeId;
    const employee = employees.find((emp) => emp.id === id);

    employee.firstName = document.getElementById("firstName").value.trim();
    employee.lastName = document.getElementById("lastName").value.trim();
    employee.dob = document.getElementById("dob").value;
    employee.doj = document.getElementById("doj").value;
    employee.grade = document.getElementById("grade").value;

    showMessage("Changes saved successfully!");

    displayResults(employees); // Refresh results
    resetForm();
}


function resetForm() {
    document.getElementById("empId").value = "";
    document.getElementById("empId").disabled = false; // Re-enable the Employee ID field
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("dob").value = "";
    document.getElementById("doj").value = "";
    document.getElementById("grade").value = "";

    currentEmployeeId = null; // Clear the currentEmployeeId
    document.getElementById("search-button").textContent = "Search"; // Reset button text to Search
}

function showMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.innerText = message;
    messageDiv.style.display = "block";
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 3000);
}

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