import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState, useContext } from 'react'; 
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// LOGIN PAGE
const Login = ({ navigation }) => {

  // Global State
  const[state, setState] = useContext(AuthContext);

  // States using useState hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Function
  // Button Function
  const handleSubmit = async () => {
    try{
      // Validation: Check if email and password are not empty
      if (!email || !password)
      {
        Alert.alert('Please Fill In All Fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      // Make a POST request to the login endpoint
      const { data } = await axios.post("/auth/login", { email, password });
      // Update global state
      setState(data);
      // Store authentication data in AsyncStorage
      await AsyncStorage.setItem("@auth",JSON.stringify(data));
      // Display success message
      alert(data && data.message);
      // Navigate to Home screen on successful login
      navigation.navigate("Home");
      // Logging login data to console
      console.log("Login Data==> ", { email, password });
    }
    catch(error)
    {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // Temporary Function to Check Local Storage Data
  const getLocalStorageData = async () => {
    let data = await AsyncStorage.getItem("@auth");
    console.log("Local Storage ==> ", data);
  };

  // Invoke getLocalStorageData function
  getLocalStorageData();
  // Render UI
  return (
    <View style={styles.container}>
      // Page Title
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
      // InputBox for Email
      <InputBox 
        inputTitle={"Email"} 
        keyboardType='email-address' 
        autoComplete="email"
        value={email}
        setValue={setEmail} 
      />
      
      // InputBox for Password
      <InputBox 
        inputTitle={"Password"} 
        secureTextEntry={true} 
        autoComplete="password" 
        value={password}
        setValue={setPassword}
      />
      </View>
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}

      // SubmitButton component to handle login
      <SubmitButton 
        btnTitle="Login" 
        loading={loading}
        handleSubmit={handleSubmit}
      />

      // Link to Register Page
      <Text style={styles.linkText}> 
        Not a Registered User? Please{" "} 
        <Text 
            style={styles.link} 
            onPress={() => navigation.navigate("Register")}> 
            REGISTER</Text>{" "}
      </Text>
    </View> 
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#e1d5c9",
    },

    pageTitle:
    {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225",
        marginBottom: 20,
    },

    inputBox:
    {
        height: 40,
        marginBottom: 20,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginTop: 10,
        paddingLeft: 10,
        color: "#af9f85",
    },

    linkText:
    {
      textAlign: "center",
    },

    link:
    {
      color: "red",
    },

});

export default Login;