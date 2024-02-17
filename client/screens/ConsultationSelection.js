import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu'; 
import { useNavigation } from '@react-navigation/native'; 

const ConsultationSelection = ({ navigation }) => {


  return (
<View style = {styles.container}>
    <ImageBackground
    source={require('../images/consultation1.png')} 
    style={styles.backgroundImage}
    resizeMode="cover"
  >
      <View style={styles.overlay} />
      <View style={styles.titleContainer}>
      <View style={styles.overlayContainer}>
        <Text style={styles.title}>Select a Consultation Type</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#24987a"
            title="Weight Management Consultation"
            onPress={() => navigation.navigate('Consultation', { type: 'Weight Management Consultation' })}
          />
         
        </View>
        <View style={styles.buttonContainer}>
          <Button
            color="#24987a"
            title="Dietary Consultation (Allergies and Intolerances)"
            onPress={() => navigation.navigate('Consultation', { type: 'Dietary Consultation (Allergies and Intolerances)' })}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            color="#24987a"
            title="Nutritional consultation"
            onPress={() => navigation.navigate('Consultation', { type: 'Nutritional consultation' })}
          />
          
        </View>

        <View style={styles.topRightButton}>
  <TouchableOpacity onPress={() => navigation.navigate('BookingHistory')}>
    <Text style={styles.topRightButtonText}>Booking History</Text>
  </TouchableOpacity>
</View>

       
        
    
      </View>
      
      
    </ImageBackground>
   
    <View >
                <FooterMenu/>
            </View>  


    </View>
  );
  
};


const styles = StyleSheet.create({
  container: 
    {
        flex: 1,
        // margin: 10,
        justifyContent: "space-between",
        // marginTop: 40,
    },
  overlay:{
    position: 'absolute',  
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
 
  titleContainer: {
    width: '100%', 
    paddingTop: 20, // Add padding at the top for spacing from the status bar or screen edge
    alignItems: 'center', // Center the title horizontally
  },
  title: {
    fontSize: 26,  
    color: '#333',  
    padding: 25,
    fontWeight:'bold',
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',  
    paddingVertical: 12,  
    backgroundColor: '#24987a',  
    borderRadius: 25, 
    borderWidth: 0,  
    elevation: 5, 
    alignItems: 'center', 
    justifyContent: 'center',  
  },
  button: {
    backgroundColor: '#007bff',  
    color: '#24987a',  
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,  
    borderWidth: 0,  
    marginVertical: 8,  
    width: '80%',  
    textAlign: 'center',
  },
  buttonText: {
    color: '#24987a',
    fontSize: 16,
    fontWeight: '600',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Lighten with white overlay
    justifyContent: 'center',
  },
  topRightButton: {
    position: 'absolute',
    top: -100,
    right: 20,
  },
  topRightButtonText: {
    color: '#C04000',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ConsultationSelection;