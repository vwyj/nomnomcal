// Summary: Set up authentication context (AuthContext) and provider (AuthProvider) to manage global authentication.
// Provider initializes state by fetching data from local storage, set default headers for Axios requests, and 
// provide state and setState function to its children. Child components wrapped in AuthProvider will have access 
// to the authentication state and functions to update that state.

import React, { createContext, useState, useEffect } from "react";  // hooks from React
import AsyncStorage from "@react-native-async-storage/async-storage";   // for Asynchronous Storage in React Native
import axios from "axios";      // Axios: library to make HTTP requests

// To create Authentication Context: used to share authentication-related data across components
const AuthContext = createContext();

// AuthProvider
// Declares a functional component AuthProvider using an arrow function
// It takes children as a prop, which represents the child components wrapped by this provider
const AuthProvider = ({ children }) => {
    
    // Set-Up Global State
    // Initializes global state using useState hook; the state includes properties for both user and token
    const [state, setState] = useState({
        user: null,
        token: "",
    });

    // Fetch Initial Data from Local Storage
    // Use useEffect hook to fetch initial data from local storage when the component mounts
    // AsyncStorage.getItem("@auth") retrieves data with the key "@auth" from local storage
    // JSON.parse(data) parses the retrieved data as JSON
    // Update state with user and token from parsed data
    useEffect(() => {
        const loadLocalStorageData = async () => {
            let data  = await AsyncStorage.getItem("@auth");
            let loginData = JSON.parse(data);
            setState({ ...state, user: loginData?.user, token: loginData?.token });
        };
        loadLocalStorageData();
    }, []);

    let token = state && state.token;

    // Set Default Axios Setting
    // Extract token from state
    // Set default headers and base URL for Axios requests, including the authorization header with the bearer token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios.defaults.baseURL = "https://react-native-server-4tfd.onrender.com/api/v1";
    axios.defaults.baseURL = "http://192.168.1.88:5000/api/v1";

    // Provide Context Value and Render Children
    // Provide AuthContext.Provider with a value containing the state and setState function
    // Render child components passed as children within the provider
    return(
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    );
};

export{ AuthContext, AuthProvider };
