import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Pressable, TextInput,FlatList, Button, Alert } from 'react-native';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';
import user from '../images/user.png';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';

const CreatePO = () => {
    // States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [state] = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const defaultPickerValue = null;

    const navigation = useNavigation();
    const navigationRef = useRef();

    useEffect(() => {
      navigationRef.current = navigation;
    }, [navigation]);

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

    const genders = [
        { key: 'M', value: 'Male' },
        { key: 'F', value: 'Female' },
      ];
    
    // Button Function
    const handleSubmit = async () => {
        try {
          // if (!gender) {
          //   Alert.alert("Gender is required");
          
          //   return;
          // }
      
          setLoading(true);
      
          const response = await axios.post("http://ipaddress:5000/api/v1/auth/poRegister", { name, email, password, gender });
          
          Alert.alert("Registration Successful");
          
        } catch (error) {
          console.log("Error response from server:", error.response);
          // Display an alert with the error message from the controller
          Alert.alert(error.response.data.message);
          setLoading(false);
          console.log(error);
        }
      };
    
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
            
            <Text style={styles.header}>Create New Product Owner</Text>
              <View style={{ marginHorizontal: 20 }}>
                
                <TextInput
                  style={styles.input}
                  placeholder="Enter name"
                  placeholderTextColor="#000000"
                  value={name}
                  onChangeText={setName}
                />

                <TextInput
                  style={styles.input}
                  placeholder="Enter email"
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

                <SelectList
                  setSelected={setGender}
                  data={genders}
                  placeholder="Select gender"
                  placeholderTextColor="#000000"
                  fontWeight="bold"
                  search={false}
                  boxStyles={{ borderColor:'#000000',   backgroundColor: '#DAE7E0',borderWidth: 5,
                  marginBottom: 10,
                  paddingLeft: 10,
                  borderRadius: 30, }} //override default styles
                  dropdownStyles={{ borderRadius: 20,  backgroundColor: '#1C4831', borderWidth: 2, marginBottom: 18}}
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
    height: 60,
    width: '100%',  
    backgroundColor: '#DAE7E0', //light green searchbox
    borderWidth: 5,
    borderRadius: 20, // Rounded corners
    paddingLeft: 10,
    marginBottom: 20,
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
  buttonText:{
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

export default CreatePO;