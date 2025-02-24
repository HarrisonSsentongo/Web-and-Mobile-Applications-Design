const fs = require('fs');

const credentialsFile="userCredentials.json"; // File where user data is stored

//Function to save user data
function saveUser(username, email, password){
    const user={username, email, password };
    fs.writeFileSync(credentialsFile, JSON.stringify(user, null, 2));
    console.log("User registered successfully!");
}

// Function to load user data
function loadUser(){
    if (!fs.existsSync(credentialsFile)){
        return null;
    }
    return JSON.parse(fs.readFileSync(credentialsFile, 'utf-8'));
}

//Export functions to be used in other files
module.exports={saveUser, loadUser};
