// Summary: Defines a Mongoose schema for posts with fields for title, description, and postedBy. 
// postedBy refers to 'User' model.
// Timestamps are added to track the creation and modification times of the document. 
// Schema is then used to create and export a Mongoose model named 'Post'.

const mongoose = require("mongoose");   // Import mongoose: MongoDB library 

// Define Mongoose Schema for Posts
// Create new Mongoose schema named postSchema to define the structure of a post document
const postSchema = new mongoose.Schema({

    // Title, Description, PostedBy Field in Schema
    // Define title, description, postedBy field in schema with a type of String
    // Specify that title, description, postedBy is required with error message if not provided
    title:
    {
        type: String,
        required: [true, "Please add post title"],
    },

    description:
    {
        type: String,
        required: [true, "Please add post description"],
    },

    postedBy:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },

    // Add timestamp to Schema
}, {timestamps: true});

// Export Post Model to interact with MongoDB collection for posts
module.exports = mongoose.model('Post', postSchema);