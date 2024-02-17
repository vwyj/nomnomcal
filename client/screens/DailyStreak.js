import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { AuthContext } from '../context/authContext';
import { useNavigation, CommonActions } from '@react-navigation/native';

const DayCircle = ({ dayOfWeek, dayOfMonth, isLogged, isFuture }) => {
  let circleColor = '#E6554D';

  if (isLogged) {
    circleColor = '#88D7AE';
  } else if (isFuture) {
    circleColor = '#607D8B';
  }

  return (
    <TouchableOpacity style={[styles.circle, { backgroundColor: circleColor }]}>
      <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      <Text style={styles.dayOfMonth}>{dayOfMonth}</Text>
    </TouchableOpacity>
  );
};

const DailyStreak = () => {
  const [points, setPoints] = useState(0);
  const [lastLogin, setLastLogin] = useState(null);
  const [loggedDays, setLoggedDays] = useState([]); 
  const [state] = useContext(AuthContext);
  const [showDailyStreakPopup, setShowDailyStreakPopup] = useState(false); 
  const [modalVisible, setModalVisible] = useState(true);

  const navigation = useNavigation();

  const authenticatedUser = state?.user && state?.token;
  const isAdmin = authenticatedUser && state?.user?.role === 'admin';
  const isVendor = authenticatedUser && state?.user?.role === 'bo';
  const isPO = authenticatedUser && state?.user?.role === 'po';

  useEffect(() => {
    const fetchLastLoginDate = async () => {
      try {
        if (authenticatedUser) {
          const response = await fetch('http://ipaddress:5000/api/v1/auth/get-last-login-date', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });

          const { success, lastLoginDate } = await response.json();

          if (success) {
            setLastLogin(lastLoginDate);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchLastLoginDate();

    const fetchTotalPoints = async () => {
      try {
        if (authenticatedUser) {
          const response = await fetch('http://ipaddress:5000/api/v1/dailyStreak/get-total-points', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`, 
            },
          });

          const { success, totalPoints } = await response.json();

          if (success) {
            setPoints(totalPoints);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchLoggedDays = async () => {
      try {
        if (authenticatedUser) {
          const response = await fetch('http://ipaddress:5000/api/v1/dailyStreak/get-logged-days', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });

          const { success, loggedDays } = await response.json();

          if (success) {
            setLoggedDays(loggedDays);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalPoints();
    fetchLoggedDays();

     const timeout = setTimeout(() => {
      setModalVisible(false);
    }, 100000); 

    return () => clearTimeout(timeout);
  }, [authenticatedUser]);


  const handleEarnPoints = async () => {
    const currentDate = new Date();
    setLastLogin(currentDate.toISOString().split('T')[0]);
  
    try {
      if (!authenticatedUser) {
        Alert.alert('Authentication Required', 'Please log in to earn points.');
        return;
      }
  
      const response = await fetch('http://ipaddress:5000/api/v1/dailyStreak/get-dailyStreak', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${state.token}`, 
        },
      });
  
      const responseData = await response.json();
      console.log(responseData); 
  
      const { success, hasCheckedInToday } = responseData;
  
      if (success && hasCheckedInToday) {
        Alert.s('Already Check In', 'You have already checked in today!');
      } else {
        setPoints((prevPoints) => prevPoints + 10);
  
        await fetch('http://ipaddress:5000/api/v1/dailyStreak/create-dailyStreak', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.token}`, 
          },
          body: JSON.stringify({
            dateCheckIn: currentDate.toISOString().split('T')[0],
            points: 10,
          }),
        });
  
        setLoggedDays((prevLoggedDays) => [...prevLoggedDays, currentDate.toISOString().split('T')[0]]);
  
        Alert.alert('Earn Points', 'You have earned 10 points today!')
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while processing your request.');
    }
  };
  
  const renderDayCircles = () => {
    const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const currentDate = new Date();
  
    const dayCircles = [];
  
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() - currentDate.getDay() + i);
  
      const isLogged = loggedDays.includes(day.toISOString().split('T')[0]);
      const isToday = day.toISOString().split('T')[0] === currentDate.toISOString().split('T')[0];
      const isFuture = day > currentDate;
      
      let circleColor = 'red';
  
      if (isFuture || (isToday && !isLogged)) {
        circleColor = 'grey';
      } else if (isLogged || isToday) {
        circleColor = 'green';
      }
  
      dayCircles.push(
        <DayCircle
          key={i}
          dayOfWeek={dayLabels[i]}
          dayOfMonth={day.getDate()}
          isLogged={isLogged}
          isFuture={isFuture}
          circleColor={circleColor}
        />
      );
    }
  
    return dayCircles;
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>Total Points: {points}</Text>
          <TouchableOpacity style={styles.earnPointsButton} onPress={handleEarnPoints}>
            <Text>Earn Points</Text>
          </TouchableOpacity>

          <View style={styles.dayCircleContainer}>{renderDayCircles()}</View>

          <TouchableOpacity onPress={() => {
            setModalVisible(false);
            navigation.navigate('Home');
          }}>
            
            <Text style={styles.popupCloseButton}>Close</Text>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  earnPointsButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ACD7BE',
    borderRadius: 5,
  },
  dayCircleContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayOfWeek: {
    fontSize: 16,
  },
  dayOfMonth: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  popupContainer: {
    position: 'absolute',
    top: '40%',
    left: '13%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: '#E6D7BE',  
    padding: 30,  
    borderRadius: 40,  
    elevation: 8,  
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  popupText: {
    fontSize: 20,
    marginBottom: 12,  
    fontWeight: 'bold',
  },
  popupCloseButton: {
 
    fontSize: 20,
    color: 'black',  
    fontWeight: 'normal',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    position: 'absolute',
    top: -180,  
    right: -180,
  },
  alert:{
    backgroundColor: '#ACD7BE',
  },
});

export default DailyStreak;
