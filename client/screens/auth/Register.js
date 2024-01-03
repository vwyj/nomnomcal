import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SubmitButton from '../../components/Forms/SubmitButtonRegister';
import axios from 'axios';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

/* REGISTER PAGE */
const Register = ({ navigation }) => {
  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDOB] = useState(null); // Initialize dob as null
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activitylvl, setActivitylvl] = useState("Little/no exercise");
  const [allergy, setAllergy] = useState("");
  const [question, setQuestion] = useState("What is the name of your first pet?");
  const [answer, setAnswer] = useState("");
  const [goal, setGoal] = useState("Lose weight");

  const allergyString = Array.isArray(allergy) ? allergy.join(", ") : allergy;

  const genders = [
    { key: 'M', value: 'Male' },
    { key: 'F', value: 'Female' },
  ];

  const activities = [
    { key: 'sedentary', value: 'Little/no exercise' },
    { key: 'light', value: 'Light exercise' },
    { key: 'moderately', value: 'Moderate exercise' },
    { key: 'very', value: 'Very active' },
    { key: 'extra', value: 'Extra active' }
  ];

  const allergies = [
    { key: 'milk', value: 'Milk' },
    { key: 'eggs', value: 'Eggs' },
    { key: 'fish', value: 'Fish' },
    { key: 'shellfish', value: 'Shellfish' },
    { key: 'nuts', value: 'Tree nuts' },
    { key: 'peanuts', value: 'Peanuts' },
    { key: 'soy', value: 'Soy' },
    { key: 'wheat', value: 'Wheat' }
  ];

  const questions = [
    { key: 'Q1', value: 'What is the name of your first pet?' },
    { key: 'Q2', value: 'What is your favorite color?' },
    { key: 'Q3', value: 'What high school did you attend?' },
    { key: 'Q4', value: 'What is your favorite sports team?' },
    { key: 'Q5', value: 'What is the make and model of your first car?' },
    { key: 'Q6', value: 'What is the name of your best friend?' }
  ];

  const goals = [
    { key: 'lose', value: 'Lose Weight' },
    { key: 'gain', value: 'Gain Weight' },
    { key: 'maintain', value: 'Maintain Weight' },
    { key: 'gainMuscle', value: 'Gain Muscle' },
  ];

  const handleDateChange = (date) => {
    setDOB(date);
    setShowCalendar(false);
  };

  const calculateAge = (dob) => {
    const formattedDate = moment(dob).format("DD MMM YYYY");
    const today = new Date();
    const dobParts = formattedDate.split(' ');
    const dobMonth = dobParts[1];
    const dobDay = parseInt(dobParts[0], 10);
    const dobYear = parseInt(dobParts[2], 10);
  
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
  
    const birthDate = new Date(dobYear, months[dobMonth], dobDay);
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };

  const calculateTotalCalories = (gender, weight, height, activitylvl, goal) => {
    const formattedDate = moment(dob).format("YYYY-MM-DD");
    const age = calculateAge(formattedDate);
    let formulaResult;
  
    if (gender === "M") {
      formulaResult =
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseInt(age) +
        5;
    } else if (gender === "F") {
      formulaResult =
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseInt(age) -
        161;
    }
  
    switch (activitylvl) {
      case "sedentary":
        formulaResult *= 1.2;
        break;
      case "lightly":
        formulaResult *= 1.35;
        break;
      case "moderately":
        formulaResult *= 1.48;
        break;
      case "very":
        formulaResult *= 1.6;
        break;
      case "extra":
        formulaResult *= 1.8;
        break;
      default:
        break;
    }
  
    switch (goal) {
      case "lose":
        formulaResult -= 200;
        break;
      case "gain":
        formulaResult += 200;
        break;
      default:
        break;
    }
  
    return formulaResult;
  };

  // Function
  // Button Function
  const handleSubmit = async () => {

    const formattedDate = moment(dob).format("DD MMM YYYY");
    
    try {
      if (!name || !email || !password || !dob || !gender || !height || !weight || !activitylvl || !question || !answer || !goal) {
        Alert.alert("Please Fill In All Fields");
        setLoading(false);
        return;
      }
      let totalCalories = calculateTotalCalories(gender, weight, height, activitylvl, goal);
      totalCalories = (Math.ceil(totalCalories/10))*10;

    console.log("Request Payload:", { name, email, password, dob: formattedDate, gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories });
    console.log("Total Calories:", totalCalories);

    setLoading(false);

    // Display an alert with total calories
    Alert.alert("Registration Successful", `Your daily net calorie goal : ${(totalCalories)} calories\n\nPlease login again!`);


      console.log("Request Payload:", { name, email, password, dob, gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories });
      setLoading(false);
      // Van
      const { CreateAccount } = await axios.post("http://192.168.1.88:5000/api/v1/auth/register", { name, email, password, dob: formattedDate , gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories });
      // Vicky
      //const { CreateAccount } = await axios.post("http://192.168.18.34:5000/api/v1/auth/register", { name, email, password, dob: formattedDate , gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories });
      //const { CreateAccount } = await axios.post("http://172.20.10.2:5000/api/v1/auth/register", { name, email, password, dob: formattedDate , gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories });
      //alert(data && data.message);
      navigation.navigate("Login");
      console.log("Register Data==> ", { name, email, password, dob, gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories});
    } catch (error) {
      console.log("Error response from server:", error.response);
      alert(error.response.CreateAccount.message);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
        
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#000000"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#000000"
          keyboardType='email-address'
          autoComplete="email"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowCalendar(true)}>
          <Text style={styles.textDOB}>
            {dob ? new Date(dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select Date of Birth'}
          </Text>
        </TouchableOpacity>
        
        {showCalendar && (
          <CalendarPicker
            onDateChange={handleDateChange}
            selectedStartDate={dob}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          autoComplete="password"
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#000000"
          secureTextEntry={true}
          //value={password}
        />

        <SelectList
          setSelected={setGender}
          data={genders}
          placeholder="Select your gender"
          search={false}
          boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E6E6E6',borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
          borderRadius: 30, }} //override default styles
          dropdownStyles={{ borderRadius: 20, backgroundColor: '#E6E6E6',  marginBottom: 18}}
          
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your height in cm"
          placeholderTextColor="#000000"
          value={height}
          onChangeText={setHeight}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Enter your weight in kg"
          placeholderTextColor="#000000"
          value={weight}
          onChangeText={setWeight}
        />

        <SelectList
          setSelected={setActivitylvl}
          data={activities}
          placeholder="Select your activity level"
          search={false}
          boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E6E6E6',borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
          borderRadius: 30, }} //override default styles
          dropdownStyles={{ borderRadius: 20, backgroundColor: '#E6E6E6',  marginBottom: 18 }}
        />

        <MultipleSelectList 
          setSelected={setAllergy}
          data={allergies}
          placeholder="Select your allergies"
          search={false}
          boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E6E6E6',borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10, // increase this value
          paddingRight: 20, // increase this value
          borderRadius: 30,
          //maxHeight: 40,
         }} //override default styles
          dropdownStyles={{ borderRadius: 20, backgroundColor: '#E6E6E6',  marginBottom: 18 }}
          //itemStyles={{ height: 20, justifyContent: 'center', paddingHorizontal: 10 }}
          selectedItemStyles={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}
        />

        <SelectList
          setSelected={setQuestion}
          data={questions}
          placeholder="Select a security question"
          search={false}
          boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E6E6E6',borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
          borderRadius: 30, }} //override default styles
          dropdownStyles={{ borderRadius: 20, backgroundColor: '#E6E6E6',  marginBottom: 18 }}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter your answer"
          placeholderTextColor="#000000"
          value={answer}
          onChangeText={setAnswer}
        />

        <SelectList
          setSelected={setGoal}
          data={goals}
          placeholder="Select your goal"
          search={false}
          boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E6E6E6',borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
          borderRadius: 30, }} //override default styles
          dropdownStyles={{ borderRadius: 20, backgroundColor: '#E6E6E6',  marginBottom: 18 }}
        />



      </View>
      <SubmitButton
        btnTitle="Register"
        loading={loading}
        handleSubmit={handleSubmit} 
      />
      <Text style={styles.linkText}>
        Already Register Please{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}>
          LOGIN
        </Text>{" "}
      </Text>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e1d5c9",
    backgroundColor: "#ffffff",
  },

  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 20,
    marginTop: 80
  },

  input: {
    height: 40,
    borderColor: '#E1E0E0',
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 30,
  },

  linkText: {
    textAlign: "center",
    marginBottom: 40
  },

  link: {
    color: "red",
  },

  textDOB: {
    marginTop: 8
  }
});

export default Register;
