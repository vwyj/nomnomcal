const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');

// Register
const registerController = async (req, res) => {
    try
    {
        const {name, email, password} = req.body
        // validation
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
        // existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
        {
            return res.status(500).send({
                success: false,
                message: "User has already registered with this email",
            });
        }

        // hashed password
        const hashedPassword = await hashPassword(password);

        // save user
        const user = await userModel({ name, email, password:hashedPassword, }).save();

        return res.status(201).send({
            success: true,
            message: "Registration Successful! Please Login",
        });
    }
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
const loginController = async (req, res) => {
    try
    {
        const {email, password} = req.body
        // Validation
        if (!email || !password)
        {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email Or Password",
            })
        }
        // Find User
        const user = await userModel.findOne({email})
        if(!user)
        {
            return res.status(500).send({
                success: false,
                message: "User Not Found",
            })
        }
        // Match Password
        const match = await comparePassword(password, user.password)
        if(!match)
        {
            return res.status(500).send({
                success: false,
                message: "Invalid Username Or Password",
            })
        }
        // TOKEN
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, 
            {expiresIn:"7d"})

        // Undefined Password
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        })
    }
    catch (error)
    {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        })
    }
};

module.exports = { registerController, loginController };