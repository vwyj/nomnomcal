// screens/DiaryScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import axios from 'axios';
import balancedDiet from '../images/balancedDiet.jpg';
import smoothie from '../images/smoothie.png';

const HealthHacks = () => {
  const [meal, setMeal] = useState('');
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [diary, setDiary] = useState([]);
  const [loading, setLoading] = useState(false);


  return (
    <View style={styles.container}>
      
      <Image
            source={balancedDiet}
            style={styles.dashboard}
            resizeMode="contain"
      />
      <Text style={styles.text}>Balanced Diet</Text>
      <Text>Eating a balanced diet rich in fruits, vegetables, and whole grains is essential for maintaining good health and achieving your fitness goals. Make sure to include a variety of nutrient-dense foods in your meals.</Text>
      <Image
            source={smoothie}
            style={styles.dashboard}
            resizeMode="contain"
      />
      <Text style={styles.text}>Healthy Smoothie</Text>
      <Text>Start your day with a nutritious smoothie packed with vitamins and minerals. It's a delicious and convenient way to fuel your body for the day ahead.</Text>
      
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  dashboard: {
    width: 370,
    height: 220,
    //marginBottom: 20,
   // marginRight: 300,
    resizeMode: "contain"
 },
});

export default HealthHacks;
