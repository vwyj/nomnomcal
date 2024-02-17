import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Context
const PostContext = createContext();

const PostProvider = ({ children }) => {
    // State
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    // Get Posts
    const getAllPosts = async () => {
        setLoading(true);
        try
        {
            const {data} = await axios.get('http://ipaddress:5000/api/v1/post/get-all-post');
            setLoading(false);
            setPosts(data?.posts);
        }
        catch (error)
        {
            console.log(error);
            setLoading(false);
        }
    };

    // Initial Posts
    useEffect(() => {
        getAllPosts()
    }, []);

    return(
        <PostContext.Provider value={[posts, setPosts]}>
            {children}
        </PostContext.Provider>
    );
};

export { PostContext, PostProvider };