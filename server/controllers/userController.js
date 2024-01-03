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

// Register
// Declares an asynchronous function named registerController that takes two parameters: req (request) and res (response)
const registerController = async (req, res) => {
    try
    {
        // Parse Request and Validate Data
        // Destructures name, email, password from request body (req.body)
        // Validates whether all required fields are present, and if password is at least 6 characters long
        const {name, email, password, dob, gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories} = req.body;
        if (!name)
        {
            return res.status(400).send({
                success: false,
                message: "Name is required",
            });
        }
        
        if (!email)
        {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            });
        }
        
        if (!password || password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password is required and have at least 6 characters",
            });
        }

        if (!gender)
        {
            return res.status(400).send({
                success: false,
                message: "Gender is required",
            });
        }

        if (!dob)
        {
            return res.status(400).send({
                success: false,
                message: "Date of birth is required",
            });
        }

        if (!height)
        {
            return res.status(400).send({
                success: false,
                message: "Height is required",
            });
        }

        if (!weight)
        {
            return res.status(400).send({
                success: false,
                message: "Weight is required",
            });
        }

        if (!activitylvl)
        {
            return res.status(400).send({
                success: false,
                message: "Activitylvl is required",
            });
        }

        if (!question)
        {
            return res.status(400).send({
                success: false,
                message: "Question is required",
            });
        }

        if (!answer)
        {
            return res.status(400).send({
                success: false,
                message: "Answer is required",
            });
        }

        if (!goal)
        {
            return res.status(400).send({
                success: false,
                message: "Goal is required",
            });
        }

        if (!totalCalories)
        {
            return res.status(400).send({
                success: false,
                message: "Total Calories is required",
            });
        }
        
        // Check for Existing User
        // Checks if user with the same email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
        {
            return res.status(500).send({
                success: false,
                message: "User has already registered with this email",
            });
        }

        // Hash Password and Save User
        // Call hashPassword to hash the user's password
        // Save a new user to the database using the userModel
        // The password stored in the database is the hashed password  
        const hashedPassword = await hashPassword(password);
        const user = await userModel({ name, email, password:hashedPassword, dob, gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories}).save();

        // Send response for Successful Registration
        return res.status(201).send({
            success: true,
            message: "Registration Successful! Please Login",
        });
    }

    // Handle Errors in Registration
    catch (error)
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};

// Login
// Declare an asynchronous function named loginController that takes two parameters: req (request) and res (response)
const loginController = async (req, res) => {
    try
    {
        // Parse Request Body and Validate Data
        // Destructure email and password from request body (req.body)
        // Validates whether both email and password are present
        const {email, password, role} = req.body;
        if (!email || !password)
        {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email Or Password",
            });
        }
        
        // Find User
        // Find a user with the provided email in the database using the userModel
        // Check if the user exists; if not, send an error response
        const user = await userModel.findOne({ email })
        if(!user)
        {
            return res.status(500).send({
                success: false,
                message: "User Not Found",
            });
        }
        
        // Match Password
        // Use the comparePassword function to compare the provided password with the hashed password stored in the database
        const match = await comparePassword(password, user.password);
        if(!match)
        {
            return res.status(500).send({
                success: false,
                message: "Invalid Password",
            });
        }

        const lastLogin = new Date().toISOString(); // Get current timestamp
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { lastLogin },
            { new: true }
        );
        
        // TOKEN 
        // Generate JWT token with the user's _id as the payload
        // The JWT is signed using the secret from the environment variable JWT_SECRET and is set to expire in 7 days
        const token = await JWT.sign({ _id: updatedUser._id }, process.env.JWT_SECRET, {expiresIn:"365d"});

        // Undefined Password
        // Send Response for Successful Login
        user.password = undefined;  //  password is set to undefined
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    }

    // Handling Errors in Login
    catch (error)
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        });
    }
};

// Update User
// Declare an asynchronous function named updateUserController that takes two parameters: req (request) and res (response)
const updateUserController = async (req, res) => {
    try
    {
        // Parse Request Body
        // Destructure name, password, email from request body (req.body)
        const {name, password, email, totalCalories} = req.body;
        // Find User and Validate Password
        // Find user with the provided email in the database
        // Validate password length when password is provided
        const user = await userModel.findOne({email});
        if (password && password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password is required and should be 6 characters long"
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        // Parse totalCalories to a number if it's not null or undefined
        const parsedTotalCalories = totalCalories !== null && totalCalories !== undefined ? Number(totalCalories) : undefined;
        // Updated User
        const updatedUser = await userModel.findOneAndUpdate(
            {email}, 
            {name: name || user.name,
             password: hashedPassword || user.password,
             totalCalories: parsedTotalCalories !== undefined ? parsedTotalCalories : user.totalCalories
            },
            {new:true}
        );
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Profile Updated, Please Login",
            updatedUser
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error In User Update API",
            error
        });
    }
};

module.exports = { requireSignIn, registerController, loginController, updateUserController };