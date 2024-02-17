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
import BookingHistory from '../../screens/BookingHistory'; 
 
import Register from '../../screens/auth/Register'; 
import Registration from '../../screens/auth/Registration'; 
import MockPassLogin from '../../screens/auth/MockPassLogin'; 
import singpassAuthReq from '../../screens/auth/singpassAuthReq';
import Reset from '../../screens/auth/Reset'; 
import Login from '../../screens/auth/Login'; 
import ViewDIY from '../../screens/ViewDIY'; 
import PaymentDIY from '../../screens/PaymentDIY'; 
import Recipe from '../../screens/Recipe';
import RedeemDIY from '../../screens/RedeemDIY';
import Goal from '../../screens/Goal';
import GoalMsg from '../../screens/GoalMsg';
import Consultation from '../../screens/Consultation';
import BookingConsultation from '../../screens/BookingConsultation';
import ConsultationSelection from '../../screens/ConsultationSelection';
import DailyStreak from '../../screens/DailyStreak';
import PostCompilation from '../../screens/PostCompilation';
import MyRecipePosts from '../../screens/MyRecipePosts';
import HealthHacks from '../../screens/HealthHacks';
import RecipeDescription from '../../screens/RecipeDescription';
import UserAccount from '../../screens/UserAccount';
import ProductOwner from '../../screens/ProductOwner';
import ProductOwnerSearch from '../../screens/ProductOwnerSearch';
import CreatePO from '../../screens/CreatePO';
import Vendor from '../../screens/Vendor';
import CreateVendor from '../../screens/CreateVendor';
import VendorSearch from '../../screens/VendorSearch';
import CuisineRecipes from '../../screens/CuisineRecipes';
import CreateDIY from '../../screens/CreateDIY';
import VendorViewDIY from '../../screens/VendorViewDIY';
import VendorUpdateDIY from '../../screens/VendorUpdateDIY';
import UserPurchaseDIY from '../../screens/UserPurchaseDIY';
import UserPayment from '../../screens/UserPayment';
import VendorOrders from '../../screens/VendorOrders';
import AccountPO from '../../screens/AccountPO';
import AccountSysAd from '../../screens/AccountSysAd';
import AccountVendor from '../../screens/AccountVendor';
import UserPurchase from '../../screens/UserPurchase';
import DailyDiary from '../../screens/DailyDiary';


const ScreenMenu = () => { 
    // Global State 
    const [state] = useContext(AuthContext); 
    // Auth Condition True False 
    const authenticatedUser = state?.user && state?.token;
    const isAdmin = authenticatedUser && state?.user?.role === 'admin';
    const isVendor = authenticatedUser && state?.user?.role === 'bo';
    const isPO = authenticatedUser && state?.user?.role === 'po';
    const lastLoginToday = state?.user?.lastLogin === new Date().toISOString().split('T')[0];
    const Stack = createNativeStackNavigator();
    return ( 
        <Stack.Navigator initialRouteName="Login"> 
            {authenticatedUser ? ( 
            <> 
                <Stack.Screen  
                        name={isAdmin ? "HomeSysAd" : (isVendor ? "HomeVendor" : (isPO ? "HomePO" : "Home"))} 
                        component={isAdmin ? HomeSysAd : (isVendor ? HomeVendor : (isPO ? HomePO : Home))} 
                        options={{ 
                            title: "nomnomcal", 
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
                    name="BookingHistory" 
                    component={BookingHistory} 
                    options={{
                        title: "Booking History",
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
                <Stack.Screen  
                    name="DailyStreak" 
                    component={DailyStreak} 
                    options={{ 
                        title: "Daily Streak",
                        headerBackTitle: "Back",
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

                <Stack.Screen  
                    name="ProductOwner" 
                    component={ProductOwner} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="ProductOwnerSearch" 
                    component={ProductOwnerSearch} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="CreatePO" 
                    component={CreatePO} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

<               Stack.Screen  
                    name="Vendor" 
                    component={Vendor} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="CreateVendor" 
                    component={CreateVendor} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="VendorSearch" 
                    component={VendorSearch} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="CreateDIY" 
                    component={CreateDIY} 
                    options={{ 
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="VendorViewDIY" 
                    component={VendorViewDIY} 
                    options={{ 
                        title: "View DIY Meal Kits",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                /> 

                <Stack.Screen  
                    name="VendorUpdateDIY" 
                    component={VendorUpdateDIY} 
                    options={{ 
                        title: "Update DIY Meal Kits",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                
                <Stack.Screen  
                    name="UserPurchaseDIY" 
                    component={UserPurchaseDIY} 
                    options={{ 
                        title: "Purchase DIY",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                <Stack.Screen  
                    name="UserPayment" 
                    component={UserPayment} 
                    options={{ 
                        title: "User Payment",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                <Stack.Screen  
                    name="VendorOrders" 
                    component={VendorOrders} 
                    options={{ 
                        title: "Vendor Orders",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                <Stack.Screen  
                    name="AccountPO" 
                    component={AccountPO} 
                    options={{ 
                        title: "Account",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                <Stack.Screen  
                    name="AccountSysAd" 
                    component={AccountSysAd} 
                    options={{ 
                        title: "Account",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                <Stack.Screen  
                    name="AccountVendor" 
                    component={AccountVendor} 
                    options={{ 
                        title: "Account",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />



                <Stack.Screen  
                    name="UserPurchase" 
                    component={UserPurchase} 
                    options={{ 
                        title: "Payment",
                        headerBackTitle: "Back", 
                        headerRight: () => <HeaderMenu/>, 
                    }} 
                />

                <Stack.Screen
                    name="CuisineRecipes"
                    component={CuisineRecipes}
                    options={{
                        title: "Cuisine Recipes",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />
               
               <Stack.Screen
                    name="DailyDiary"
                    component={DailyDiary}
                    options={{
                        title: "Diary",
                        headerBackTitle: "Back",
                        headerRight: () => <HeaderMenu/>,
                    }}
                />

                  
               <Stack.Screen
                    name="ConsultationSelection"
                    component={ConsultationSelection}
                    options={{
                        title: "Consultation Selection",
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

              

                <Stack.Screen  
                    name="Registration" 
                    component={Registration} 
                    options={{ headerShown: false }} 
                /> 

                <Stack.Screen  
                    name="Reset" 
                    component={Reset} 
                    options={{ headerShown: false }} 
                /> 

                <Stack.Screen  
                    name="MockPassLogin" 
                    component={MockPassLogin} 
                    options={{ headerShown: false }} 
                /> 

                <Stack.Screen  
                    name="singpassAuthReq" 
                    component={singpassAuthReq} 
                    options={{ headerShown: false }} 
                /> 



            </> 
            ) } 
        </Stack.Navigator> 
    ); 
}; 
 
export default ScreenMenu;