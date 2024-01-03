//import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
//import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const GoalMsg = () => {
 return (
    <View style={styles.screen}>
      <View style={styles.messageBox}>
        <Text style={styles.title}>Congratulations!</Text>
        <Text style={styles.description}>Description: Your daily net Calorie goal : 1,5000 </Text>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
 messageBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
 },
 title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
 },
 description: {
    fontSize: 16,
    textAlign: 'center',
 },
});

export default GoalMsg;