import { View, Text, StyleSheet, ScrollView, Image, Pressable, TextInput,FlatList } from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import { useNavigation } from '@react-navigation/native';
import buttonSearch from '../images/searchacc.png'; 
import buttonImage from '../images/createacc.png';     
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { Animated, TouchableOpacity } from 'react-native';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';

const Vendor = () => {
    const navigation = useNavigation();
    const [state] = useContext(AuthContext);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const scale = useRef(new Animated.Value(1)).current;

    //pulsation efect
    const handlePressIn = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 200,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                })
            ]),
            { iterations: 2 }
        ).start();
    };

    const handleSearchAccount = () => {
        navigation.navigate('VendorSearch');
    };

    const handleCreateAccount = () => {
        navigation.navigate('CreateVendor');
    };
    
    return (
        <View style={styles.container}>
            {/* Create Product Owner Account Button */}
            <Pressable 
                onPress={handleCreateAccount}
                onPressIn={handlePressIn}
                style={styles.button}
            >
            <Animated.Image 
                    source={buttonImage}
                    style={[styles.buttonImage, { transform: [{ scale }] }]}
                    resizeMode="contain"
            />
            </Pressable>

            {/* Search vendor Account Button */}
            <Pressable 
                onPress={handleSearchAccount}
                onPressIn={handlePressIn}
                style={styles.button}
            >

            <Animated.Image 
                    source={buttonSearch}
                    style={[styles.buttonSearch, { transform: [{ scale }] }]}
                    resizeMode="contain"
            />
            </Pressable>


        {/* footer menu icon */}
        <View style={{ backgroundColor: "#DAE7E0" }}>
            <SysAdFooterMenu />
        </View>
    </View>
    );



    {/* Create vendor Account Button */}    
    <Pressable style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>CREATE VENDOR ACCOUNT</Text>
    </Pressable>

    {/* Search Product Owner Account Button */}
    <Pressable style={styles.button} onPress={handleSearchAccount} >
        <Text style={styles.buttonText}>SEARCH VENDOR ACCOUNT</Text>
    </Pressable>          
               
            
            {/* footer menu icon */}        
            <View style={{ backgroundColor: "#ffffff" }}>
                <FooterMenu />
            </View>
       
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
        borderColor: 'green',
        borderWidth: 5,
        borderRadius: 20, // Rounded corners
        paddingLeft: 10,
        marginBottom: 20,
    },    
    button: {
        backgroundColor: '#1C4831', //  button color
        padding: 12,
        borderRadius: 20, // Rounded edges
        alignItems: 'center',
    },
     buttonImage: {
        width: 400, 
        height: 300, 
        padding: 12,
        borderRadius: 20, // Rounded edges
        alignItems: 'center',

    },
    buttonSearch: {
        width: 400, 
        height: 300, 
        padding: 12,
        borderRadius: 20, // Rounded edges
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
     
    },
});

export default Vendor;