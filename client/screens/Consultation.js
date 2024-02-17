import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,ImageBackground} from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FooterMenu from '../components/Menus/FooterMenu'; 
const Consultation = ({ navigation, route }) => {
  const [state] = useContext(AuthContext);
  const Stack = createNativeStackNavigator();
  const { type } = route.params;

  console.log("Type:", type);

  // Function to navigate to the booking page
  const handleBooking = (consultantName) => {
    navigation.navigate('BookingConsultation', { type, consultantName });
  };
  return (
    <View style = {styles.container}>
    <ImageBackground
      source={require('../images/consultation2.png')}  
      style={styles.backgroundImage}
      resizeMode="cover"
    >
     
 
          <Text style={styles.headerText}>Consultation Booking</Text>
          {/* Consultant Profile 1 */}
          <View style={styles.consultantContainer}>
            <Image
              style={styles.image}
              source={require('../images/nutritionist1.jpg')}
            />
            <Text style={styles.consultantName}>Dr. Jane Doe</Text>
            <Text style={styles.consultantInfo}>
              Specialist in diet planning and weight loss
            </Text>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => handleBooking('Dr. Jane Doe')}>
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>
          

          {/* Consultant Profile 2 */}
          <View style={styles.consultantContainer}>
            <Image
              style={styles.image}
              source={require('../images/nutritionist2.jpg')}
            />
            <Text style={styles.consultantName}>Dr. John Smith</Text>
            <Text style={styles.consultantInfo}>
              Specialist in diabetes management and vegan diets
            </Text>
            <TouchableOpacity style={styles.buttonStyle2} onPress={() => handleBooking('Dr. John Smith')}>
              <Text style={styles.buttonText}>Book Appointment</Text>
            </TouchableOpacity>

          </View>
          {/* Add more consultant profiles as needed */}
        </View>
 
      
    
    </ImageBackground>
        <View >
        <FooterMenu/>
    </View>  


</View>
    
  );

};
 
// UI Design
const styles = StyleSheet.create({
  container: 
  {
      flex: 1,
      // margin: 10,
      justifyContent: "space-between",
      // marginBottom: 40,
  },
 
 
  buttonText: {
    color: 'white', // Button text color
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage:{
    paddingHorizontal: 130,
  },
  
  buttonStyle: {
    backgroundColor: '#24987a', 
    //paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:10
  },
  buttonStyle2: {
    backgroundColor: '#24987a', 
    //paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // marginBottom:10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    textAlign: 'center',
  },
 
  consultantContainer: {
    alignItems: 'center',
    marginBottom: 30,
    
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
 
  },
  consultantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
  consultantInfo: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 16,
    marginTop: 5,
  },
});

export default Consultation;