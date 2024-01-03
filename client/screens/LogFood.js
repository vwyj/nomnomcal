import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity  } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-chart-kit';

const LogFood = () => 
{
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [calorieGoal, setCalorieGoal] = useState(1760);
    const [state, setState] = useContext(AuthContext);
    const {user, token} =state;
    const [totalCalories, setTotalCalories] = useState(user?.totalCalories || 0);
    //const [totalCalories, setTotalCalories] = useState(user?.totalCalories ?? '');
    const [calorieRemaining, setCalorieRemaining] = useState(totalCalories);
    const [caloriesBreakfast, setCaloriesBreakfast] = useState('');
    const [caloriesLunch, setCaloriesLunch] = useState('');
    const [caloriesDinner, setCaloriesDinner] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(true);
    const [calendarSize, setCalendarSize] = useState('normal');
    const [showOverlay, setShowOverlay] = useState(false);
    const [displayedDate, setDisplayedDate] = useState(moment(selectedDate).format('ddd, DD MMM'));
    const [dateToDb, setDateToDb] = useState(moment(selectedDate).format('ddd, DD MMM'));
    const [isToday, setIsToday] = useState(moment().isSame(selectedDate, 'day'));
    const [loading, setLoading] = useState(false);
    const [logFood, setLogFood] = useState([]);
    const [mealB, setMealB] = useState('Breakfast');
    const [mealL, setMealL] = useState('Lunch');
    const [mealD, setMealD] = useState('Dinner');
    const [allLogFood, setAllLogFood] = useState([]);
    const [displayedCalorieRemaining, setDisplayedCalorieRemaining] = useState(calorieRemaining);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [totalCaloriesConsumedForDate, setTotalCaloriesConsumedForDate] = useState(0);

    
     // Fetch user data including total calories and logs
  // const fetchUserData = async () => {
  //   try {
  //     setLoading(true);
  //     const formattedDate = moment(selectedDate).format('ddd, DD MMM');
  //     //const {data} = await axios.get('http://192.168.18.34:5000/api/v1/allLogs/get-user-logs?date=${formattedDate}');
  //     const {data} = await axios.get('http://172.20.10.2:5000/api/v1/allLogs/get-user-logs?date=${formattedDate}');
  //     setLoading(false);

  //     // Update total calories and logs
  //     setTotalCalories(data?.user.totalCalories.toString() || '');
  //     setAllLogFood(data?.logs || []);
      
  //     // Calculate total calories consumed for the selected date
  //     const totalCaloriesConsumed = data?.logs.reduce((total, log) => {
  //       return total + log.caloriesBreakfast + log.caloriesLunch + log.caloriesDinner;
  //     }, 0);

  //     // Update remaining calories
  //     const updatedCalorieRemaining = totalCalories - totalCaloriesConsumed;
  //     setDisplayedCalorieRemaining(updatedCalorieRemaining);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //     alert(error);
  //   }
  // };


  
  const handleDeleteLog = async (index) => {
    try {
      setLoading(true);

      // Get the log entry to be deleted
      const logToDelete = allLogFood[index];

      // Make an API call to delete the log entry
      const { data } = await axios.delete(
        `http://192.168.18.34:5000/api/v1/allLogs/delete-log/${logToDelete._id}`
        //`http://172.20.10.2:5000/api/v1/allLogs/delete-log/${logToDelete._id}`
      );

      setLoading(false);
      alert(data && data.message);

      // Update the state to reflect the deleted log entry
      setAllLogFood((prevLogFood) => prevLogFood.filter((_, i) => i !== index));

      // Recalculate remaining calories if needed
      const totalCaloriesConsumed = allLogFood.reduce(
        (total, log) => total + log.caloriesBreakfast + log.caloriesLunch + log.caloriesDinner,
        0
      );
      const updatedCalorieRemaining = totalCalories - totalCaloriesConsumed;
      setDisplayedCalorieRemaining(updatedCalorieRemaining);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

    // get all log food based on the date
    const getAllUserLog = async () =>
    {
      try
      {
        setLoading(true);
        const formattedDate = moment(selectedDate).format('ddd, DD MMM');
        const {data} = await axios.get('http://192.168.18.34:5000/api/v1/allLogs/get-user-logs?date=${formattedDate}');
        //const {data} = await axios.get('http://172.20.10.2:5000/api/v1/allLogs/get-user-logs?date=${formattedDate}');
        setLoading(false);
        console.log("Data from API:", data);
        // Filter logs based on the selected date
        const filteredLogs = data?.logs.filter(log => log.dateToDb === formattedDate);
        setAllLogFood(filteredLogs);
        // Calculate total calories consumed for the selected date
        const totalCaloriesConsumed = filteredLogs.reduce((total, log) => {
          const caloriesBreakfast = log.caloriesBreakfast || 0;
          const caloriesLunch = log.caloriesLunch || 0;
          const caloriesDinner = log.caloriesDinner || 0;

          return total + caloriesBreakfast + caloriesLunch + caloriesDinner;
        }, 0);

        // Update remaining calories
        const updatedCalorieRemaining = totalCalories - totalCaloriesConsumed;
        
        // Update displayed calorie remaining
        setDisplayedCalorieRemaining(updatedCalorieRemaining);
        setTotalCaloriesConsumedForDate(totalCaloriesConsumed);
        console.log("totalCaloriesConsumed from API:", totalCaloriesConsumed);

      }
      catch (error)
      {
        setLoading(false);
        console.log(error);
        alert(error);
      }
    }

    const addBreakfast = async (mealB, breakfast, caloriesBreakfast, dateToDb) => 
    {
      const updatedCalories = calorieRemaining - caloriesBreakfast;
      console.log('Updated Calories:', updatedCalories);
      setCalorieRemaining(updatedCalories);

      try
      {
        if (!mealB || !breakfast || !caloriesBreakfast || !dateToDb)
        {
            Alert.alert("Please Fill In All Fields");
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data } = await axios.post("http://192.168.18.34:5000/api/v1/logBreakfast/create-logBreakfast", { mealB, breakfast, caloriesBreakfast, dateToDb });
        //const { data } = await axios.post("http://172.20.10.2:5000/api/v1/logBreakfast/create-logBreakfast", { mealB, breakfast, caloriesBreakfast, dateToDb });
        alert(data && data.message);alert(data && data.message);
        console.log("Response from API:", data);
        console.log("Log Food Data==> ", { mealB, breakfast, caloriesBreakfast, dateToDb });

        // Save the entry to a data store (e.g., state, database)
        const entry = { mealB, breakfast, caloriesBreakfast, dateToDb };
        setLogFood([...logFood, entry]);

        setAllLogFood([...allLogFood, entry]);

        setMealB('');
        setBreakfast('');
        setCaloriesBreakfast('');

        setLoading(false);
      }
      catch(error)
      {
        alert(error.response.data.message);
        setLoading(false);
        console.log(error);
      }

      getAllUserLog();
    };

    const addLunch = async (mealL, lunch, caloriesLunch, dateToDb) => 
    {
      const updatedCalories = calorieRemaining - caloriesLunch;
      setCalorieRemaining(updatedCalories);

      try
      {
        if (!mealL || !lunch || !caloriesLunch || !dateToDb)
        {
            Alert.alert("Please Fill In All Fields");
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data } = await axios.post("http://192.168.18.34:5000/api/v1/logLunch/create-logLunch", { mealL, lunch, caloriesLunch, dateToDb });
        //const { data } = await axios.post("http://172.20.10.2:5000/api/v1/logLunch/create-logLunch", { mealL, lunch, caloriesLunch, dateToDb });
        alert(data && data.message);
        console.log("Response from API:", data);
        console.log("Log Food Data==> ", { mealL, lunch, caloriesLunch, dateToDb });

        // Save the entry to a data store (e.g., state, database)
        const entry = { mealL, lunch, caloriesLunch, dateToDb };
        setLogFood([...logFood, entry]);

        setMealL('');
        setLunch('');
        setCaloriesLunch('');

        setLoading(false);
      }
      catch(error)
      {
        alert(error.response.data.message);
        setLoading(false);
        console.log(error);
      }

      getAllUserLog();
    };

    
    const addDinner = async (mealD, dinner, caloriesDinner, dateToDb) => 
    {
      const updatedCalories = calorieRemaining - caloriesDinner;
      setCalorieRemaining(updatedCalories);

      try
      {
        if (!mealD || !dinner || !caloriesDinner || !dateToDb)
        {
            Alert.alert("Please Fill In All Fields");
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data } = await axios.post("http://192.168.18.34:5000/api/v1/logDinner/create-logDinner", { mealD, dinner, caloriesDinner, dateToDb });
        //const { data } = await axios.post("http://172.20.10.2:5000/api/v1/logDinner/create-logDinner", { mealD, dinner, caloriesDinner, dateToDb });
        alert(data && data.message);
        console.log("Response from API:", data);
        console.log("Log Food Data==> ", { mealD, dinner, caloriesDinner, dateToDb });

        // Save the entry to a data store (e.g., state, database)
        const entry = { mealD, dinner, caloriesDinner, dateToDb };
        setLogFood([...logFood, entry]);

        setMealD('');
        setDinner('');
        setCaloriesDinner('');

        setLoading(false);
      }
      catch(error)
      {
        alert(error.response.data.message);
        setLoading(false);
        console.log(error);
      }

     getAllUserLog();
    };

    // Initial fetch
    // useEffect(() => {
    //   fetchUserData();
    //   setIsToday(moment().isSame(selectedDate, 'day'));
    // }, [selectedDate]);

    // Fetch data whenever the selected date changes
    useEffect(() => {
      getAllUserLog();
      setIsToday(moment().isSame(selectedDate, 'day'));
    }, [selectedDate]);
    console.log("All Log Food:", allLogFood);

    const chartData = [
      {
        name: 'Consumed',
        calories: totalCalories - displayedCalorieRemaining,
        color: '#B0F991', // Adjust color as needed
        legendFontColor: '#000000',
        legendFontSize: 15
      },
      {
        name: 'Remaining',
        calories: displayedCalorieRemaining,
        color: '#B5B6AC', // Adjust color as needed
        legendFontColor: '#000000',
        legendFontSize: 15,
      },
    ];

    return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
         {/* Button to open the calendar when displayed date is clicked */}
         <View style={styles.dateContainer}>
        <Text
          style={[
            styles.selectedDate,
            isToday ? styles.todayDate : styles.otherDate
          ]}
          onPress={() => setCalendarVisible(!calendarVisible)}
        >
          {isToday ? 'Today' : displayedDate}
        </Text>
        {/* Down arrow icon */}
        <TouchableOpacity onPress={() => setCalendarVisible(!calendarVisible)}>
              <Icon name="chevron-down" size={20} color="black" paddingLeft={20} />
            </TouchableOpacity>
        </View>
        {calendarVisible && (
          <View style={{ flex: 1 }}>
            <CalendarPicker
             width={380}
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
        <View>
        <View style={styles.dateAndGoal}>
         
         {/* <Text style={styles.calorieGoal}>Calorie Goal: {calorieGoal}</Text> */}
         <Text style={styles.calorieGoal}>Calorie Goal: {totalCalories}</Text>
       </View>
        <PieChart
          data={chartData}
          width={350}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: '#08130D',
            backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2,
            barPercentage: 0.5,
          }}
          accessor="calories"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        </View>

        
        {/* <Text style={styles.title}>Calorie Remaining: {displayedCalorieRemaining}</Text> */}
        
        {/* <Text style={styles.subtitle}>Logs for {moment(selectedDate).format('ddd, DD MMM')}</Text> */}
        
          <View style={styles.mealContainer}>
            <Text style={styles.subtitle}>Breakfast</Text>
            {allLogFood.map((log, index) => (
            <View key={index}>
            <Text style={styles.food}>{log.breakfast} {log.caloriesBreakfast}</Text>
            </View>
               ))}
            <Text style={styles.food}>{breakfast}</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputField} placeholder="Enter Food" onChangeText={(text) => setBreakfast(text)}/>
              <TextInput style={styles.inputField} keyboardType="numeric" placeholder="Enter Calories"  onChangeText={(text) => setCaloriesBreakfast(text)}/>
            </View>
            <Button style={styles.button} title="Add Breakfast" onPress={() => {  console.log('mealB:', mealB);
                                                            console.log('breakfast:', breakfast);
                                                            console.log('dateToDb:', dateToDb);
                                                            console.log('caloriesBreakfast:', caloriesBreakfast);addBreakfast(mealB, breakfast, caloriesBreakfast, dateToDb);}} />
          </View>
          <View style={styles.mealContainer}>
            <Text style={styles.subtitle}>Lunch</Text>
            {allLogFood.map((log, index) => (
            <View key={index}>
            <Text style={styles.food}>{log.lunch} {log.caloriesLunch}</Text>
            </View>
               ))}
            <Text style={styles.food}>{lunch}</Text>
            <View style={styles.inputContainer}>
              <TextInput style={styles.inputField} placeholder="Enter Food" onChangeText={(text) => setLunch(text)}/>
              <TextInput style={styles.inputField} keyboardType="numeric" placeholder="Enter Calories" onChangeText={(text) => setCaloriesLunch(text)}/>
            </View>
            <Button style={styles.button} title="Add Lunch" onPress={() => { console.log('mealL:', mealL);
                                                       console.log('lunch:', lunch);
                                                       console.log('dateToDb:', dateToDb);
                                                       console.log('caloriesLunch:', caloriesLunch);addLunch(mealL, lunch, caloriesLunch, dateToDb);}} />
            </View>
            <View style={styles.mealContainer}>
            <Text style={styles.subtitle}>Dinner</Text>
            {allLogFood.map((log, index) => (
            <View key={index}>
            <Text style={styles.food}>{log.dinner} {log.caloriesDinner}</Text>
            </View>
               ))}
            <Text style={styles.food}>{dinner}</Text>
            <View style={styles.inputContainer}>
            <TextInput style={styles.inputField} placeholder="Enter Food" onChangeText={(text) => setDinner(text)}/>
            <TextInput style={styles.inputField} keyboardType="numeric" placeholder="Enter Calories" onChangeText={(text) => setCaloriesDinner( text)}/>
            </View>
            <Button style={styles.button} title="Add Dinner" onPress={() => { console.log('mealD:', mealD);
                                                        console.log('dinner:', dinner);
                                                        console.log('dateToDb:', dateToDb);
                                                        console.log('caloriesDinner:', caloriesDinner);addDinner( mealD, dinner, caloriesDinner, dateToDb);}} />
            </View>
       

       
        </ScrollView>
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
    //justifyContent: 'center', // Add this line to center the content horizontally
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 120,
  },
  calorieGoal: {
    fontSize: 20,
    textAlign: 'center',
     fontWeight: 'bold',
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
  },
  todayDate: {
    color: 'green', // Adjust the color for today's date
    paddingLeft: 30,
  },
  otherDate: {
    color: 'black', // Adjust the color for other dates
    paddingLeft: 3,
  },
 
});

export default LogFood;