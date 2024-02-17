import { View, Text, StyleSheet, ScrollView, Button, Alert, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const UserPurchaseDIY = (vendordiys) => {
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

  useEffect(() => {
    const fetchUserData = async () => {
      try 
      {
        const response = await fetch('http://ipaddress:5000/api/v1/auth/getUserId');
        if (!response.ok)
        {  
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        console.log("User ID:", data.userId);
        // console.log("hi :",data);
        setUserId(data.userId);
        // setUserId(data);
      } 
      catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  });

  const handlePurchase = (diyMealKitName, userId) => { 
    navigation.navigate('UserPurchase', {diyMealKitName, userId}); 
  };

//   const handlePurchase = (selectedSet, selectedPrice) => { 
//     navigation.navigate('PaymentDIY', { selectedSet, selectedPrice }); 
//   };

  const handleRedeem = (selectedSet, selectedPoint, availablePoints) => { 
    navigation.navigate('RedeemDIY', { selectedSet, selectedPoint, availablePoints }); 
  };

  return (
    <View style={styles.container}>
        <ScrollView>
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Text style={styles.header}>Points: </Text>
            </View> 
        {loading ? (
            <Text>Loading...</Text>
        ):(
            vendorDIYMealKits.map((kit)=>(
            <View style={styles.menuContainer} key={kit._id}>
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
                
                <View style={{ flexDirection: "row", justifyContent: "center", }}>
                    <Button
                        title={'Purchase'}
                        color={'#1A8871'}
                        onPress= {handlePurchase(kit.title, userId)}
                    />
                    <View style={{ marginLeft: 30 }}>
                    <Button
                        title={'Redeem'}
                        color={'#1A8871'}
                        onPress={handleRedeem}
                    />
                    </View>
                </View>
            </View>
            ))
        )}
        </ScrollView>

        {/* <UserPurchase diyMealKitName={title} userId={userId} /> */}

    </View>
  );
};

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
});

export default UserPurchaseDIY;