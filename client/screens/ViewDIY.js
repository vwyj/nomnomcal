// ViewComponent.js   
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Button} from 'react-native';   
import axios from 'axios';   
import React, { useContext, useState, useEffect } from 'react';   
import { AuthContext } from '../context/authContext';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import { useNavigation } from '@react-navigation/native';
import FooterMenu from '../components/Menus/FooterMenu';
  
//press function on image 
const ViewDIY = (vendordiys) => {   
    
    const [selectedSet, setSelectedSet] = useState(null);     
    const [availablePoints, setAvailablePoints] = useState(""); 
    const [selectedPrice, setSelectedPrice] = useState(null); 
    const [selectedPoint, setSelectedPoint] = useState(null); 
    const [showText, setShowText] = useState({ setA: false, setB: false, setC: false, setD: false });
    const toggleText = (setImage) => { 
      setShowText({ ...showText, [setImage]: !showText[setImage] }); 
    }; 

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation(); 
    const [vendorDIYMealKits, setVendorDIYMealKits] = useState([]);
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [allergies, setAllergies] = useState("");
    const [calorie, setCalorie] = useState(0);
    const [userId, setUserId] = useState([]);

   // Get All DIYMealKits
  useEffect(() => {
    const getAllDIYs = async () => {
        setLoading(true);
        try 
        {
          const {data} = await axios.get(`http://ipaddress:5000/api/v1/vendorDIY/getAllVendorDIY`);
          setLoading(false);
          setVendorDIYMealKits(data?.vendorDIYMealKits);

        }
        catch (error)
        {
          console.log("Error fetching DIY meal kits:", error);
          setLoading(false);
        }
    };
    getAllDIYs();
  },[]);

    // handlePress1 etc are functions designed to handle presses on different sets 
    const handlePress1 = () => { 
      handlePress('setA', '$9.90'); 
    }; 
   
    const handlePress2 = () => { 
      handlePress('setB', '$12.90'); 
    }; 
   
    const handlePress3 = () => { 
      handlePress('setC', '$15.90'); 
    }; 
   
    const handlePress4 = () => { 
      handlePress('setD', '$19.90'); 
    }; 
    //function desugbed to handle presses on for redeem sets
    const handlePresstoRedeemdiy1 = () => {
      handlePresstoRedeemdiy('setA', '150', availablePoints); 
    };
    const handlePresstoRedeemdiy2 = () => { 
      handlePresstoRedeemdiy('setB', '500', availablePoints); 
    }; 
   
    const handlePresstoRedeemdiy3 = () => { 
      handlePresstoRedeemdiy('setC', '800', availablePoints); 
    }; 
   
    const handlePresstoRedeemdiy4 = () => { 
      handlePresstoRedeemdiy('setD', '900', availablePoints); 
    }; 

    const handlePurchase = (kit) => { 
      navigation.navigate('PaymentDIY', {
        diymealkit: kit.title,
        price: kit.price,
        ingredients: kit.ingredients,
        instructions: kit.instructions,
        allergens: kit.allergies,
        calories: kit.calories
      }); 
    };

    const handleRedeem = (kit, availablePoints) => { 
      navigation.navigate('RedeemDIY', {
        diymealkit: kit.title,
        points: kit.points,
        ingredients: kit.ingredients,
        instructions: kit.instructions,
        allergens: kit.allergies,
        calories: kit.calories,
        availablePoints: availablePoints // Pass the available points
      }); 
    };

  

    //function to direct to another page
    //direct viewDIY.js to paymentDIY when purchase button is pressed
    const handlePress = (selectedSet, selectedPrice) => { 
      navigation.navigate('PaymentDIY', { selectedSet, selectedPrice }); 
    };
        //direct viewDIY.js to paymentDIY when purchase button is press
    const handlePresstoRedeemdiy = (selectedSet, selectedPoint, availablePoints) => { 
      navigation.navigate('RedeemDIY', { selectedSet, selectedPoint, availablePoints }); 
    }; 

    
 
  const [state] = useContext(AuthContext);   
    
  // Auth Condition True False   
  const authenticatedUser = state?.user && state?.token;   
  const Stack = createNativeStackNavigator(); 
  
  useEffect(() => {
    const fetchTotalPoints = async () => {
        try {
            if (authenticatedUser) {
                const response = await fetch('http://ipaddress:5000/api/v1/dailyStreak/get-total-points', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${state.token}`,
                    },
                });

                const { success, totalPoints } = await response.json();

                if (success) {
                    setAvailablePoints(totalPoints);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const intervalId = setInterval(fetchTotalPoints, 300);

    // Fetch initially when the component mounts
    fetchTotalPoints();

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalId);
}, [authenticatedUser, state.token]);

 
  return (   
  
    <View style={styles.container}>   

        <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Text style={styles.header}>{`Available points: ${availablePoints}`} </Text>
            </View> 
        {loading ? (
            <Text>Loading...</Text>
        ):(
            vendorDIYMealKits.map((kit)=>(
            <View style={styles.menuContainer} key={kit._id}>
              <Image source={{ uri: kit.imageUrl }} style={styles.image} />

                <Text style={styles.header}>DIY Meal Kit: {kit.title}</Text>
                <Text style={styles.header}>Ingredients: </Text>
                <Text style={styles.font}>{kit.ingredients}</Text>
                <Text style={styles.header}>Instructions: </Text>
                <Text style={styles.font}>{kit.instructions}</Text>
                <Text style={styles.header}>Allergens: </Text>
                <Text style={styles.font}>{kit.allergies}</Text>
                <Text style={styles.header}>Calories: </Text>
                <Text style={styles.font}>{kit.calories} kCal</Text>
                <Text style={styles.header}>Price: </Text>
                <Text style={styles.font}>${kit.price}</Text>
                <Text style={styles.header}>Points: </Text>
                <Text style={styles.font}>{kit.points}</Text>
                
                <View style={{ flexDirection: "row", justifyContent: "center", }}>
                    <Button
                        title={'Purchase'}
                        color={'#1A8871'}
                        onPress={() => handlePurchase(kit)}
                    />
                    <View style={{ marginLeft: 30 }}>
                    <Button
                      title={'Redeem'}
                      color={'#1A8871'}
                      onPress={() => handleRedeem(kit, availablePoints)} 
                    />

                    </View>
                </View>
            </View>
            ))
        )}
        
        </ScrollView>
        <View >
                <FooterMenu/>
            </View>  
    </View>  
  );   
   
};   
    
    
 //UI design   
 const styles = StyleSheet.create({   
  container:
    {
        justifyContent: 'space-between', 
        flex: 1, 
        padding: 10,
    },
    menuContainer:
    {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        elevation: 3,
        padding: 10,
        alignItems: 'center',   
        marginTop: 2,
        marginBottom: 10,
        marginLeft: 2,
        marginRight: 2,
    },
    header:
    {
        fontWeight: 'bold',
    },
    font:
    {
        paddingBottom: 5,
    },
    image: {
      width: 100, 
      height: 100, 
      resizeMode: 'cover', 
      marginBottom: 10, 
    },
   
});   
   
export default ViewDIY;
