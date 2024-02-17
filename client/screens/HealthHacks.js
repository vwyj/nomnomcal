import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';  
import FooterMenu from '../components/Menus/FooterMenu';

const HealthHacks = () => {
   
  const [healthHacks, setHealthHacks] = useState([]);


  useEffect(() => {
    const fetchHealthHacks = async () => {
      try {
        const response = await axios.get('http://ipaddress:5000/api/v1/healthhacks/getTips');
        const { data } = response;
        setHealthHacks(data.tips);
      } catch (error) {
        console.error('Error fetching health hacks:', error);
      }
    };

    
   fetchHealthHacks();


  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {healthHacks.map((hack, index) => (
          <View key={index}>
            
            <Image source={{ uri: hack.imageUrl }} style={styles.image} />
            <Text style={styles.text}>{hack.title}</Text>
            <Text style={styles.desc}>{hack.description}</Text>
            <Text style={styles.text}>{hack.tips}</Text>
            <Text style={styles.desc}>{hack.descriptiontips}</Text>
          </View>
        ))}
      </ScrollView>
      <FooterMenu />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 27,
    marginBottom: 12,
    fontWeight: 'bold',
  color: '#FFA500',  
 
  },
  dashboard: {
    width: 280,
    height: 280,
    resizeMode: "contain"
  },
  image: {
    width: 370, 
    height: 370, 
    resizeMode: 'cover',  
    marginBottom: 10,  
  },
  desc:{
    fontSize: 16,
  },
  
});

export default HealthHacks;
