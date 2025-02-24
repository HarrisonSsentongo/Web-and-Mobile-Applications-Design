const { rl, registerUser, loginUser } = require('./authentications'); // Import authentication functions
const { loadUser } = require('./json'); // Import function to load user data

// Function to display the main menu
function showMainMenu() {
    console.log("\n1. Register\n2. Login\n3. Exit");
    rl.question("Select an option: ", (choice) => {
        switch (choice) {
            case "1":
                registerUser(showMainMenu); // Return to main menu after registration
                break;
            case "2":
                loginUser((isLoggedIn) => {
                    if (isLoggedIn) {
                        showUserMenu(); // Go to user menu on successful login
                    } else {
                        showMainMenu();
                    }
                });
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
                const userData = loadUser();
                if (userData) {
                    console.log(`\n---User Profile---\nUsername: ${userData.username}\nEmail: ${userData.email}`);
                } else {
                    console.log("No user data found.");
                }
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

// Start the application
showMainMenu();
