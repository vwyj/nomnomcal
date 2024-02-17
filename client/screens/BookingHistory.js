import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { AuthContext } from '../context/authContext';
import axios from 'axios'; // Import axios for making HTTP requests
import FooterMenu from '../components/Menus/FooterMenu';
import moment from 'moment';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [state] = useContext(AuthContext);

  useEffect(() => {
    // Fetch booking history when the component mounts
    fetchBookingHistory();
  }, []);
  

  // Function to fetch booking history from the backend API
  const fetchBookingHistory = async () => {
    try {
      const response = await axios.get(`http://ipaddress:5000/api/v1/bookings/getBooking`, {
        headers: {
          Authorization: `Bearer ${state.token}`
        },
      });
      // Map through the bookings and format the selectedDate
      const formattedBookings = response.data.bookings.map(booking => ({
        ...booking,
        
      }));
      // Set the retrieved bookings with formatted dates in state
      setBookings(formattedBookings);
    } catch (error) {
      console.error('Error fetching booking history:', error);
    }
  };

  return (
    <ImageBackground
    source={require('../images/consultation2.png')}  
    style={styles.backgroundImage}
    resizeMode="cover"
  >
       <View style={styles.overlay} />
    <View style={styles.container}>
      <ScrollView>
        {bookings.map((booking, index) => (
          <View key={index} style={styles.bookingContainer}>
            
            <View style={styles.bookingDetails}>
              <Text style={styles.bookingTitle}>{booking.type}</Text>
              <Text style={styles.bookingName}>{booking.consultantName}</Text>
              <Text style={styles.bookingName}>{booking.selectedTimeSlot}</Text>
              <Text style={styles.bookingName}>{booking.selectedDate}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style = {{ backgroundColor: "#ffffff" }}> 
      <FooterMenu />
    </View>
    </View>
    </ImageBackground>
  
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  lightenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',  
     
  },
  backgroundImage:{
    flex: 1,
    width: '100%',  
    height: '100%',
    
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookingImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  bookingDetails: {
    flex: 1,
  backgroundColor: '#fce3cf',
  padding: 10,
  borderRadius: 8,
  marginVertical: 5,
  },
  bookingTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bookingName:{
    fontSize: 19,
  },
  bookingDate: {
    fontSize: 16,
    color: '#666',
  },
  bookingTime: {
    fontSize: 16,
    color: '#666',
  },
  bookingStatus: {
    fontSize: 16,
    color: '#666',
  },
});

export default BookingHistory;
