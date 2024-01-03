// screens/DiaryScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';

const Diary = () => {
  const [meal, setMeal] = useState('');
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [diary, setDiary] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveEntry = async () => {
    try
        {
           if (!meal || !food || !calories)
           {
            Alert.alert("Please Fill In All Fields");
            setLoading(false);
            return;
          }

          setLoading(true);
          const { data } = await axios.post("http://192.168.18.34:5000/api/v1/diary/create-diary", { meal, food, calories });
          alert(data && data.message);
          console.log("Response from API:", data);
          console.log("Diary Data==> ", { meal, food, calories });

          // Save the entry to a data store (e.g., state, database)
          const entry = { meal, food, calories };
          setDiary([...diary, entry]);

          
          // Clear the input fields
          setMeal('');
          setFood('');
          setCalories('');

          setLoading(false);
        }
        catch(error)
        {
          alert(error.response.data.message);
          setLoading(false);
          console.log(error);
        }
      };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Calorie Intake Diary</Text>
      <TextInput
        style={styles.input}
        placeholder="Meal"
        value={meal}
        onChangeText={(text) => setMeal(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Food"
        value={food}
        onChangeText={(text) => setFood(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Calories"
        keyboardType="numeric"
        value={calories}
        onChangeText={(text) => setCalories(text)}
      />
      
      <Button title="Save Entry" onPress={saveEntry} />
      <Text style={styles.text}>Diary Entries:</Text>
      {diary.map((entry, index) => (
        <Text key={index}>{`Meal: ${entry.meal}, Food: ${entry.food}, Calories: ${entry.calories}`}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default Diary;
