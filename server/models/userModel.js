// Summary: Defines a Mongoose schema for users with fields for name, email, password, and role. 
// The schema also includes timestamps for tracking the creation and modification times of the document. 
// The schema is then used to create and export a Mongoose model named 'User'.

const mongoose = require('mongoose');   // Mongoose: library for MongoDB

// Define Mongoose Schema for Users
// Create new Mongoose schema named userSchema to define the structure of a user document
const userSchema = new mongoose.Schema(
    {
        // Title, Description, Password Field in Schema
        // Define title, description, password field in schema with a type of String
        // Specify that title, description, password is required with error message if not provided
        name:
        {
            type: String,
            required: [true, "Please Add Name"],
            trim: true,
        },

        email:
        {
            type: String,
            required: [true, "Please Add Email"],
            unique: true,
            trim: true,
        },

        password:
        {
            type: String,
            required: [true, "Please Add Password"],
            min: 6,
            max: 64,
        },

        role:
        {
            type: String,
            default: "user",
        },
        
        // Add timestamp to Schema
    }, { timestamps: true });

// Export User Model to interact with MongoDB collection for users
module.exports = mongoose.model("User", userSchema);