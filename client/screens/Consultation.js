import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Consultation = ({ navigation }) => {
  const [state] = useContext(AuthContext);
  const Stack = createNativeStackNavigator();

  // Function to navigate to the booking page
  const handleBooking = (consultantName) => {
    navigation.navigate('BookingConsultation', { consultantName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Nutritionist Consultation</Text>
      <ScrollView style={styles.scrollView}>
        {/* Consultant Profile 1 */}
        <View style={styles.consultantContainer}>
          <Image
            style={styles.image}
            source={require('../images/nutritionist1.jpg')}
          />
          <Text style={styles.consultantName}>Dr. Jane Doe</Text>
          <Text style={styles.consultantInfo}>
            Expert in diet planning, weight loss, and sports nutrition.
          </Text>
          <Button title="Book Appointment" onPress={() => handleBooking('Dr. Jane Doe')} />
        </View>

        {/* Consultant Profile 2 */}
        <View style={styles.consultantContainer}>
          <Image
            style={styles.image}
            source={require('../images/nutritionist2.jpg')}
          />
          <Text style={styles.consultantName}>Dr. John Smith</Text>
          <Text style={styles.consultantInfo}>
            Specialist in diabetes management and vegan diets.
          </Text>
          <Button title="Book Appointment" onPress={() => handleBooking('Dr. John Smith')} />
        </View>

        {/* Add more consultant profiles as needed */}
      </ScrollView>
    </View>
  );
};

// UI Design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    width: '100%',
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
