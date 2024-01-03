import { View, Text, StyleSheet, ScrollView,Image, Pressable } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import user from '../images/user.png';
import { useNavigation } from '@react-navigation/native';

const HomeSysAd = ()  => {
    const navigation = useNavigation();
    // Global State
    const [state] = useContext(AuthContext);

      const handlePressUserAccount= () => {
        // Navigate to the "View" screen
        navigation.navigate('UserAccount');
    };

    const handlePressPO= () => {
        // Navigate to the "View" screen
        navigation.navigate('UserAccount');
    };
    const handlePressBO= () => {
        // Navigate to the "View" screen
        navigation.navigate('UserAccount');
    };

    return (
        <View style = { styles.container }>
            <View style={{ alignItems:  "center" }}>
            <Image
            source={user}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </View>


            <Text style={styles.text}>Select a user profile</Text> 
<Pressable style={styles.button} onPress={handlePressUserAccount}> 
                <Text style={styles.text}>User</Text> 
                
            </Pressable> 
            <Pressable style={styles.button} onPress={handlePressBO}> 
                <Text style={styles.text}>Business Owner</Text> 
                
            </Pressable> 
            <Pressable style={styles.button} onPress={handlePressPO}> 
                <Text style={styles.text}>Product Owner</Text> 
                
            </Pressable> 


            <View style = {{ backgroundColor: "#ffffff" }}>
                <FooterMenu />
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
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 12, 
        paddingHorizontal: 32, 
        borderRadius: 4, 
        //elevation: 3, 
        //backgroundColor: 'black', 
      }, 
});

export default HomeSysAd;
