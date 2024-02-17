// MockPassLogin.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import singpassLogo from '../../images/singpassLogo.png';
import whiteSingpassButton from '../../images/whiteSingpass.png';

const MockPassLogin = () => {
  const [nric, setNric] = useState('');
  const navigation = useNavigation();

  const getUserData = async () => {

    if (!nric) {
      Alert.alert('Error', 'Please enter your NRIC');
      return;
    }
    
    navigation.navigate('singpassAuthReq', { nric });
   
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={singpassLogo} style={styles.logo}  resizeMode="contain" />
        <View style={{ marginHorizontal: 20 }}>
        <Text style={{ marginTop: 200, fontWeight: 'bold', fontSize: 20 }}>Enter NRIC:</Text>

          <TextInput
            style={styles.input}
            placeholder="NRIC"
            value={nric}
            onChangeText={(text) => setNric(text)}
          />

          <TouchableOpacity  onPress={getUserData}>
           <Image source={whiteSingpassButton} style={styles.imageButton} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e1d5c9',
    backgroundColor: '#ffffff',
  },

  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e2225',
    marginBottom: 20,
    marginTop: 80,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  logo: {
    width: 200, 
    height: 100,
    alignSelf: 'center', 
    marginTop: 80
  },
  imageButton: {
    marginTop: 30,
    marginBottom: 400,
    alignSelf: 'center', 
  },
});

export default MockPassLogin;
