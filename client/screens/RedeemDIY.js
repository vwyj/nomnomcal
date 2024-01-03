//RedeemDIY.js
//for user to redeem mealkit using loyalty points 
import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image, TextInput, Button, Alert } from 'react-native';  
import axios from 'axios'; 
  

const RedeemDIY = ({ route }) => { 
    const { selectedSet, selectedPoint, availablePoints } = route.params; // assuming availablePoints is passed in route params
    //const { availablePoints } = route.params; // assuming availablePoints is passed in route params
    const [redeemPoints, setRedeemPoints] = useState(''); 
    const [loading, setLoading] = useState(false); 

    const redeemLoyaltyPoints = async () => {  
      try {  
        setLoading(true);  
        const { data } = await axios.post("http://192.168.18.34:5000/api/v1/redeem/create-redeem", { selectedSet, selectedPoint });  
        //const { data } = await axios.post("http://172.20.10.2:5000/api/v1/redeem/create-redeem", { selectedSet, selectedPoint });  
        Alert.alert(data.message);  
        console.log("Response from API:", data);  
        setLoading(false);  
      } catch (error) {  
        Alert.alert(error.response.data.message);  
        setLoading(false);  
        console.log(error);  
      }  
    }; 

    const handleRedeem = () => { 
        // Add validation logic for redeeming points
        if (parseInt(selectedPoint) > availablePoints) {
          Alert.alert('Error', 'Insufficient points for redemption');
          return;
        }
        redeemLoyaltyPoints(); 
    }; 

    return ( 
        <View style={styles.container}> 
         
          <Text style={styles.text}>Redeem Your Loyalty Points</Text>       
          
          <Text>{`Selected Set: ${selectedSet}`}</Text>
          <Text>{`Points to redeem this set: ${selectedPoint}`}</Text>
          <Text>{`Available points: ${availablePoints}`}</Text>
          {/* <Text>{'Available Points: ${availablePoints}'}</Text> */}

          <View style={styles.redeemForm}> 
            

            <Button title="Redeem Now" onPress={handleRedeem} /> 
          </View> 
        </View> 
    ); 
}; 

const styles = StyleSheet.create({ 
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'white', 
      paddingTop: 50, 
    }, 
    text: { 
      fontSize: 26, 
      fontWeight: 'bold', 
      color: 'black', 
      marginBottom: 30, // Increased spacing below the header text
    }, 
    redeemForm: { 
      width: '80%', //textbox size
      alignItems: 'stretch', 
      marginBottom: 30, 
      padding: 20, // Padding inside the form for spacing
      elevation: 2, // Elevation for Android shadow
      borderRadius: 10, 
    }, 
    formLabel: { 
      fontSize: 16, 
      color: '#555', 
      marginBottom: 5, 
    }, 
    input: { 
      height: 40, 
      borderColor: 'black', 
      borderWidth: 1, 
      marginBottom: 20, 
      paddingHorizontal: 10, 
      borderRadius: 5, // Rounded corners for input fields
    }, 
}); 
export default RedeemDIY;
