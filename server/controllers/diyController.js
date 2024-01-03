const diyModel = require("../models/diyModel");   // Import diyModel which contains Mongoose for diary 
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
 
// Create diymeal 
// Declares an asynchronous function createPostController that takes two parameters: req (request) and res (response) 
const createDiyMealController = async (req, res) => {    
    try                                              
    { 
        // Destructures title and description from the request body (req.body) 
        // Validate whether both title and description are present in the request body 
        // If either is missing, it sends a 500 status response with a failure message 
        const { diymealkit, price } = req.body 
        if ( !diymealkit  ) 
        { 
            return res.status(500).send({ 
                success: false, 
                message: 'Please Fill In All Fields' 
            }); 
        } 
 
        // Creates a new post instance using the postModel with user-provided title, description, id 
        // Call save method to save post to database; Result is assigned to the variable post 
        const diymealkits = await diyModel({ 
            diymealkit, 
            price,
            postedBy: req.auth._id 
        }).save(); 
 
        // Send 201 status response indicating successful creation 
        // Send success message and include created post in response body 
        // Log entire request object to console 
        res.status(201).send({ 
            success: true, 
            message: 'Diy Mealkit Purchased Successfully', 
            diymealkits, 
        }); 
        console.log(req) 
    } 
 
    // Logs the error to the console 
    // Send a 500 status response with a failure message and includes the error details in the response body 
    catch (error) 
    { 
        console.log(error); 
        res.status(500).send({ 
            success: true, 
            message: 'Error in Purchasing Diy Mealkit', 
            error 
        }); 
    } 
}; 
 
module.exports = { requireSignIn, createDiyMealController };
