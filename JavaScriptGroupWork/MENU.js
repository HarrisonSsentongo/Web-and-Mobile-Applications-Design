const readline=require('readline');
const { saveUser, loadUser }=require('./userStorage'); // Import user storage functions

const rl=readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Hide password input
function askHiddenQuestion(query, callback){
    process.stdout.write(query);
    let password="";
    const stdin=process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf-8");
    stdin.on("data", (char)=>{
        char=char.toString();
        if (char === "\n" || char === "\r") {
            stdin.setRawMode(false);
            console.log("\n");
            stdin.pause();
            callback(password);
        } else if (char === "\u0008" || char === "\x7f") { // Handle backspace
            if (password.length > 0) {
                password = password.slice(0, -1);
                process.stdout.write("\b \b");
            }
        } else {
            password += char;
            process.stdout.write("*");
        }
    });
}

// Register user
function registerUser(callback) {
    rl.question("Enter username: ", (username) => {
        rl.question("Enter email: ", (email) => {
            askHiddenQuestion("Enter password: ", (password) => {
                console.log("\nPassword received.");
                saveUser(username, email, password);
                callback(); // Return to menu
            });
        });
    });
}

// Login user
function loginUser(callback) {
    rl.question("Enter username: ", (username) => {
        askHiddenQuestion("Enter password: ", (password) => {
            console.log("\nPassword received.");
            const userData = loadUser();
            if (userData && userData.username === username && userData.password === password) {
                console.log("Login successful!");
                callback(true);
            } else {
                console.log("Invalid username or password.");
                callback(false);
            }
        });
    });
}

// Export functions to be used in other files
module.exports = { rl, registerUser, loginUser };