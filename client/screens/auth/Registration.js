import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
import SubmitButton from '../../components/Forms/SubmitBtnRegisterSingpass';
import moment from 'moment';

const Registration = ({ navigation }) => {
    const route = useRoute();
    const { nric } = route.params;
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDOB] = useState(null);
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [allergy, setAllergy] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [question, setQuestion] = useState("What is the name of your first pet?");
    const [answer, setAnswer] = useState("");
    const [goal, setGoal] = useState("Lose weight");
    const [activitylvl, setActivitylvl] = useState("Little/no exercise");
    const [loading, setLoading] = useState(true);
    const [calories, setCalories] = useState(null);
    const [addressString, setAddressString] = useState("");
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

    const [userData, setUserData] = useState({
        name: '',
        race: '',
        sex: '',
        dob: '',
        regadd: {
          country: '',
          unit: '',
          street: '',
          block: '',
          postal: '',
          floor: '',
          building: '',
        },
        email: '',
      });

      useEffect(() => {
        axios.get(`https://sandbox.api.myinfo.gov.sg/com/v4/person-sample/${nric}`)
          .then(response => {
            console.log('Response from API:', response.data); 
            const { name, race, sex, dob, regadd, email } = response.data;
      
            const {
              country,
              unit,
              street,
              block,
              postal,
              floor,
              building,
            } = regadd;
      
            setUserData({
              name: name.value || '',
              race: extractRaceValue(race) || '',
              sex: extractSexValue(sex) || '',
              dob:  moment(dob.value).format('DD MMM YYYY'),
              regadd: {
                country: country.desc || '',
                unit: unit.value || '',
                street: street.value || '',
                block: block.value || '',
                postal: postal.value || '',
                floor: floor.value || '',
                building: building.value || '',
              },
              email: email.value || '',
            });

            const addressString = `${userData.regadd.unit}, BLK ${userData.regadd.block} ${userData.regadd.street}, ${userData.regadd.building}, ${userData.regadd.floor}, ${userData.regadd.country} ${userData.regadd.postal}`;
            setAddressString(addressString);
            console.log(`API URL: https://sandbox.api.myinfo.gov.sg/com/v4/person-sample/${nric}`);

          })
          .catch(error => {
            console.error('Error fetching data from MyInfo API:', error);
          });
      }, [nric]);
      
    const extractRaceValue = (race) => {
    if (race && race.desc) {
      return race.desc;
    } else {
      return '';
    }
  };
  
  
  const extractSexValue = (sex) => {
      if (sex && sex.desc) {
        return sex.desc;
      } else {
        return '';
      }
    };

  const calculateAge = (dob) => {
    const today = new Date();
    console.log('Today:', today);
  
    // Parse the date using moment
    const birthDate = moment(dob, 'DD MMM YYYY').toDate();
  
    console.log('Parsed Date:', birthDate);
  
    let age = today.getFullYear() - birthDate.getFullYear();
    console.log('Initial Age:', age);
  
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    console.log('Calculated Age:', age);
  
    return age;
  };
  

  const calculateTotalCalories = (sex, weight, height, activitylvl, goal) => {
    console.log('Sex:', sex);
    console.log('Weight:', weight);
    console.log('Height:', height);
    console.log('Activity Level:', activitylvl);
    console.log('Goal:', goal);
    const formattedDate = moment(userData.dob, 'DD MMM YYYY').format("YYYY-MM-DD");
    const age = calculateAge(formattedDate);
    console.log('Age:', age);

    let formulaResult;
  
    if (sex === "MALE") {
      formulaResult =
        10 * parseFloat(weight) +
        6.25 * parseFloat(height) -
        5 * parseInt(age) +
        5;
    } else if (sex === "FEMALE") {
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

    formulaResult = Math.round(formulaResult);

    console.log('Formula Result:', formulaResult);
    return formulaResult;
  };

  const handleRegistrationSubmit = async () => {
 
    try {

      const calculatedCalories = calculateTotalCalories(userData.sex, weight, height, activitylvl, goal);
      setCalories(calculatedCalories);  

      // console.log("Request Payload:", { name, email, password, dob: formattedDate, gender, height, weight, activitylvl, allergyString, question, answer, goal, totalCalories });
      console.log("Total Calories:", calculatedCalories);

     
      console.log("Request Payload:", { name: userData.name,
        email: userData.email,
        password: password,
        dob: userData.dob,
        gender: userData.sex,
        height: height,
        weight: weight,
        activitylvl: activitylvl,
        allergyString: allergyString,
        question: question,
        answer: answer,
        goal: goal,
        totalCalories: calculatedCalories });
      setLoading(false);
      const { CreateAccount }  = await axios.post("http://ipaddress:5000/api/v1/auth/register", {  
      name: userData.name,
      email: userData.email,
      password: password,
      dob: userData.dob,
      gender: userData.sex,
      address: userData.regadd,
      height: height,
      weight: weight,
      activitylvl: activitylvl,
      allergyString: allergyString,
      question: question,
      answer: answer,
      goal: goal,
      totalCalories: calculatedCalories });
 
      
      setLoading(false);

      Alert.alert("Registration Successful", `Your daily net calorie goal : ${(calculatedCalories)} calories\n\nPlease login again!`);


      
      navigation.navigate("Login");
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
            <View>
            <Text>Name:</Text>
            <TextInput value={userData.name} editable={false}  style={styles.input}/>

            <Text>Email:</Text>
            <TextInput value={userData.email} editable={false} style={styles.input}/>

            <Text>Date of Birth:</Text>
            <TextInput value={userData.dob} editable={false} style={styles.input}/>

            <Text>Gender:</Text>
            <TextInput value={userData.sex} editable={false} style={styles.input}/>

            <Text>Address:</Text>
            {userData.regadd && (
              
              <TextInput
                  multiline
                  value={`BLK ${userData.regadd.block} ${userData.regadd.street}\n${userData.regadd.building}\n#${userData.regadd.floor}-${userData.regadd.unit}\n${userData.regadd.country} ${userData.regadd.postal}`}
                  editable={false}
                  style={[styles.input, { height: 100 }]} 
              />
            )}

            <Text>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              autoComplete="password"
              value={password}
              onChangeText={setPassword}
            />

            <Text>Confirm Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your password"
              placeholderTextColor="#000000"
              secureTextEntry={true}
              //value={password}
            />
            
            <Text>Height:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your height in cm"
              placeholderTextColor="#000000"
              value={height}
              onChangeText={setHeight}
            />
            
            <Text>Weight:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight in kg"
              placeholderTextColor="#000000"
              value={weight}
              onChangeText={setWeight}
            />

            <Text>Activity Level:</Text>
            <SelectList
              setSelected={setActivitylvl}
              data={activities}
              placeholder="Select your activity level"
              search={false}
              boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E1E0E0',borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
              borderRadius: 30, }} 
              dropdownStyles={{ borderRadius: 20, backgroundColor: '#E1E0E0',  marginBottom: 18 }}
            />

            <Text>Allergies:</Text>
            <MultipleSelectList 
              setSelected={setAllergy}
              data={allergies}
              placeholder="Select your allergies"
              search={false}
              boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E1E0E0',borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10, 
              paddingRight: 20, 
              borderRadius: 30,
            }} 
              dropdownStyles={{ borderRadius: 20, backgroundColor: '#E1E0E0',  marginBottom: 18 }}
              selectedItemStyles={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}
            />

            <Text>Security Question:</Text>
            <SelectList
              setSelected={setQuestion}
              data={questions}
              placeholder="Select a security question"
              search={false}
              boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E1E0E0',borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
              borderRadius: 30, }} 
              dropdownStyles={{ borderRadius: 20, backgroundColor: '#E1E0E0',  marginBottom: 18 }}
            />

            <Text>Answer:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your answer"
              placeholderTextColor="#000000"
              value={answer}
              onChangeText={setAnswer}
            />
            
            <Text>Goal:</Text>
            <SelectList
              setSelected={setGoal}
              data={goals}
              placeholder="Select your goal"
              search={false}
              boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E1E0E0',borderWidth: 1,
              marginBottom: 10,
              paddingLeft: 10,
              borderRadius: 30, }}
              dropdownStyles={{ borderRadius: 20, backgroundColor: '#E1E0E0',  marginBottom: 18 }}
            />

          <SubmitButton
            btnTitle="Register"
            loading={loading}
            handleSubmit={handleRegistrationSubmit} 
          />
          <Text style={styles.linkText}>
            Already Registered? Please{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}>
              LOGIN
            </Text>{" "}
          </Text>
        </View>
        </View>
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
    backgroundColor: '#E1E0E0',
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

export default Registration;