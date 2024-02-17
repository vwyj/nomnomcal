import { View, Text, StyleSheet, Alert, ScrollView, Image, Pressable, TextInput, FlatList, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';
import user from '../images/user.png';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';


const UserAccount = () => {
    const [state, setState] = useContext(AuthContext);
    const {user, token} =state;
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [password, setPassword] = useState(user?.password);
    const [name, setName] = useState(user?.name);
    const [email] = useState(user?.email);
    const [loading, setLoading] =useState(false);
    const defaultPickerValue = null;
    const navigation = useNavigation();
    const navigationRef = useRef();

    const handlePressHome = () => {
        // Navigate to the Home screen
        navigation.navigate('HomeSysAd');
    };

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

    const handleSearch = async () => {
        try {
          const SearchUser = await axios.get(`http://ipaddress:5000/api/v1/auth/search-user?email=${searchText}`, {
            headers: { 'Cache-Control': 'no-cache' },});
          const data = SearchUser.data;
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

            <Text style={styles.header}>Enter User Account:</Text>
 
            <TextInput
                style={styles.searchBox}
                onChangeText={setSearchText}
                value={searchText}
                placeholder="Search User"
                onSubmitEditing={handleSearch}
            />
            
            <FlatList 
                style={{ flex: 1 }} 
                data={searchResults} 
                keyExtractor={(item) => item._id} 
                renderItem={({ item }) => ( 
                    <View style={styles.userItem}>  
                        <Text style={{ fontSize: 18 }}>Name: {item.name}</Text> 
                        <Text style={{ fontSize: 18 }}>Email: {item.email}</Text> 
                        {/*password encryption*/}
                        <View style={styles.passwordContainer}>
                        <Text style={{ fontSize: 18 }}>Password:</Text> 
                        <TextInput  
                            style={styles.inputBox} 
                            value={password} 
                            onChangeText={(text) => setPassword(text)} 
                            secureTextEntry={true} 
                            placeholder='Enter new password'
                        />
                        </View>
                        <Text style={{ fontSize: 18 }}>Gender: {item.gender}</Text> 
                        <Text style={{ fontSize: 18 }}>Height: {item.height}</Text> 
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
            )}/>
           

            <View >
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
        width: '100%',
        backgroundColor: '#DAE7E0',
        borderWidth: 5,
        borderRadius: 20,
        paddingLeft: 10,
        marginBottom: 20,
    },
    homeButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        padding: 10,
        backgroundColor: '#DAE7E0',
        borderRadius: 20,
    },
 

    primaryButton: {
        backgroundColor: '#000100', // black update password
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    //#B6D4E6
    secondaryButton: {
        backgroundColor: '#E63E38', // red reinstate button
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
    suspendButton:{
        backgroundColor: '#478879', // green suspend button
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    pickerContainer:{
        padding: 10,
        borderWidth: 1,
        borderColor: '#B0BEC5', // Light blue-gray
        borderRadius: 8,
        marginBottom: 15,
    },
    userItem: {
        // Styles for each user item in the FlatList
        marginBottom: 20, 
    },
    passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    },
    inputBox:
    {
        width: 250,
        backgroundColor: "#ffffff",
        marginLeft: 20,
        fontSize: 16,
        paddingLeft: 45,
        borderRadius: 5,
    },
 
});

export default UserAccount;