// Summary: to exports a function (connectDB) that connects to a MongoDB database using Mongoose. 
// It logs a success message if the connection is established, 
// and logs an error message if there is any issue during the connection attempt. 
// The exported function can be used elsewhere in the application to initiate the database connection.

const mongoose = require('mongoose');   // Mongoose: library for MongoDB; used to interact with MongoDB in an easier way
const colors = require('colors');       // To color console output

const connectDB = async() => {          //  async: indicates this function contains asynchronous operations, esp MongoDB connection which returns a promise
    
    // Try to connect to MongoDB database using mongoose.connect
    // It awaits the result of the connection attempt as mongoose.connect returns a promise
    // If connection is successful, it logs a message to the console indicating that the connection has established, including the host of the MongoDB database
    try
    {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(
            `Connected to DATEBASE ${mongoose.connection.host}`.bgCyan.white
        );
    }

    // Handle Connection Errors
    // It logs an error message to the console, including details about the error
    catch (error)
    {
        console.log(`Error in DATABASE Connection ${error}`.bgRed.white);
    }
};

// Export connectDB that connects to MongoDB using Mongoose
module.exports = connectDB;