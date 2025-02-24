// main.js - Handles user input and menu
import { saveUser, validateLogin, rl } from './auth.js';

// Function to handle user registration
function registerUser() {
    rl.question("Enter username: ", (username) => {
        rl.question("Enter email: ", (email) => {
            rl.question("Enter password: ", (password) => {
                saveUser(username, email, password);
                showMainMenu();
            });
        });
    });
}

// Function to handle user login
function loginUser() {
    rl.question("Enter username: ", (username) => {
        rl.question("Enter password: ", (password) => {
            if (validateLogin(username, password)) {
                console.log("Login successful!");
                showUserMenu();
            } else {
                showMainMenu();
            }
        });
    });
}

// Function to display main menu
function showMainMenu() {
    console.log("\n1. Register\n2. Login\n3. Exit");
    rl.question("Select an option: ", (choice) => {
        switch (choice) {
            case "1":
                registerUser();
                break;
            case "2":
                loginUser();
                break;
            case "3":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice, try again.");
                showMainMenu();
        }
    });
}

// Function to display user menu after login
function showUserMenu() {
    console.log("\n1. View Profile\n2. Logout\n3. Exit");
    rl.question("Select an option: ", (choice) => {
        switch (choice) {
            case "1":
                console.log("Feature not implemented yet.");
                showUserMenu();
                break;
            case "2":
                console.log("Logged out successfully.");
                showMainMenu();
                break;
            case "3":
                console.log("Goodbye!");
                rl.close();
                break;
            default:
                console.log("Invalid choice, try again.");
                showUserMenu();
        }
    });
}

// Start program
showMainMenu();
