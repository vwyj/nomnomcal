// Summary: set-up an Express router with three routes: 1.user registration, 2.user login, 3.update user information
// The router uses middleware (requireSignIn) to ensure authentication for the update route. 
// The actual handling of these routes is delegated to controller functions from the userController module.

const express = require('express');     // To create an Express router
const { registerController, loginController, updateUserController, requireSignIn } = require('../controllers/userController');

// Create Router Object
// Create an instance of an Express router using express.Router()
// The router object allows the definition of routes for the application
const router = express.Router();

// Routes
// REGISTER || POST
// Define a route to handle HTTP POST requests to the "/login" endpoint
// Call the loginController function from the userController module to handle user login
router.post("/register", registerController);

// LOGIN || POST
// Defines a route for handling HTTP POST requests to the "/login" endpoint.
// Calls the loginController function from the userController module to handle user login
router.post("/login", loginController);

// UPDATE || PUT
// Defines a route for handling HTTP PUT requests to the "/update-user" endpoint
// Uses the requireSignIn middleware to ensure that the user is signed in before allowing the update
// Calls the updateUserController function from the userController module to handle updating user information
router.put("/update-user", requireSignIn, updateUserController);

// Export
// Exports the router object, making it available for use in other parts of the application
// This allows this router to be mounted in the main Express application to handle specific routes
module.exports = router;