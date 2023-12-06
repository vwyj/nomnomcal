const postModel = require("../models/postModel");   // Import postModel which contains Mongoose for posts
                        // is used to interact with the MongoDB database collection associated with posts

// Create Post
// Declares an asynchronous function createPostController that takes two parameters: req (request) and res (response)
const createPostController = async (req, res) => {   
    try                                             
    {
        // Destructures title and description from the request body (req.body)
        // Validate whether both title and description are present in the request body
        // If either is missing, it sends a 500 status response with a failure message
        const { title, description } = req.body
        if ( !title || !description )
        {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        // Creates a new post instance using the postModel with user-provided title, description, id
        // Call save method to save post to database; Result is assigned to the variable post
        const post = await postModel({
            title,
            description,
            postedBy: req.auth._id
        }).save();

        // Send 201 status response indicating successful creation
        // Send success message and include created post in response body
        // Log entire request object to console
        res.status(201).send({
            success: true,
            message: 'Post Created Successfully',
            post,
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
            message: 'Error in Create Post API',
            error
        });
    }
};

// GET ALL POSTS
// Declares an asynchronous function getAllPostsController that takes two parameters: req (request) and res (response)
const getAllPostsController = async (req, res) => {
    try 
    {
        // Use postModel to find all posts in the database
        // Calls populate method to replace the postedBy field with the specified fields ("_id name") from the referenced user model
        // Calls sort method to sort the posts based on createdAt field in descending order
        const posts = await postModel.find()
            .populate("postedBy", "_id name")
            .sort({ createdAt: -1 });

        // Send a 200 status response indicating a successful request and includes the retrieved posts in the response body
        res.status(200).send({
            success: true,
            message: "All Posts Data",
            posts,
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

// Export createPostController and getAllPostsController function to be used in other parts of the application
module.exports = { createPostController, getAllPostsController };