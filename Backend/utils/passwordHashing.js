const bcrypt = require("bcrypt");

exports.passwordHash = async (password) => {
    try {
        const SALT = 10;

        let hashedPassword = await bcrypt.hash(password, SALT);
        
        return hashedPassword;
    } catch(err) {
        console.log("Error during password hashing", err);
        return 0;
    }
}

exports.matchPassword = async (password, hashedPassword) => {
    try {
        const flag = await bcrypt.compare(password, hashedPassword);

        if (flag) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
        console.log("Error in comparing passwords", err);
    }
}