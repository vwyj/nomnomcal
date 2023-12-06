// Summary: Set-up a post context (PostContext) and a provider (PostProvider) to manage global post-related state. 
// The provider initializes the state with a loading indicator and an array for storing posts. 
// It defines a function (getAllPosts) to fetch posts from the server and calls this function when the component mounts. 
// Child components wrapped in PostProvider will have access to the post-related state and functions to update that state.

import React, { createContext, useState, useEffect } from 'react';  // hooks from React
import axios from 'axios';  // Library to make HTTP requests

// Post Context
const PostContext = createContext();

// Takes children as a prop, representing the child components wrapped by this provider
const PostProvider = ({ children }) => {
    // Set-Up State
    // loading: boolean state to track whether data is currently being fetched
    // posts: array state to store the fetched post data
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // Get Posts
    // getAllPosts: fetch posts from server
    // Set loading state to true to indicate that data is being fetched
    // Use axios.get to make a GET request to the server's /post/get-all-post endpoint
    // If the request is successful, sets the posts state with the retrieved post data
    // If an error occurs, logs the error to the console and sets loading to false
    const getAllPosts = async () => {
        setLoading(true);
        try
        {
            const {data} = await axios.get('/post/get-all-post');
            setLoading(false);
            setPosts(data?.posts);
        }
        catch (error)
        {
            console.log(error);
            setLoading(false);
        }
    };

    // Fetch Initial Posts
    // Use useEffect hook to call getAllPosts when the component mounts
    // The empty dependency array ([]) ensures that getAllPosts is only called once when the component is initially mounted
    useEffect(() => {
        getAllPosts()
    }, []);

    // Provide Context Value and Render Children
    // Provide PostContext.Provider with a value containing the posts state and the setPosts function
    // Render child components passed as children within the provider
    return(
        <PostContext.Provider value={[posts, setPosts]}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };