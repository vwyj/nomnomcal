import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react'; 
import axios from 'axios';
import { AuthContext } from '../../context/authContext';

const questions = [
  { key: 'Q1', value: 'What is the name of your first pet?' },
  { key: 'Q2', value: 'What is your favorite color?' },
  { key: 'Q3', value: 'What high school did you attend?' },
  { key: 'Q4', value: 'What is your favorite sports team?' },
  { key: 'Q5', value: 'What is the make and model of your first car?' },
  { key: 'Q6', value: 'What is the name of your best friend?' }
];

const Reset = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [state, setState] = useContext(AuthContext);
  const [loading, setLoading] = useState(false); 


  const handleResetRequest = async () => {
    try {

      const response = await axios.get(`http://ipaddress:5000/api/v1/auth/findEmail?email=${email}`);
      const userData = response.data.users;

      if (userData.length === 0) {
          Alert.alert("Email Not Found", "There is no account associated with this email.");
          return;
      }

      const userSecurityQuestionKey  = userData[0].question;

      const foundQuestion = questions.find(question => question.key === userSecurityQuestionKey);
      if (foundQuestion) {
          setSecurityQuestion(foundQuestion.value);
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const handleResetSubmit = async () => {
    try {
        const response = await axios.post(`http://ipaddress:5000/api/v1/auth/findAns`, {
            email,
            answer
        });
        
        if (response.data.success) {
            setResetPasswordVisible(true);
        } else {
            Alert.alert("Incorrect Answer", "The answer provided does not match our records.");
        }
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 400) {
            Alert.alert("Incorrect Answer", "The answer provided does not match our records.");
        } else {
            Alert.alert("Error", "An unexpected error occurred. Please try again later.");
        }
    }
};

const handlePasswordReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`http://ipaddress:5000/api/v1/auth/resetPW`, {
        email,
        password
      });
  
      setLoading(false);
  
      if (response.data && response.data.message) {
        Alert.alert("Success", response.data.message, [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login') 
          }
        ]);
      } else {
        Alert.alert("Success", "Password reset successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate('Login') 
          }
        ]);
      }
    } catch (error) {
      alert(error.response.data.message || "An unexpected error occurred.");
      setLoading(false);
      console.error("Reset Password Error:", error);
    }
  };



  return (
    <View style={styles.container}>
    <Text style={styles.pageTitle}>Reset Password</Text>

    <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoComplete="email"
            placeholderTextColor="#000000"
            value={email}
            onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.button} onPress={handleResetRequest}>
            <Text style={styles.buttonText}>Request Security Question</Text>
        </TouchableOpacity>
    </View>

    {securityQuestion ? (
        <View style={styles.inputContainer}>
            <Text style={styles.securityQuestion}>{securityQuestion}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your answer"
                placeholderTextColor="#000000"
                value={answer}
                onChangeText={setAnswer}
            />
            <TouchableOpacity style={styles.button} onPress={handleResetSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    ) : null}

      {resetPasswordVisible && (
        <View style={styles.inputContainer}>
            {/* Display the reset password field here */}
            <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor="#000000"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                
            />

            <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    )}
</View>
);
 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e2225",
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
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
  button: {
    backgroundColor: "#1e2225",
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  securityQuestion: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});

export default Reset;
