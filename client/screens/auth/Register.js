import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import React, {useState} from 'react'; 
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import axios from 'axios';

// REGISTER PAGE
const Register = ({ navigation }) => {
  // States using useState hook
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Function
  // Button Function
  const handleSubmit = async () => {
    try{
      // Validation: Check if name, email, and password are not empty
      if (!name || !email || !password)
      {
        Alert.alert("Please Fill In All Fields");
        setLoading(false);
        return;
      }
      setLoading(false);
      // Make POST request to register endpoint
      const { data } = await axios.post("/auth/register", { name, email, password });
      // Display success message
      alert(data && data.message);
      // Navigate to Login screen on successful registration
      navigation.navigate("Login");
      // Logging register data to the console
      console.log("Register Data==> ", { name, email, password });
    }
    catch(error)
    {
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
  };

  // Render UI
  return (
    <View style={styles.container}>
      // Page Title
      <Text style={styles.pageTitle}>Register</Text>
      <View style={{ marginHorizontal: 20 }}>
      
      // InputBox for Nam
      <InputBox 
        inputTitle={"Name"} 
        value={name}
        setValue={setName}
      />
      
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
      
      // SubmitButton component to handle registration
      <SubmitButton 
        btnTitle="Register" 
        loading={loading}
        handleSubmit={handleSubmit}
      />

      // Link to Login Page
      <Text style={styles.linkText}>
        Already Register Please{" "}
        <Text 
          style={styles.link}
          onPress={() => navigation.navigate("Login")}>
          LOGIN
        </Text>{" "}
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

export default Register;