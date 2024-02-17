import React, { useState, useEffect, useContext } from 'react';
import { Modal, Alert, StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity,ImageBackground  } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PieChart } from 'react-native-chart-kit';
import FooterMenu from '../components/Menus/FooterMenu'; 

const DailyDiary = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isToday, setIsToday] = useState(moment().isSame(selectedDate, 'day'));
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [breakfast, setBreakfast] = useState('');
    const [caloriesBreakfast, setCaloriesBreakfast] = useState('');
    const [state, setState] = useContext(AuthContext);
    const { user, token: accessToken } = state;
    const [loading, setLoading] = useState(false);
    const [entries, setEntries] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEntryId, setSelectedEntryId] = useState('');
    const [updatedFoodItem, setUpdatedFoodItem] = useState('');
    const [updatedCalories, setUpdatedCalories] = useState('');
    const [lunch, setLunch] = useState('');
    const [caloriesLunch, setCaloriesLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [caloriesDinner, setCaloriesDinner] = useState('');
    const [entriesLunch, setEntriesLunch] = useState([]);
    const [entriesDinner, setEntriesDinner] = useState([]);
    const [totalConsumedCalories, setTotalConsumedCalories] = useState(0);
    const [remainingCalories, setRemainingCalories] = useState(0);

    useEffect(() => {
      fetchEntriesForDate(selectedDate);
    }, [selectedDate]);

    const fetchEntriesForDate = async (date) => {
      try {
        setLoading(true); 
    
        const responseBreakfast = await axios.get(`http://ipaddress:5000/api/v1/dailydiary/getEntry?date=${moment(date).format('YYYY-MM-DD')}&mealType=Breakfast`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        const responseLunch = await axios.get(`http://ipaddress:5000/api/v1/dailydiary/getEntry?date=${moment(date).format('YYYY-MM-DD')}&mealType=Lunch`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const responseDinner = await axios.get(`http://ipaddress:5000/api/v1/dailydiary/getEntry?date=${moment(date).format('YYYY-MM-DD')}&mealType=Dinner`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
    
        console.log('Fetched breakfast entries:', responseBreakfast.data);
        console.log('Fetched lunch entries:', responseLunch.data);
        console.log('Fetched dinner entries:', responseDinner.data);
    
        setEntries(responseBreakfast.data);
        setEntriesLunch(responseLunch.data);
        setEntriesDinner(responseDinner.data);
    
        setLoading(false);
      } catch (error) {
        console.error('Error fetching entries:', error);
        setLoading(false);
      }
    };
    
    
    

    const createBreakfastEntry = async () => {
      try {
         const totalCalories = totalConsumedCalories + parseInt(caloriesBreakfast);
         setTotalConsumedCalories(totalCalories);
         setRemainingCalories(user.totalCalories - totalCalories);
     
         const oneThirdOfTotalCalories = user.totalCalories / 3;
         if (totalCalories > oneThirdOfTotalCalories) {
           Alert.alert(
             'Caution',
             "You've enjoyed a delightful breakfast, comprising one-third of your daily calorie allowance. Just a gentle reminder to keep a mindful balance throughout the day.",
             [
               { text: 'OK', onPress: () => console.log('OK Pressed') },
             ]
           );
         }
         else if (totalCalories < oneThirdOfTotalCalories) {
           Alert.alert(
             'Health Tip',
             "Bravo on your Breakfast! You've consumed around one-third of your daily calories. Remember to choose nourishing options as you continue with your day.",
             [
               { text: 'OK', onPress: () => console.log('OK Pressed') },
             ]
           );
         }

        setLoading(true);
        const response = await axios.post(
          'http://ipaddress:5000/api/v1/dailydiary/createEntry',
          {
            mealType: 'Breakfast',
            foodItem: breakfast,
            calories: parseInt(caloriesBreakfast),
            date: moment(selectedDate).toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Diary entry created:', response.data);
        setLoading(false);
        setBreakfast('');
        setCaloriesBreakfast('');
        
        setEntries([...entries, response.data]);

       
      } catch (error) {
        console.error('Error creating diary entry:', error);
        setLoading(false);
      }
    };

    const createLunchEntry = async () => {
      try {

         const totalCalories = totalConsumedCalories + parseInt(caloriesLunch);
         setTotalConsumedCalories(totalCalories);
         setRemainingCalories(user.totalCalories - totalCalories);
     
         const oneThirdOfTotalCalories = user.totalCalories / 3;
         if (totalCalories > oneThirdOfTotalCalories) {
           Alert.alert(
             'Caution',
             "You've enjoyed a delightful lunch, comprising one-third of your daily calorie allowance. Just a gentle reminder to keep a mindful balance throughout the day.",
             [
               { text: 'OK', onPress: () => console.log('OK Pressed') },
             ]
           );
         }
         else if (totalCalories < oneThirdOfTotalCalories) {
           Alert.alert(
             'Health Tip',
             "Bravo on your Lunch! You've consumed around one-third of your daily calories. Remember to choose nourishing options as you continue with your day.",
             [
               { text: 'OK', onPress: () => console.log('OK Pressed') },
             ]
           );
         }

        setLoading(true);
        const response = await axios.post(
          'http://ipaddress:5000/api/v1/dailydiary/createEntry',
          {
            mealType: 'Lunch',
            foodItem: lunch,
            calories: parseInt(caloriesLunch),
            date: moment(selectedDate).toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Diary entry created:', response.data);
        setLoading(false);
        setLunch('');
        setCaloriesLunch('');
        
        // Update entries state with the new entry
        setEntriesLunch([...entriesLunch, response.data]);
        
      } catch (error) {
        console.error('Error creating diary entry:', error);
        setLoading(false);
      }
    };


    
    const createDinnerEntry = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          'http://ipaddress:5000/api/v1/dailydiary/createEntry',
          {
            mealType: 'Dinner',
            foodItem: dinner,
            calories: parseInt(caloriesDinner),
            date: moment(selectedDate).toISOString(),
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Diary entry created:', response.data);
        setLoading(false);
        setDinner('');
        setCaloriesDinner('');
        

        setEntriesDinner([...entriesDinner, response.data]);

        const totalCalories = totalConsumedCalories + parseInt(caloriesDinner);
        setTotalConsumedCalories(totalCalories);
        setRemainingCalories(user.totalCalories - totalCalories);
      } catch (error) {
        console.error('Error creating diary entry:', error);
        setLoading(false);
      }
    };
    
    useEffect(() => {
      const totalCalories = entries.reduce((total, entry) => total + entry.calories, 0) +
                           entriesLunch.reduce((total, entry) => total + entry.calories, 0) +
                           entriesDinner.reduce((total, entry) => total + entry.calories, 0);
      

      setTotalConsumedCalories(totalCalories);
    

      const remainingCalories = user.totalCalories - totalCalories;
      setRemainingCalories(remainingCalories);
    }, [entries, entriesLunch, entriesDinner, user]);
    
    

    const handleUpdateEntry = async () => {
      try {
        const response = await axios.put(
          `http://ipaddress:5000/api/v1/dailydiary/updateEntry/${selectedEntryId}`,
          { foodItem: updatedFoodItem, calories: updatedCalories },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log('Entry updated:', response.data);
        setShowEditModal(false);
        fetchEntriesForDate(selectedDate);
      } catch (error) {
        console.error('Error updating entry:', error);
      }
    };

    const handleDeleteEntry = async (entryId) => {
      Alert.alert(
        'Confirm Deletion',
        'Are you sure you want to delete this entry?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: async () => {
              try {
                const response = await axios.delete(
                  `http://ipaddress:5000/api/v1/dailydiary/deleteEntry/${entryId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${accessToken}`,
                    },
                  }
                );
                console.log('Entry deleted:', response.data);
                fetchEntriesForDate(selectedDate);
              } catch (error) {
                console.error('Error deleting entry:', error);
              }
          }},
        ],
        { cancelable: false }
      );
    };
    

    const handleEditPress = (entryId, foodItem, calories) => {
      setSelectedEntryId(entryId);
      setUpdatedFoodItem(foodItem);
      setUpdatedCalories(calories.toString());
      setShowEditModal(true);
    };

 

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        
          <View>
            <View style={styles.dateContainer}>
              <Text
                style={[styles.selectedDate, isToday ? styles.todayDate : styles.otherDate]}
                onPress={() => setCalendarVisible(!calendarVisible)}
              >
                {isToday ? 'Today' : moment(selectedDate).format('ddd, DD MMM')}
              </Text>
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
                    setCalendarVisible(false);
                    setIsToday(moment().isSame(date, 'day'));
                  }}
                />
              </View>
            )}
          </View>

          <View style={styles.pieChartContainer}>
                <PieChart
                    data={[
                        {
                            name: 'Consumed',
                            calories: totalConsumedCalories,
                            color: '#B0F991',
                            legendFontColor: '#000',
                            legendFontSize: 15,
                        },
                        {
                            name: 'Remaining',
                            calories: remainingCalories,
                            color: '#B5B6AC',
                            legendFontColor: '#000',
                            legendFontSize: 15,
                        },
                    ]}
                    width={350}
                    height={200}
                    chartConfig={{
                        backgroundColor: '#FFFFFF',
                        backgroundGradientFrom: '#FFFFFF',
                        backgroundGradientTo: '#FFFFFF',
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    accessor="calories"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
          <View style={styles.mealContainer}>
          <ImageBackground
    source={require('../images/breakfast.png')} 
    style={styles.mealBackground}
    resizeMode="cover"
  >
    <View style={styles.overlay} />
    <Text style={styles.subtitle}>Breakfast</Text>
    <View style={styles.horizontalLine}></View>

            <View>
              
              {entries.map(entry => (
                <View key={entry._id} style={styles.entryContainer}>
                <View style={styles.entryTextContainer}>
                  <View style={styles.foodCaloriesContainer}>
                    <Text style={styles.entryText}>{entry.foodItem}</Text>
                    <Text style={styles.entryText}>{entry.calories} kcal</Text>
                  </View>
                </View>
                <View style={styles.editDeleteContainer}>
                  <TouchableOpacity onPress={() => handleEditPress(entry._id, entry.foodItem, entry.calories)}>
                    <Icon name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteEntry(entry._id)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              ))}
            </View>
          <Modal visible={showEditModal} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.editText}>Edit Entry</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter updated food item"
                  value={updatedFoodItem}
                  onChangeText={setUpdatedFoodItem}
                />
                <TextInput
                  style={styles.inputField}
                  keyboardType="numeric"
                  placeholder="Enter updated calories"
                  value={updatedCalories}
                  onChangeText={setUpdatedCalories}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.button2} onPress={handleUpdateEntry}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button2} onPress={() => setShowEditModal(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.inputContainer}>
<TextInput
  style={styles.inputField}
  placeholder="Enter Food"
  placeholderTextColor="#000" 
  value={breakfast}
  onChangeText={(text) => setBreakfast(text)}
/>
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                placeholderTextColor="#000"
                placeholder="Enter Calories"
                value={caloriesBreakfast}
                onChangeText={(text) => setCaloriesBreakfast(text)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={createBreakfastEntry}>
              <Text style={styles.addText}>Add Intake</Text>
            </TouchableOpacity>
            </ImageBackground>
            </View>
            <View style={styles.mealContainer}>
            <ImageBackground
    source={require('../images/lunch.png')} 
    style={styles.mealBackground}
    resizeMode="cover"
  >
    <View style={styles.overlay} />
    <View style={styles.horizontalLine}></View>
            <Text style={styles.subtitle}>Lunch</Text>
            <View style={styles.horizontalLine}></View>
          
            <View>
              
              {entriesLunch.map(entryLunch => (
                <View key={entryLunch._id} style={styles.entryContainer}>
                <View style={styles.entryTextContainer}>
                  <View style={styles.foodCaloriesContainer}>
                    <Text style={styles.entryText}>{entryLunch.foodItem}</Text>
                    <Text style={styles.entryText}>{entryLunch.calories} kcal</Text>
                  </View>
                </View>
                <View style={styles.editDeleteContainer}>
                  <TouchableOpacity onPress={() => handleEditPress(entryLunch._id, entryLunch.foodItem, entryLunch.calories)}>
                    <Icon name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteEntry(entryLunch._id)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              ))}
            </View>
          <Modal visible={showEditModal} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
    
       
            <ImageBackground
    source={require('../images/lunch.png')} 
    style={styles.mealBackground}
    resizeMode="cover"
  >
              <View style={styles.modalContent}>
                <Text style={styles.editText}>Edit Entry</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter updated food item"
                  value={updatedFoodItem}
                  onChangeText={setUpdatedFoodItem}
                />
                <TextInput
                  style={styles.inputField}
                  keyboardType="numeric"
                  placeholder="Enter updated calories"
                  value={updatedCalories}
                  onChangeText={setUpdatedCalories}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.button2} onPress={handleUpdateEntry}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button2} onPress={() => setShowEditModal(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
           
                </View>
          
              </View>
              </ImageBackground>
            </View>
            
          </Modal>

          <View style={styles.inputContainer}>
          <TextInput
  style={styles.inputField}
  placeholder="Enter Food"
  placeholderTextColor="#000" 
  value={lunch}
  onChangeText={(text) => setLunch(text)}
/>
 
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                placeholderTextColor="#000"
                placeholder="Enter Calories"
                value={caloriesLunch}
                onChangeText={(text) => setCaloriesLunch(text)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={createLunchEntry}>
              <Text style={styles.addText}>Add Intake</Text>
            </TouchableOpacity>
            </ImageBackground>
            </View>




            <View style={styles.mealContainer}>
            <ImageBackground
    source={require('../images/dinner.png')} 
    
    style={styles.mealBackground}
    resizeMode="cover"
  >
             <View style={styles.overlay} />
            <Text style={styles.subtitle}>Dinner</Text>
            <View style={styles.horizontalLine}></View>
          
            <View>
              
              {entriesDinner.map(entryDinner => (
                <View key={entryDinner._id} style={styles.entryContainer}>
                <View style={styles.entryTextContainer}>
                  <View style={styles.foodCaloriesContainer}>
                    <Text style={styles.entryText}>{entryDinner.foodItem}</Text>
                    <Text style={styles.entryText}>{entryDinner.calories} kcal</Text>
                  </View>
                </View>
                <View style={styles.editDeleteContainer}>
                  <TouchableOpacity onPress={() => handleEditPress(entryDinner._id, entryDinner.foodItem, entryDinner.calories)}>
                    <Icon name="edit" size={20} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteEntry(entryDinner._id)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              ))}
            </View>
          <Modal visible={showEditModal} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.editText}>Edit Entry</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Enter updated food item"
                  value={updatedFoodItem}
                  onChangeText={setUpdatedFoodItem}
                />
                <TextInput
                  style={styles.inputField}
                  keyboardType="numeric"
                  placeholder="Enter updated calories"
                  value={updatedCalories}
                  onChangeText={setUpdatedCalories}
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.button2} onPress={handleUpdateEntry}>
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button2} onPress={() => setShowEditModal(false)}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholderTextColor="#000"
                placeholder="Enter Food"
                value={dinner}
                onChangeText={(text) => setDinner(text)}
              />
              <TextInput
                style={styles.inputField}
                placeholderTextColor="#000"
                keyboardType="numeric"
                placeholder="Enter Calories"
                value={caloriesDinner}
                onChangeText={(text) => setCaloriesDinner(text)}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={createDinnerEntry}>
              <Text style={styles.addText}>Add Intake</Text>
            </TouchableOpacity>
            </ImageBackground>
            </View>
        </ScrollView>
        <View style = {{ backgroundColor: "#ffffff" }}> 
                <FooterMenu /> 
            </View> 
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

 inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontWeight:'bold',
 },
 inputField: {
    width: '40%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    fontWeight: 'bold',
 },
 dateAndGoal: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    backgroundColor: '#dcdcdc', 
    padding: 1, 
    borderRadius: 5, 
    marginTop: 10, 

  },
 
  todayDate: {
    color: 'green', 
    paddingLeft: 30,
  },
  otherDate: {
    color: 'black', 
    paddingLeft: 3,
  },
  subtitle:{
    fontWeight:'bold',
    alignItems: 'center',
    marginVertical: 10,
    fontSize: 16,
    paddingLeft: 150,
  },
  button: {
    backgroundColor: '#24987a', 
    color: 'white',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
    
  },
  addText:{
    fontSize: 16,
    color: 'white',
    alignItems: 'center',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  breakfastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  
  breakfastText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  food: {
    fontSize: 16,
    marginLeft: 140,
    marginRight: 10,
  },
  calories: {
    fontSize: 16,
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.9)', 
  },
  modalContent: {
    width: '80%', 
    height: '50%', 
 
    borderRadius: 10, 
    padding: 20,  
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(180, 220, 180)',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button2: {
    backgroundColor: '#24987a', 
    padding: 10,
    borderRadius: 5,
     margin: 5, 
 
  },
 
  editText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 20,
    
  
  },
  entryContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    paddingHorizontal: 20,  
    marginBottom: 10,  
  },
  editDeleteContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'space-between',  
    width: 60,  
  },
  entryTextContainer: {
    flex: 1,  
  },
  foodCaloriesContainer: {
    flexDirection: 'row',  
    alignItems: 'center', 
    justifyContent: 'space-around', 
    fontWeight:'bold',
  },
  
   
  entryText: {
    fontSize: 16,
  },

  pieChartContainer: {
    alignItems: 'center',
    marginTop: 20,
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',  
},
entryText:{
fontWeight:'bold',
fontSize: 17,
},
});

export default DailyDiary;
