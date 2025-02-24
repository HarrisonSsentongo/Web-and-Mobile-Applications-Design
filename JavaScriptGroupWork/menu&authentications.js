const fs = require('fs');
const readline = require('readline');
const crypto = require('crypto');

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// File to store user credentials
const credentialsFile = "userCredentials.json";

// Function to hash the password
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Function to save user details
function saveUser(username, email, password) {
    const hashedPassword = hashPassword(password);
    const user = { username, email, password: hashedPassword };

    fs.writeFileSync(credentialsFile, JSON.stringify(user, null, 2));
    console.log("User registered successfully!");
}

// Function to validate login
function validateLogin(username, password) {
    if (!fs.existsSync(credentialsFile)) {
        console.log("No registered users. Please register first.");
        return false;
    }

    const userData = JSON.parse(fs.readFileSync(credentialsFile, 'utf-8'));
    if (userData.username === username && userData.password === hashPassword(password)) {
        return true;
    }
    console.log("Invalid username or password.");
    return false;
}

// Function to register a user
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

// Function to log in a user
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

// Function to display the main menu
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

// Function to display the user menu after login
function showUserMenu() {
    console.log("\n1. View Profile\n2. Logout\n3. Exit");
    rl.question("Select an option: ", (choice) => {
        switch (choice) {
            case "1":
                const userData = JSON.parse(fs.readFileSync(credentialsFile, 'utf-8'));
                console.log(`\n--- User Profile ---\nUsername: ${userData.username}\nEmail: ${userData.email}`);
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

// Start the program
showMainMenu();
