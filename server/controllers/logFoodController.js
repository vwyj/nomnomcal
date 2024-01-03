const logFoodModel = require("../models/logFoodModel");   // Import diaryModel which contains Mongoose for diary
                        // is used to interact with the MongoDB database collection associated with diaries
const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users
var { expressjwt: jwt } =  require('express-jwt');  //  express-jwt: used for verifying JWTs in Express.js middleware


// Middleware Authentication
// Configure a middleware requireSignIn using express-jwt
// This middleware is designed to ensure that incoming requests have a valid JWT in the "Authorization" header
// It uses the JWT secret from the environment variable JWT_SECRET and specifies the HMAC SHA-256 algorithm
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"],
});


// Create logBreakfast
// Declares an asynchronous function createLogBreakfastController that takes two parameters: req (request) and res (response)
const createLogBreakfastController = async (req, res) => {   
    try                                             
    {
        // Destructures mealB, breakfast, caloriesBreakfast from the request body (req.body)
        // Validate whether mealB, breakfast, caloriesBreakfast are present in the request body
        // If any is missing, it sends a 500 status response with a failure message
        const { mealB, breakfast, caloriesBreakfast, dateToDb } = req.body
        if ( !mealB || !breakfast || !caloriesBreakfast || !dateToDb )
        {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        // Creates a new log instance using the logFoodModel with user-provided  mealB,breakfast,caloriesBreakfast,dateToDb,id
        // Call save method to save log to database; Result is assigned to the variable logFood
        const logFood = await logFoodModel({
            mealB,
            breakfast,
            caloriesBreakfast,
            dateToDb,
            postedBy: req.auth._id
        }).save();

        // Send 201 status response indicating successful creation
        // Send success message and include created logFood in response body
        // Log entire request object to console
        res.status(201).send({
            success: true,
            message: 'logFood Created Successfully',
            logFood,
        });
        console.log(req)
    }

    // Logs the error to the console
    // Send a 500 status response with a failure message and includes the error details in the response body
    catch (error) {
        console.error(error);
        res.status(500).json({
           success: false,
           message: 'Internal Server Error',
           error: error.message,
        });
     }
};


// Create logLunch
// Declares an asynchronous function createLogLunchController that takes two parameters: req (request) and res (response)
const createLogLunchController = async (req, res) => {   
    try                                             
    {
        // Destructures mealL, lunch, caloriesLunch  from the request body (req.body)
        // Validate whether mealL, lunch, caloriesLunch, dateToDb are present in the request body
        // If any is missing, it sends a 500 status response with a failure message
        const { mealL, lunch, caloriesLunch, dateToDb } = req.body
        if ( !mealL || !lunch || !caloriesLunch || !dateToDb )
        {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        // Creates a new log instance using the logFoodModel with user-provided  mealL,lunch,caloriesLunch, dateToDb, id
        // Call save method to save log to database; Result is assigned to the variable logFood
        const logFood = await logFoodModel({
            mealL,
            lunch,
            caloriesLunch,
            dateToDb,
            postedBy: req.auth._id
        }).save();

        // Send 201 status response indicating successful creation
        // Send success message and include created log in response body
        // Log entire request object to console
        res.status(201).send({
            success: true,
            message: 'logFood Created Successfully',
            logFood,
        });
        console.log(req)
    }

    // Logs the error to the console
    // Send a 500 status response with a failure message and includes the error details in the response body
    catch (error) {
        console.error(error);
        res.status(500).json({
           success: false,
           message: 'Internal Server Error',
           error: error.message,
        });
     }
};

// Create logDinner
// Declares an asynchronous function createLogDinnerController that takes two parameters: req (request) and res (response)
const createLogDinnerController = async (req, res) => {   
    try                                             
    {
        // Destructures mealD, dinner, caloriesDinner from the request body (req.body)
        // Validate whether mealD, dinner, caloriesDinner , dateToDb are present in the request body
        // If any is missing, it sends a 500 status response with a failure message
        const { mealD, dinner, caloriesDinner, dateToDb } = req.body
        if ( !mealD || !dinner || !caloriesDinner || !dateToDb )
        {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        // Creates a new log instance using the logFoodModel with user-provided mealD, dinner, caloriesDinner, dateToDb, id
        // Call save method to save log to database; Result is assigned to the variable logFood
        const logFood = await logFoodModel({
            mealD,
            dinner,
            caloriesDinner,
            dateToDb,
            postedBy: req.auth._id
        }).save();

        // Send 201 status response indicating successful creation
        // Send success message and include created log in response body
        // Log entire request object to console
        res.status(201).send({
            success: true,
            message: 'logFood Created Successfully',
            logFood,
        });
        console.log(req)
    }

    // Logs the error to the console
    // Send a 500 status response with a failure message and includes the error details in the response body
    catch (error) {
        console.error(error);
        res.status(500).json({
           success: false,
           message: 'Internal Server Error',
           error: error.message,
        });
     }
};

// GET USER LOGS
// Declares an asynchronous function getUserLogController that takes two parameters: req (request) and res (response)
const getUserLogController = async (req, res) => {
    try 
    {
        // Use logFoodModel to find all logs in the database
        // Calls populate method to replace the postedBy field with the specified fields ("_id name") from the referenced user model
        // Calls sort method to sort the logs based on createdAt field in descending order
        const logs = await logFoodModel.find({postedBy:req.auth._id})
            .populate("postedBy", "_id name")
            .sort({ createdAt: -1 });

        // Send a 200 status response indicating a successful request and includes the retrieved logs in the response body
        res.status(200).send({
            success: true,
            message: "All logs Data",
            logs,
        });
    }

    // Logs the error to the console
    // Send a 500 status response with a failure message and includes the error details in the response body
    catch (error)
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GETALLPOSTS API',
            error
        });
    }
};

module.exports = { requireSignIn, createLogBreakfastController, createLogLunchController, createLogDinnerController, getUserLogController };