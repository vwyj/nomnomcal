// Summary: Defines a ScreenMenu component that serves as a navigation component for the application. 
// It conditionally renders different sets of screens based on whether the user is authenticated or not, 
// using a stack navigator to manage the navigation flow between screens. 
// The screens include options such as titles and custom header components.

import { View, Text } from 'react-native';  // Import View and Text component from React Native Library used to create UI
import React, { useContext } from 'react';  // Import React and useContext from React Library
import { createNativeStackNavigator } from '@react-navigation/native-stack';    // createNativeStackNavigator: is used to create a stack navigator for navigating between screens
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';

import Home from '../../screens/Home';
import Post from '../../screens/Post';
import About from '../../screens/About';
import Account from '../../screens/Account';

import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';

const ScreenMenu = () => {
    
    // Access Global State: useContext used to access the global state provided by the AuthContext
    const [state] = useContext(AuthContext);
    
    // Check Authentication Condition: check if there is a user and a token in the global state, determining whether the user is authenticated
    const authenticatedUser = state?.user && state?.token;
    
    // Stack Navigator is used to manage the navigation flow between screens
    const Stack = createNativeStackNavigator();
    
    // Return JSX that represents the structure of the navigation
    // It conditionally renders different sets of screens based on whether the user is authenticated
    return (
        <Stack.Navigator initialRouteName="Login">
            // Conditionally render different sets of screens based on whether the user is authenticated or not
            {authenticatedUser ? (
            <>
                // Render screens for authenticated users, including home/post/about/account screen 
                // Each screen has specific options like title and custom header component (HeaderMenu)
                <Stack.Screen 
                    name="Home"
                    component={Home}
                    options={{
                        title: "nomnomcal",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                <Stack.Screen 
                    name="Post"
                    component={Post}
                    options={{
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                <Stack.Screen 
                    name="About"
                    component={About}
                    options={{
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                <Stack.Screen 
                    name="Account"
                    component={Account}
                    options={{
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />
            </>
            ) : (
            <>
                // Render screens for non-authenticated users, including the login/register screen
                // headerShown: false option is used to hide the header for these screens
                <Stack.Screen  
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen 
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
            </>
            ) }
        </Stack.Navigator>
    );
};

// ScreenMenu component that serves as a navigation component for the application
export default ScreenMenu;