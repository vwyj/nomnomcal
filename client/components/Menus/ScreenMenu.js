import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context/authContext';
import HeaderMenu from './HeaderMenu';

import Home from '../../screens/Home';
import Recipe from '../../screens/Recipe';
import Post from '../../screens/Post';
import About from '../../screens/About';
import Account from '../../screens/Account';

import Register from '../../screens/auth/Register';
import Login from '../../screens/auth/Login';

const ScreenMenu = () => {
    // Global State
    const [state] = useContext(AuthContext);
    // Auth Condition True False
    const authenticatedUser = state?.user && state?.token;
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Login">
            {authenticatedUser ? (
            <>
                <Stack.Screen 
                    name="Home"
                    component={Home}
                    options={{
                        title: "nomnomcal",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                <Stack.Screen 
                    name="Recipe"
                    component={Recipe}
                    options={{
                        title: "Recipes",
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

export default ScreenMenu;