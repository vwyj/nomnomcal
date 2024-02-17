import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const UserPurchase = ({ route }) => {
    
    const { diyMealKitName, userId } = route.params;
    const navigation = useNavigation();

    //const fetchUpdateToVendorDB



    const handlePayment = () => {
        //fetchUpdateToVendorDB();
        // Navigate to the vendor side screen and pass DIY meal kit name and user ID
        navigation.navigate('VendorOrders');
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
            onPress= {handlePayment}
        >
            <Text style={styles.payFont}>Pay</Text>
        </TouchableOpacity>
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

export default UserPurchase;

