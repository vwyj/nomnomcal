import { View, Text, StyleSheet, ScrollView,Image, Pressable, Animated } from 'react-native';
import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/authContext';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';
import user from '../images/user.png';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

const HomeSysAd = ()  => {
    const navigation = useNavigation();
    // Global State
    const [state] = useContext(AuthContext);

    const scale = useRef(new Animated.Value(1)).current; // Define the animated value

    // Pulsation effect
    const handlePressIn = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 700,
                    useNativeDriver: true
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true
                })
            ]),
            { iterations: 2 }
        ).start();
    };


    const handlePressUserAccount= () => {
        // Navigate to the "View" screen
        navigation.navigate('UserAccount');
    };

    const handlePressPO= () => {
        // Navigate to the "View" screen
        navigation.navigate('ProductOwner');
    };
    const handlePressBO= () => {
        // Navigate to the "View" screen
        navigation.navigate('Vendor');
    };
    

    return (
        <View style = { styles.container }>
            <View style={{ alignItems:  'center' }}>
                <Image
                source={user}
                style={styles.dashboard}
                resizeMode="contain"
                />
            </View>


            <Pressable 
                style={styles.button} 
                onPress={handlePressUserAccount}
                onPressIn={handlePressIn}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Text style={styles.text}>USER</Text>
                </Animated.View>
            </Pressable>

            <Pressable 
                style={styles.button} 
                onPress={handlePressBO}
                onPressIn={handlePressIn}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Text style={styles.text}>VENDOR</Text>
                </Animated.View>
            </Pressable>

            <Pressable 
                style={styles.button} 
                onPress={handlePressPO}
                onPressIn={handlePressIn}
            >
                <Animated.View style={{ transform: [{ scale }] }}>
                    <Text style={styles.text}>PRODUCT OWNER</Text>
                </Animated.View>

            </Pressable>
            <View>
                <SysAdFooterMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
    },
    dashboard: {
        width: 370,
        height: 220,
        //marginBottom: 20,
       // marginRight: 300,
        resizeMode: "contain"
     },
     button: {  
        backgroundColor: '#1C4831', //  button color
        padding: 12,
        borderRadius: 60, // Rounded edges
        alignItems: 'center',
      }, 

      text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
 
    },
});

export default HomeSysAd;