// Sample Employee Data
const employees = [
    { id: "50003", firstName: "Vijay", lastName: "V", dob: "11/11/2002", doj: "22/02/2022", grade: "M3" },
    { id: "50000", firstName: "Tanmayi", lastName: "S", dob: "19/12/2222", doj: "21/02/2019", grade: "M1" },
    { id: "50001", firstName: "Aditya", lastName: "M", dob: "5/10/2001", doj: "10/10/2020", grade: "M2" },
    { id: "50002", firstName: "Vijay", lastName: "S", dob: "13/05/2005", doj: "22/02/2022", grade: "M3" },
    { id: "50004", firstName: "Prathick", lastName: "B", dob: "09/04/2001", doj: "22/06/2010", grade: "M1" },
    { id: "50005", firstName: "Aditya", lastName: "T", dob: "10/01/2000", doj: "10/10/2010", grade: "M2" },
    { id: "50006", firstName: "Vijay", lastName: "K", dob: "06/11/2003", doj: "22/02/20019", grade: "M3" },
    { id: "50007", firstName: "Adithya", lastName: "M", dob: "22/07/2002", doj: "01/12/2018", grade: "M1" },
    { id: "50008", firstName: "Aditya", lastName: "K", dob: "11/11/2000", doj: "10/10/2019", grade: "M2" },
];

// Event Listener for Search Button
document.getElementById("search-button").addEventListener("click", () => {
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
});

// Function to Display Results
function displayResults(results) {
    const tableBody = document.querySelector("#results-table tbody");
    tableBody.innerHTML = "";

    if (results.length === 0) {
        alert("No matching employees found.");
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
            <td><button class="view-btn" data-id="${emp.id}">View</button></td>
            <td><button class="modify-btn" data-id="${emp.id}">Modify</button></td>
        `;
        tableBody.appendChild(row);
    });

    document.getElementById("results-section").style.display = "block";

    // Attach event listeners to buttons after the table is populated
    attachViewButtons();
    attachModifyButtons();
}

// Function to Attach Event Listeners to View Buttons
function attachViewButtons() {
    console.log("Attaching View and Modify buttons...");
    const viewButtons = document.querySelectorAll(".view-btn");
    viewButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log("View button clicked!"); // Debugging line
            const empId = btn.dataset.id;
            const employee = employees.find((emp) => emp.id === empId);
            showDialog("view", employee);
        });
    });
}

// Function to Attach Event Listeners to Modify Buttons
function attachModifyButtons() {
    console.log("Attaching View and Modify buttons...");
    const modifyButtons = document.querySelectorAll(".modify-btn");
    modifyButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            console.log("Modify button clicked!"); // Debugging line
            const empId = btn.dataset.id;
            const employee = employees.find((emp) => emp.id === empId);
            showDialog("modify", employee);
        });
    });
}

// Function to Show Dialog
function showDialog(type, employee) {
    console.log("Dialog is opening..."); // Debugging line

    const dialog = document.createElement("div");
    dialog.classList.add("dialog-box");

    if (type === "view") {
        dialog.innerHTML = `
            <h3>Employee Details</h3>
            <p><strong>Employee ID:</strong> ${employee.id}</p>
            <p><strong>First Name:</strong> ${employee.firstName}</p>
            <p><strong>Last Name:</strong> ${employee.lastName}</p>
            <p><strong>Date of Birth:</strong> ${employee.dob}</p>
            <p><strong>Date of Joining:</strong> ${employee.doj}</p>
            <p><strong>Grade:</strong> ${employee.grade}</p>
            <button id="close-view">Close</button>
        `;
    } else if (type === "modify") {
        dialog.innerHTML = `
            <h3>Modify Employee Details</h3>
            <label>First Name: <input type="text" id="edit-firstName" value="${employee.firstName}"></label>
            <label>Last Name: <input type="text" id="edit-lastName" value="${employee.lastName}"></label>
            <label>Date of Birth: <input type="date" id="edit-dob" value="${employee.dob}"></label>
            <label>Date of Joining: <input type="date" id="edit-doj" value="${employee.doj}"></label>
            <label>Grade: 
                <select id="edit-grade">
                    <option value="M1" ${employee.grade === "M1" ? "selected" : ""}>M1</option>
                    <option value="M2" ${employee.grade === "M2" ? "selected" : ""}>M2</option>
                    <option value="M3" ${employee.grade === "M3" ? "selected" : ""}>M3</option>
                </select>
            </label>
            <button id="save-changes">Save Changes</button>
            <button id="close-modify">Close</button>
        `;
        
        dialog.querySelector("#save-changes").addEventListener("click", () => {
            employee.firstName = document.getElementById("edit-firstName").value.trim();
            employee.lastName = document.getElementById("edit-lastName").value.trim();
            employee.dob = document.getElementById("edit-dob").value;
            employee.doj = document.getElementById("edit-doj").value;
            employee.grade = document.getElementById("edit-grade").value;

            alert("Changes saved successfully!");
            document.body.removeChild(dialog);
            displayResults(employees); // Refresh results
        });
    }

    // Close Dialog
    dialog.querySelector(type === "view" ? "#close-view" : "#close-modify").addEventListener("click", () => {
        document.body.removeChild(dialog);
    });

    document.body.appendChild(dialog);
}
