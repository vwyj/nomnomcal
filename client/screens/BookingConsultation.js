import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity,ImageBackground} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import FooterMenu from '../components/Menus/FooterMenu'; 

const CustomAlert = ({visible, onClose, message}) => {
  return (
    
    <View style={styles.overlay} >
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="times" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalText}>{message}</Text>
        </View>
      </View>
     
    </Modal>
     </View>

  );
};


const BookingConsultation = ({ route }) => {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [calendarSize, setCalendarSize] = useState('normal');
    const [showOverlay, setShowOverlay] = useState(false);
    const [displayedDate, setDisplayedDate] = useState(moment(selectedDate).format('ddd, DD MMM'));
    const [dateToDb, setDateToDb] = useState(moment(selectedDate).format('ddd, DD MMM'));
    const [isToday, setIsToday] = useState(moment().isSame(selectedDate, 'day'));
    const [loading, setLoading] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(true);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('08:00');  
 // Define state variables
    const [modalVisible, setModalVisible] = useState(false);
    const { type, consultantName } = route.params; 
    const [state, setState] = useContext(AuthContext);
    const { user, token: accessToken } = state;

    useEffect(() => {
      console.log("Type:", type);
      console.log("Consultant Name:", consultantName);
  }, [type, consultantName]);

    // Sample booking confirmation message
    const confirmMessage = `Your consultation is booked.`;
    // Generate time slots
const generateTimeSlots = () => {
  const slots = [];
  let startTime = moment('08:00', 'HH:mm'); // Start time
  const endTime = moment('18:00', 'HH:mm'); // End time

  while (startTime <= endTime) {
      slots.push(startTime.format('HH:mm'));
      startTime = startTime.add(2, 'hours');
  }

  return slots;
};


 // Function to handle booking confirmation
// Function to handle booking confirmation
const handleConfirmBooking = async () => {
  try {
    const response = await axios.post(
      `http://ipaddress:5000/api/v1/bookings/createBooking`,
      {
        consultantName,
        type,
        selectedDate: moment(selectedDate).format("ddd, DD MMM"),
        selectedTimeSlot,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    Alert.alert(
      "Booking Confirmation",
      `Your consultation is booked for ${moment(selectedDate).format("ddd, DD MMM YYYY")} at ${selectedTimeSlot}.`,
      [
        { 
          text: "OK", 
          onPress: () => navigation.navigate('Home') 
        }
      ]
    );
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};



 


return (
  <View style={styles.container}>
    <ImageBackground
    source={require('../images/consultation2.png')}  
    style={styles.backgroundImage}
    resizeMode="cover"
  >
            {/* Button to open the calendar */}
            <View style={styles.dateContainer}>
                <Text style={styles.selectedDate} onPress={() => setCalendarVisible(!calendarVisible)}>
                    {moment(selectedDate).format('ddd, DD MMM')}
                </Text>
                {/* <TouchableOpacity onPress={() => setCalendarVisible(!calendarVisible)}>
                    <Icon name="chevron-down" size={20} color="black" />
                </TouchableOpacity> */}
            </View>

            {/* Calendar Picker */}
            {calendarVisible && (
                <View style={styles.calendarContainer}>
                    <CalendarPicker
                        onDateChange={(date) => {
                            setSelectedDate(date);
                            setCalendarVisible(false);
                        }}
                    />
                </View>
            )}

            {/* Time Slot Picker */}
            <View style={styles.timeSlotPicker}>
                <Text style={styles.subtitle}>Select a Timeslot:</Text>
                <Picker
                    selectedValue={selectedTimeSlot}
                    onValueChange={(itemValue) => setSelectedTimeSlot(itemValue)}
                >
                    {generateTimeSlots().map((slot, index) => (
                        <Picker.Item key={index} label={slot} value={slot} />
                    ))}
                </Picker>
            </View>

            {/* Confirm Booking Button */}
            <TouchableOpacity style={styles.confirmButtonStyle} onPress={handleConfirmBooking}>
  <Text style={styles.confirmButtonText}>Confirm Booking</Text>
            </TouchableOpacity>

            
            </ImageBackground>
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
    },
dateContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
TouchableOpacity: {
  color: 'white', // Button text color
  fontSize: 17,
  fontWeight: 'bold',
  textAlign: 'center',
},
backgroundImage:{
  paddingHorizontal: 130,
},
TouchableOpacity: {
  backgroundColor: '#24987a', 
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
selectedDate: {
  fontSize: 20,
  fontWeight: 'bold',
},
timeSlotPicker: {
  marginHorizontal: 20,
  marginTop: 20,
},
calendarContainer: {
  marginHorizontal: 20,
  marginTop: 20,
},
subtitle: {
  fontSize: 18,
  marginBottom: 5,
},
backgroundImage:{
  paddingVertical: 2,
  paddingHorizontal: 130,
},
backgroundImage: {
  flex: 1,
},
overlay: {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',  
},
confirmButtonStyle: {
  backgroundColor: '#24987a', // Vibrant orange for a bold statement
  paddingVertical: 14,
  paddingHorizontal: 30,
  borderRadius: 5, // Slight rounding for a bold look
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 20,
  width: '80%',
  alignSelf: 'center',
  elevation: 4, // Shadow effect for Android
  shadowOpacity: 0.3, // Shadow for iOS
  shadowRadius: 5,
  shadowOffset: { height: 2, width: 2 },
},
confirmButtonText: {
  color: '#FFF',
  fontSize: 18,
  fontWeight: 'bold',
},
});

export default BookingConsultation;