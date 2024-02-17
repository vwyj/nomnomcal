import { View, Text, StyleSheet, ScrollView,TouchableOpacity, Alert, Image, Pressable, TextInput,FlatList, Button } from 'react-native';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';
import user from '../images/user.png';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
 
const VendorSearch = () => {
    const navigation = useNavigation();
    const [state, setState] = useContext(AuthContext);
    const {user, token} =state;
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [password, setPassword] = useState(user?.password);
    const [name, setName] = useState(user?.name);
    const [email] = useState(user?.email);
    const [loading, setLoading] =useState(false);
    const defaultPickerValue = null;
    const navigationRef = useRef();

    // Handle Update User Data
    const handleUpdatePW = async(email) => {
        try
        {
            setLoading(true);
            const response = await axios.put("http://ipaddress:5000/api/v1/auth/updatePW-user?email=${email}", 
            {
                name, password, email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            }
           );
            
        
           if (response.data) {
            let updatedUser = response.data.updatedUser;
            setState({ ...state, user: updatedUser });
            alert(response.data.message);
        } else {
            alert('No data received from the server');
        }
        }
        catch (error)
        {
            alert(error.response ? error.response.data.message : 'An error occurred');
            setLoading(false);
            console.log(error);
        }
    };

    const handleBlacklistUser = async (email) => {
        try {
            Alert.alert(
                'Confirm Blacklist',
                'Are you sure you want to blacklist this user? The account will be deleted.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            // User pressed OK, proceed with blacklisting
                            const { data } = await axios.delete(`http://ipaddress:5000/api/v1/auth/remove-user?email=${email}`);
                            alert(data && data.message);
                            // Refresh the user list after blacklisting and removal
                            handleSearch();
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleSearch = async () => {
        try {
          const response = await axios.get(`http://ipaddress:5000/api/v1/auth/search-user?email=${searchText}`, {
            headers: { 'Cache-Control': 'no-cache' },});
          const data = response.data;
          setSearchResults(data.users);
        } catch (error) {
          console.error(error);
        }
      };

      const handleSuspendUser = async (email) => {   
        try {
            await axios.put(`http://ipaddress:5000/api/v1/auth/suspend-user?email=${email}`);        
            // Refresh the user list after suspension
            handleSearch();    
        } catch (error) {
            console.error(error);    
        }
    };

    const handleReinstateUser = async (email) => {
        try {
            await axios.put(`http://ipaddress:5000/api/v1/auth/reinstate-user?email=${email}`);        
            // Refresh the user list after reinstatement
            handleSearch();    
        } catch (error) {
            console.error(error);    
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
            
            <Text style={styles.header}>Enter Vendor Account:</Text>
                
            <TextInput   //searchbox for vendor
                style={styles.searchBox}
                onChangeText={setSearchText}
                value={searchText}
                placeholder="Search Vendor"
                onSubmitEditing={handleSearch}
            />
            <View style={{ flex: 1 }}>
            <FlatList
                data={searchResults}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                <View>
                    <Text style={{ fontSize: 18 }}>Name: {item.name}</Text>
                    <Text style={{ fontSize: 18 }}>Email: {item.email}</Text>
                    
                    {/*password encryption*/}
                    <Text style={{ fontSize: 18 }}>Password:</Text> 
                    <TextInput  
                        style={styles.inputBox} 
                        value={password} 
                        onChangeText={(text) => setPassword(text)} 
                        secureTextEntry={true} 
                    />
                    <Text style={{ fontSize: 18 }}>Contact Number: {item.contactNumber}</Text>
                    <Text style={{ fontSize: 18 }}>Contact Address: {item.address}</Text>
                    <Text style={{ fontSize: 18 }}>Status: {item.status}</Text> 
                    <TouchableOpacity onPress={() => handleUpdatePW(item.email)} style={styles.primaryButton}>
                        <Text style={styles.buttonText}>Update Password</Text>
                    </TouchableOpacity>
                    {item.status === 'active' ? ( 
                    <TouchableOpacity onPress={() => handleSuspendUser(item.email)} style={styles.suspendButton}>
                       <Text style={styles.buttonText}>Suspend</Text>
                   </TouchableOpacity>
                    ) : ( 
                    <TouchableOpacity onPress={() => handleReinstateUser(item.email)} style={styles.secondaryButton}>
                        <Text style={styles.buttonText}>Reinstate</Text>
                    </TouchableOpacity>
                    )} 
                    <TouchableOpacity onPress={() => handleBlacklistUser(item.email)} style={styles.blacklistButton}>
                         <Text style={styles.buttonText}>Black List</Text>
                    </TouchableOpacity>
                </View>
                )}
            />
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
    searchBox: {
        height: 40,
        width: '100%',  
        backgroundColor: '#DAE7E0', //light purple searchbox
        borderWidth: 5,
        borderRadius: 20, // Rounded corners
        paddingLeft: 10,
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    primaryButton: {
        backgroundColor: '#000100', // black update password
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    secondaryButton: {
        backgroundColor: '#E63E38', // red reinstate button
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    suspendButton:{
        backgroundColor: '#478879', // green suspend button
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    blacklistButton:{
        backgroundColor: '#000100', // black blacklist button
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },    
    inputBox:
    {
        width: 250,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5,
    },
});

export default VendorSearch;