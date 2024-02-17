//PaymentDIY.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native'; 
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FooterMenu from '../components/Menus/FooterMenu';
 
//function 
const PaymentDIY = ({ route }) => {  
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [remarks, setRemarks] = useState('');
    const [address, setAddress] = useState('');
    const { diymealkit, price, ingredients, instructions, allergens, calories } = route.params;
    const [loading, setLoading] = useState(false); 
    const [diymealkitorder, setDiymealkitorder] = useState([]);
    const [test, setTest] = useState('setB');
    const navigation = useNavigation();

    const saveEntry = async () => { 
     
      try 
          { 
            setLoading(true); 
            const { data } = await axios.post("http://ipaddress:5000/api/v1/diymealkit/create-diymealkit",  {diymealkit, price, ingredients, instructions, allergens, calories} ); 
            alert(data && data.message); 
            console.log("Response from API:", data); 
            console.log("diymealkit Data==> ", {diymealkit, price, ingredients, instructions, allergens, calories}); 
   
            // Save the entry to a data store (e.g., state, database) 
            const entry = {diymealkit, price, ingredients, instructions, allergens, calories}; 
            setDiymealkitorder([...diymealkitorder, entry]); 

            setLoading(false); 
            navigation.navigate('ViewDIY');
          } 
          catch(error) 
          { 
            alert(error.response.data.message); 
            setLoading(false); 
            console.log(error); 
          } 
        };
        

  const validateNameOnCard = () => {
        if (!nameOnCard.trim()) {
            setNameError('Name on card is required');
            return false;
        }
        // Add more validation rules if needed
        setNameError('');
        return true;
    };
    const handlePayment = () => {
        // Add validation logic for payment details
        Alert.alert('Payment Processed');
        // Implement payment processing logic here
      };
      return (
     
         <View>
        <Text style={styles.header}>Payment Details</Text>
        <Text style={styles.font}>Card information</Text>

        
        <View style={styles.container1}>
            <TextInput
            style={styles.input}
            placeholder="Card number"
            />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center", }}>
            <View style={styles.container2}>
                <TextInput
                style={styles.input}
                placeholder="MM / YY"
                keyboardType="numeric"
                />
            </View>

            <View style={styles.container2}>
                <TextInput
                style={styles.input}
                placeholder="CVC"
                keyboardType="numeric"
                />
            </View>
        </View>

        <Text style={styles.font}>Name on card</Text>
        <View style={styles.container1}>
            <TextInput
            style={styles.input}
            />
        </View>

        <TouchableOpacity
            style={styles.payButton}
            onPress= {saveEntry}
        >
            <Text style={styles.payFont}>Pay</Text>
        </TouchableOpacity>

        <View >
                <FooterMenu/>
            </View>  

    </View>
    
        
      );
    };
    
    const styles = StyleSheet.create({
      container1: 
      {
        backgroundColor: '#fff', // Background color of the container
        borderRadius: 5, // Border radius to round the corners
        padding: 8, // Padding inside the container
        borderColor: '#D4D5D9',
        borderWidth: 0.5,
        marginLeft: 20,
        marginRight: 20,
      },
      container2: 
      {
        backgroundColor: '#FFFFFF', // Background color of the container
        borderRadius: 5, // Border radius to round the corners
        padding: 8, // Padding inside the container
        borderColor: '#D4D5D9',
        borderWidth: 0.5,
        paddingHorizontal: 72,
      },
      payButton: 
      {   
          alignItems: 'center', 
          backgroundColor: '#008871', // Background color of the container
          borderRadius: 5, // Border radius to round the corners
          padding: 8, // Padding inside the container
          borderColor: '#D4D5D9',
          borderWidth: 0.5,
          margin: 10,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 420
      },
      header:
      {
          color: "#4D4D4D",
          fontSize: 16,
          fontWeight: "bold",
          margin: 10,
          marginLeft: 20,
      },
      font:
      {
          color: "#4D4D4D",
          fontSize: 14,
          margin: 5,
          marginLeft: 20,
          marginTop: 10,
      },
      payFont:
      {
          color: "#FFFFFF",
          fontSize: 16,
          margin: 3,
  
      }
    });
    
    export default PaymentDIY;
