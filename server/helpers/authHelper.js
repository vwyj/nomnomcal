// Summary: Provides two functions for password-related operations using the bcrypt library
// hashPassword function: takes a plain password, generates a salt, then hashes the password using the salt. 
// comparePassword function: takes a plain password and a hashed password, then returns a promise that resolves to true 
// if the passwords match and false otherwise. The use of promises allows these operations to be handled asynchronously.

const bcrypt = require('bcrypt');   // bcrypt library: used for password hashing and salting

// HASH FUNCTION
exports.hashPassword = (password) => {

    // Using Promise to hash password
    // Returns a new Promise to handle the asynchronous nature of the bcrypt functions
    return new Promise((resolve, reject) => {
        // Generate Salt
        // Call bcrypt.genSalt to generate salt with cost factor of 10
        // The higher the cost factor, the more computational effort needed to hash the password
        // If there's an error generating the salt, the promise is rejected with the error
        bcrypt.genSalt(10, (err, salt) => {
            if(err)
            {
                reject(err);
            }
            // Hashing Password Using Salt
            // Call bcrypt.hash to hash the provided password using the generated salt
            // If there's an error hashing the password, the promise is rejected with the error
            // Otherwise, the promise is resolved with the hashed password
            bcrypt.hash(password, salt, (err, hash) => {
                if(err)
                {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// COMPARE || DECRYPT FUNCTION
// Export function comparePassword that takes a password and a hashed password as arguments
// Call bcrypt.compare to compare the provided password with the hashed password
// Returns a promise that resolves to true if the passwords match and false otherwise
exports.comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};





