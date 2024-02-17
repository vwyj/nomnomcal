import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import loginLogo from '../../images/logo.png';
import singpassLogo from '../../images/singpassLogo.png';

const SingpassAuthReq = ({ route }) => {

    const { nric } = route.params;
  const navigation = useNavigation();

  const handleCancel = () => {
    navigation.navigate('Login'); 
  };

  const handleAgree = () => {
    navigation.navigate('Registration' , { nric }); 
  };

  return (
    <View style={styles.container}>
      <Image source={singpassLogo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.text}>Singpass retrieves personal data from relevant government agencies to pre-fill the relevant fields, making digital transactions faster and more convenient</Text>

      <Text style={styles.boldtext}>This digital service is requesting the following information from Singpass, for the purpose of demonstrating MyInfo APIs:</Text>
      <View style={styles.innercontainer}>
        <Text style={styles.boldtext}>{'>  '}NRIC/FIN</Text>
        <Text style={styles.boldtext}>{'>  '}Name</Text>
        <Text style={styles.boldtext}>{'>  '}Registered Address</Text>
        <Text style={styles.boldtext}>{'>  '}Date Of Birth</Text>
        <Text style={styles.boldtext}>{'>  '}Gender</Text>

    
      </View>
          <Text style={styles.text}>Clicking the "I Agree" button permits this digital service to retrieve your data based on the Terms of Use</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.agreeButton]} onPress={handleAgree}>
          <Text style={styles.buttonText}>I Agree</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    
  },
  innercontainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 100,
    height: '25%'
  },
  text: {
    fontSize: 15,
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
  },
  boldtext: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#888888',
    marginRight: 10,
  },
  agreeButton: {
    backgroundColor: 'red',
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
  logo: {
    width: 200, 
    height: 100, 
    alignSelf: 'center', 
    marginTop: 80,
  },
});

export default SingpassAuthReq;
