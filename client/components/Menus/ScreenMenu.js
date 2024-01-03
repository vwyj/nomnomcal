import { View, Text } from 'react-native'; 
import React, { useContext } from 'react'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { AuthContext } from '../../context/authContext'; 
import HeaderMenu from './HeaderMenu'; 
 
import Home from '../../screens/Home'; 
import HomeSysAd from '../../screens/HomeSysAd'; 
import HomePO from '../../screens/HomePO'; 
import HomeVendor from '../../screens/HomeVendor'; 
import Post from '../../screens/Post'; 
import About from '../../screens/About'; 
import Account from '../../screens/Account'; 
 
import Register from '../../screens/auth/Register'; 
import Login from '../../screens/auth/Login'; 
import ViewDIY from '../../screens/ViewDIY'; 
import PaymentDIY from '../../screens/PaymentDIY'; 
import Diary from '../../screens/Diary'; 
import LogFood from '../../screens/LogFood'; 
import Recipe from '../../screens/Recipe';
import RedeemDIY from '../../screens/RedeemDIY';
import Goal from '../../screens/Goal';
import GoalMsg from '../../screens/GoalMsg';
import Consultation from '../../screens/Consultation';
import BookingConsultation from '../../screens/BookingConsultation';
import DailyStreak from '../../screens/DailyStreak';
import PostCompilation from '../../screens/PostCompilation';
import MyRecipePosts from '../../screens/MyRecipePosts';
import HealthHacks from '../../screens/HealthHacks';
import RecipeDescription from '../../screens/RecipeDescription';
import UserAccount from '../../screens/UserAccount';


const ScreenMenu = () => { 
    // Global State 
    const [state] = useContext(AuthContext); 
    // Auth Condition True False 
    const authenticatedUser = state?.user && state?.token; 
    const isAdmin = authenticatedUser && state?.user?.role === 'admin';
    const isVendor = authenticatedUser && state?.user?.role === 'bo';
    const isPO = authenticatedUser && state?.user?.role === 'po';
    const Stack = createNativeStackNavigator(); 
    return ( 
        <Stack.Navigator initialRouteName="Login"> 
            {authenticatedUser ? ( 
            <> 
                <Stack.Screen  
                        name={isAdmin ? "HomeSysAd" : (isVendor ? "HomeVendor" : (isPO ? "HomePO" : "Home"))} 
                        component={isAdmin ? HomeSysAd : (isVendor ? HomeVendor : (isPO ? HomePO : Home))} 
                        options={{ 
                            title: "Home", 
                            headerRight: () => <HeaderMenu/>, 
                        }} 
                /> 

                <Stack.Screen 
                    name="ViewDIY" 
                    component={ViewDIY} 
                    options={{
                        title: "View meal kits",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                /> 
               
                <Stack.Screen 
                    name="LogFood" 
                    component={LogFood} 
                    options={{
                        title: "Diary",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                }}
                /> 
                <Stack.Screen 
                    name="PaymentDIY" 
                    component={PaymentDIY} 
                    options={{
                        title: "Payment meal kits",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                }}
                /> 
                <Stack.Screen 
                    name="RedeemDIY" 
                    component={RedeemDIY} 
                    options={{
                        title: "Redeem meal kits",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                }}
                /> 
               
                <Stack.Screen 
                    name="Consultation" 
                    component={Consultation} 
                    options={{
                        title: "Consultation",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                }}
                /> 
                <Stack.Screen 
                    name="HealthHacks" 
                    component={HealthHacks} 
                    options={{
                        title: "Health Hacks",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                }}
                /> 
                <Stack.Screen 
                    name="BookingConsultation" 
                    component={BookingConsultation} 
                    options={{
                        title: "Booking Consultation",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                }}
                /> 
                <Stack.Screen 
                    name="PostCompilation"
                    component={PostCompilation}
                    options={{
                        title: "Community Recipes",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                <Stack.Screen 
                    name="Recipe Description"
                    component={RecipeDescription}
                    options={{
                        title: "Add Recipes",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                <Stack.Screen 
                    name="MyRecipePosts"
                    component={MyRecipePosts}
                    options={{
                        title: "My Recipes",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />
                <Stack.Screen name="DailyStreak" component={DailyStreak} /> 
                <Stack.Screen  
                    name="Post" 
                    component={Post} 
                    options={{ 
                        headerBackTitle: "Back", 
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

                    <Stack.Screen  
                    name="UserAccount" 
                    component={UserAccount} 
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
