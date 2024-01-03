import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import moment from 'moment';

const DailyStreak = ({ navigation }) => {
    const [state, setState] = useContext(AuthContext);
    const {dailyStreak, token} =state;
    const [checkInCount, setCheckInCount] = useState(0);
    const [lastCheckedInDay, setLastCheckedInDay] = useState(null);
    //const [points, setPoints] = useState(dailyStreak?.points.toString() || '');
    const [points, setPoints] = useState(dailyStreak?.points);
    const [dateCheckIn, setDateCheckIn] = useState([]);
    const [checkLastCheckIn, setCheckLastCheckIn] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dateCheckInArray, setDateCheckInArray] = useState([]);

    const getAllUserLog = async () => {
      try {
        setLoading(true);
        const formattedDate = moment().format('ddd, DD MMM');
        const { data } = await axios.get('http://192.168.18.34:5000/api/v1/dailyStreak/get-dailyStreak');
        //const { data } = await axios.get('http://172.20.10.2:5000/api/v1/dailyStreak/get-dailyStreak');
        setLoading(false);
        console.log("Data from API:", data);
         // Extract the dateCheckIn array from the logs
        const dateCheckInArray = data?.logs.map(log => log.dateCheckIn);
        console.log("Date Check-In Array:", dateCheckInArray);
        // Filter logs based on the selected date
        const filteredLogs = data?.logs.filter(log => log.dateCheckIn === formattedDate);
        // console.log("Filtered Logs:", log.dateCheckIn);
        // console.log("Dates in logs:", filteredLogs.map(log => log.dateCheckIn));
        // setCheckLastCheckIn(filteredLogs);
      } catch (error) {
        setLoading(false);
        console.log(error);
        alert(error);
      }
    }
   // Set dateCheckInArray with the array of dates
    useEffect(() => {
    // Assuming you have a function to fetch the array of dates
    const fetchDateCheckInArray = async () => {
      const dates = await fetchDataCheckInArray();
      setDateCheckInArray(dates);
    };

  fetchDateCheckInArray();
}, []);
    useEffect(() => {
      getAllUserLog();
    }, []);
 
 const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 const currentDate = new Date().getDate();
 const currentDay = new Date().getDay(); // 0 for Sunday, 1 for Monday, etc.
  const isDateCheckedIn = (date) => {
    const formattedDate = moment(date, 'ddd, DD MMM').format('ddd, DD MMM');
  console.log("Checking date:", formattedDate);
  console.log("Dates in logs:", dateCheckInArray);

  // Check if the formatted date is present in dateCheckInArray
  return dateCheckInArray.includes(formattedDate);
  };

  // Call the function with dateCheckInArray
isDateCheckedIn(date, dateCheckInArray);
 return (
    <View style={styles.container}>
      <Text style={styles.title}>Check In Points: {points}</Text>
      <TouchableOpacity style={styles.checkInButton} >
        <Text style={styles.checkInText}>Check In</Text>
      </TouchableOpacity>
      <View style={styles.circleContainer}>
  {days.map((day, index) => {
    const date = moment().add(index - currentDay, 'days').format('ddd, DD MMM');
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.circle,
          isDateCheckedIn(date) ? styles.filledCircle : null,
        ]}
      >
        {/* <Text style={styles.circleText}>{day}</Text> */}
        <Text style={styles.circleDate}>{date}</Text>
      </TouchableOpacity>
    );
  })}
</View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
 },
 title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
 },
 checkInButton: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
 },
 checkInText: {
    color: '#fff',
 },
 circleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
 },
 circle: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 2,
    borderColor: '#007AFF',
 },
 filledCircle: {
    backgroundColor: '#007AFF',
 },
 circleText: {
    color: '#fff',
    fontSize: 16,
  },
  circleDate: {
    color: '#000',
    fontSize: 12,
  },
});
export default DailyStreak;