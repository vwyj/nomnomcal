import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, TextInput,FlatList, Button, Alert } from 'react-native';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';
import user from '../images/user.png';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const CreateVendor= () => {
    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [state] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const defaultPickerValue = null;
    const navigation = useNavigation();
    const navigationRef = useRef();

    // Button Function
    const handleSubmit = async () => {
      try {
        // if (!name || !email || !password || !contactNumber || !address) {
        //   Alert.alert("Please Fill In All Fields");
        
        //   return;
        // }
    
        setLoading(true);
    
        const response = await axios.post("http://ipaddress:5000/api/v1/auth/vendorRegister", { name, email, password, contactNumber, address });
        
        Alert.alert("Registration Successful");
        
      }catch (error)
        {
            alert(error.response ? error.response.data.message : 'An error occurred');
            setLoading(false);
            console.log(error);
        }
    };

    const handleValueChange = (value) => {
      switch (value) {
      case 'user':
        navigationRef.current.navigate('UserAccount');
        break;
      case 'productOwner':
        navigationRef.current.navigate('ProductOwner');
        break;
      case 'businessOwner':
        navigationRef.current.navigate('Vendor');
        break;
      default:
        // Handle other cases or do nothing.
        break;
      }
    };

    useEffect(() => {
        navigationRef.current = navigation;
      }, [navigation]);
      
    return (
      <View style={styles.container}>  
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={handleValueChange}
            items={[
                { label: 'User', value: 'user' },
                { label: 'Product Owner', value: 'productOwner' },
                { label: 'Business Owner', value: 'businessOwner' },
            ]}
            placeholder={{ label: 'Select a User', value: defaultPickerValue }}
            value={null} // Set the value to null initially to display the placeholder
          />
          </View>
          <Text style={styles.header}>Create New Vendor Account:</Text>

                
      <View style={{ marginHorizontal: 20 }}>
        
        <TextInput
          style={styles.input}
          placeholder="Enter company name"
          placeholderTextColor="#000000"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter company email"
          placeholderTextColor="#000000"
          keyboardType='email-address'
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter company contact number"
          placeholderTextColor="#000000"
          keyboardType='numeric'
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter company address"
          placeholderTextColor="#000000"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.smallpurpleButton}>
            <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
        
      </View>
            
      {/* footer menu icon */}        
      <View>
        <SysAdFooterMenu />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
  },
  header: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
  },
  input: { 
    backgroundColor: '#DAE7E0', // lightgreen
    borderWidth: 5,
    padding: 8,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 5,
    borderRadius: 20, // Rounded corners
  },
  smallpurpleButton: {
    backgroundColor: '#1C4831', //dark green
    padding: 8,
    borderRadius: 15, 
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, 
    height: 40, 
  },
  buttonText: {
    color: 'white', // White text for better contrast
    fontSize: 16, // Smaller font size
  },
  pickerContainer:{
    padding: 10,
    borderWidth: 1,
    borderColor: '#B0BEC5', // Light blue-gray
    borderRadius: 8,
    marginBottom: 15,
},
});

export default CreateVendor;