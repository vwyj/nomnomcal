//PaymentDIY.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button, Alert, ScrollView } from 'react-native'; 
import axios from 'axios';
 
//function 
const PaymentDIY = ({route}) => {  
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [remarks, setRemarks] = useState('');
    const [address, setAddress] = useState('');
    const { selectedSet, selectedPrice } = route.params;
    const [loading, setLoading] = useState(false); 
    const [diymealkit, setDiymealkit] = useState([]);
    const [test, setTest] = useState('setB');

    const saveEntry = async () => { 
      const diymealkit  = selectedSet;
      const price = selectedPrice;
      try 
          { 
            setLoading(true); 
            const { data } = await axios.post("http://192.168.18.34:5000/api/v1/diymealkit/create-diymealkit",  {diymealkit, price} ); 
            //const { data } = await axios.post("http://172.20.10.2:5000/api/v1/diymealkit/create-diymealkit", { diymealkit, price });
            alert(data && data.message); 
            console.log("Response from API:", data); 
            console.log("diymealkit Data==> ", {diymealkit, price}); 
   
            // Save the entry to a data store (e.g., state, database) 
            const entry = {diymealkit, price}; 
            setDiymealkit([...diymealkit, entry]); 

            setLoading(false); 
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
        <ScrollView>
        <View style={styles.container}>
          <Text style={styles.text}>Card Details</Text>      
          <View style={styles.paymentForm}>
            <Text style={styles.formLabel}>Selected Set:</Text>
            <TextInput
              style={styles.input}
              value={`${selectedSet}`}
              editable={false}
            />
            <Text style={styles.formLabel}>Price:</Text>
            <TextInput
              style={styles.input}
              value={`${selectedPrice}`}
              editable={false}
            />
            <Text style={styles.formLabel}>Name on Card:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setNameOnCard}
              value={nameOnCard}
              placeholder="Enter your card number"
            />
    
            <Text style={styles.formLabel}>Card Number:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCardNumber}
              value={cardNumber}
              placeholder="1234 5678 9012 3456"
              keyboardType="numeric"
            />
    
            <Text style={styles.formLabel}>Expiry Date:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setExpiryDate}
              value={expiryDate}
              placeholder="MM/YY"
            />
    
            <Text style={styles.formLabel}>CVV:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setCvv}
              value={cvv}
              placeholder="123"
              keyboardType="numeric"
            />


            <Text style={styles.formLabel}>Address:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setAddress}
              value={address}
              placeholder="Blk xx yyyy road #zz-zz Sxxxxxx"
            />

            <Text style={styles.formLabel}>Remarks:</Text>
            <TextInput
              style={styles.input}
              onChangeText={setRemarks}
              value={remarks}
              placeholder="remarks"
            />
            <Button title="Pay Now" onPress={() => {handlePayment();saveEntry();}} />
          </View>
        </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
      },
      text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
      },
      image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
      },
      paymentForm: {
        width: '80%',
        alignItems: 'stretch',
        marginBottom: 20,
      },
      formLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
      },
      input: {
        height: 40,
        borderColor: 'black',
        color: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        
      },
      fixedCode:{
        textAlign: 'left',
      }
    });
    
    export default PaymentDIY;
