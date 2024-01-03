const express = require('express');     // to create an Express router
const { requireSignIn } = require('../controllers/userController');
const { createLogBreakfastController, createLogLunchController, createLogDinnerController, getUserLogController } = require('../controllers/logFoodController');

// Create Router Object
// Create an instance of an Express router using express.Router()
// The router object allows the definition of routes for the application
const router = express.Router();

// CREATE POST || POST
// Define a route to handle HTTP POST requests to the "/create-logBreakfast" endpoint
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a logBreakfast
// Call createLogBreakfastController function from logFoodController to handle the creation of a logBreakfast
router.post('/create-logBreakfast', requireSignIn, async (req, res) => {
    try {
       // Call createLogBreakfastController function from logFoodController to handle the creation of a logFood
       await createLogBreakfastController(req, res);
    } catch (error) {
       console.error(error);
       res.status(500).send({
          success: false,
          message: 'Internal Server Error',
       });
    }
 });

// CREATE POST || POST
// Define a route to handle HTTP POST requests to the "/create-logLunch" endpoint
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a logLunch
// Call createLogLunchController function from logFoodController to handle the creation of a logLunch
router.post('/create-logLunch', requireSignIn, async (req, res) => {
    try {
       // Call createLogLunchController function from logFoodController to handle the creation of a logFood
       await createLogLunchController(req, res);
    } catch (error) {
       console.error(error);
       res.status(500).send({
          success: false,
          message: 'Internal Server Error',
       });
    }
 });


// CREATE POST || POST
// Define a route to handle HTTP POST requests to the "/create-logLunch" endpoint
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a logLunch
// Call createLogDinnerController function from logFoodController to handle the creation of a logLunch
router.post('/create-logDinner', requireSignIn, async (req, res) => {
    try {
       // Call createLogDinnerController function from logFoodController to handle the creation of a logFood
       await createLogDinnerController(req, res);
    } catch (error) {
       console.error(error);
       res.status(500).send({
          success: false,
          message: 'Internal Server Error',
       });
    }
 });

//GET USER LOG
 router.get("/get-user-logs", requireSignIn, getUserLogController)
// Export 
// Exports the router object, making it available for use in other parts of the application
// This allows this router to be mounted in the main Express application to handle specific routes
module.exports = router;