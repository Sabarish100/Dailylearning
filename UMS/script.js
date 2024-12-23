const API_URL = "https://dummyjson.com/users";
 
let currentUser = null;
 
// DOM Elements
const loginSection = document.querySelector(".login");
const dashboard = document.querySelector(".dashboard");
const roleSpan = document.getElementById("role");
const userTable = document.getElementById("user-table");
const adminActions = document.getElementById("admin-actions");
const createUserBtn = document.getElementById("create-user-btn");
 
// Login Functionality
document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
 
  // Mock login logic
  if (username === "admin" && password === "admin") {
    currentUser = { role: "admin" };
    loginSuccess();
  } else if (username === "user" && password === "user") {
    currentUser = { role: "user" };
    loginSuccess();
  } else {
    alert("Invalid credentials");
  }
});
 
// Logout Functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  currentUser = null;
  dashboard.classList.add("hidden");
  loginSection.classList.remove("hidden");
});
 
// Login Success
function loginSuccess() {
  roleSpan.textContent = currentUser.role;
  loginSection.classList.add("hidden");
  dashboard.classList.remove("hidden");
  loadUsers();
 
  if (currentUser.role === "admin") {
    adminActions.classList.remove("hidden");
  } else {
    adminActions.classList.add("hidden");
  }
}
 
// Load Users
async function loadUsers() {
    try{
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        renderUsers(data.users);
    }catch(error){
        console.error("Error loading users:",error);
        alert("Failed to load users.")
    }  
}
 
 
// Delete User
async function deleteUser(userId) {
  if (confirm("Are you sure you want to delete this user?")) {
    await fetch(`${API_URL}/${userId}`, { method: "DELETE" });
    loadUsers();
  }
}
 
 
// Create New User (Admin only)
createUserBtn.addEventListener("click", async () => {
  const name = prompt("Enter user full name:");
  const email = prompt("Enter user email:");
  if (name && email) {
    const [firstName, lastName] = name.split(" ");
    await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    });
    loadUsers();
  }
});
 
function renderUsers(users) {
    userTable.innerHTML = ""; // Clear the table
    
    users.forEach(user => {
      const row = document.createElement("tr");
      
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.firstName} ${user.lastName}</td>
        <td>${user.email}</td>
        <td>
          ${
            currentUser.role === "admin"
              ? `<button onclick="deleteUser(${user.id})">Delete</button>`
              : ''
          }
              <button onclick="updateUser(${user.id})">Update</button>
        </td>
      `;
      
      userTable.appendChild(row); // Append row to the table body
    });
  }
  
 
 
// Update User
async function updateUser(userId) {
  const newName = prompt("Enter new name:");
  if (newName) {
    const [firstName, lastName] = newName.split(" ");
    await fetch(`${API_URL}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    });
    loadUsers();
  }
}
 
// Create New User (Admin only)
createUserBtn.addEventListener("click", async () => {
  const name = prompt("Enter user full name:");
  const email = prompt("Enter user email:");
  if (name && email) {
    const [firstName, lastName] = name.split(" ");
    await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    });
    loadUsers();
  }
});