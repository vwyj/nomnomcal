import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity  } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const BookingConsultation = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [calendarSize, setCalendarSize] = useState('normal');
    const [showOverlay, setShowOverlay] = useState(false);
    const [displayedDate, setDisplayedDate] = useState(moment(selectedDate).format('ddd, DD MMM'));
    const [dateToDb, setDateToDb] = useState(moment(selectedDate).format('ddd, DD MMM'));
    const [isToday, setIsToday] = useState(moment().isSame(selectedDate, 'day'));
    const [loading, setLoading] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);

    return (
    <View>
    {/* Button to open the calendar when displayed date is clicked */}
    <View style={styles.dateContainer}>
   <Text
     style={styles.selectedDate}
     onPress={() => setCalendarVisible(!calendarVisible)}
   >
     {isToday ? 'Today' : displayedDate}
   </Text>
   {/* Down arrow icon */}
   <TouchableOpacity onPress={() => setCalendarVisible(!calendarVisible)}>
         <Icon name="chevron-down" size={20} color="black" />
       </TouchableOpacity>
   </View>
   {calendarVisible && (
     <View>
       <CalendarPicker
         onDateChange={(date) => {
           setSelectedDate(date);
           setCalendarVisible(false); // Close the calendar when a date is selected
           setShowOverlay(true);
           const newIsToday = moment().isSame(date, 'day');
           setIsToday(newIsToday);
           if (newIsToday) {
             setDisplayedDate('Today');
           } else {
             setDisplayedDate(moment(date).format('ddd, DD MMM'));
           }
         }}
       />
     </View>
     )}
   </View>
    );
};


const styles = StyleSheet.create({
    container: {
       flex: 1,
       backgroundColor: '#fff',
       paddingTop: 50,
    },
    title: {
       fontSize: 24,
       textAlign: 'center',
       marginBottom: 10,
    },
    scrollView: {
       marginHorizontal: 20,
    },
    subtitle: {
       fontSize: 18,
       textAlign: 'center',
       marginBottom: 5,
    },
    food: {
       fontSize: 16,
       textAlign: 'center',
       marginBottom: 15,
    },
    inputContainer: {
       flexDirection: 'row',
       justifyContent: 'space-around',
    },
    inputField: {
       width: '40%',
       borderColor: 'gray',
       borderWidth: 1,
       padding: 10,
       marginBottom: 10,
    },
    dateAndGoal: {
       flexDirection: 'column',
       alignItems: 'center',
       marginBottom: 10,
     },
     dateContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       marginLeft: 140,
       
     },
     selectedDate: {
       fontSize: 20,
       textAlign: 'center',
       fontWeight: 'bold',
       marginRight: 10,
     },
     calorieGoal: {
       fontSize: 18,
       textAlign: 'center',
     },
     mealContainer: {
       backgroundColor: '#dcdcdc', // Grey background color
       padding: 10, // Adjust padding as needed
       borderRadius: 5, // Add borderRadius for rounded corners
       marginTop: 10, // Add spacing from the previous section
     },
     button: {
       borderColor: '#7D7A7A',
       backgroundColor: '#7D7A7A',
     }
   });
export default BookingConsultation;
