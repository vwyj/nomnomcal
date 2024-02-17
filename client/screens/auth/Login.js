import { View, Text, StyleSheet, TextInput, Alert, Image, Linking, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react'; 
import { AuthContext } from '../../context/authContext';
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import loginLogo from '../../images/logo.png';
import whiteSingpassButton from '../../images/whiteSingpass.png';

/* LOGIN PAGE */
const Login = ({ navigation }) => {

  // Global State
  const[state, setState] = useContext(AuthContext);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Function
  const handleSubmit = async () => {
    try{

      setLoading(false);
      const { data } = await axios.post("http://ipaddress:5000/api/v1/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth",JSON.stringify(data));

      navigation.navigate("Home");
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

  getLocalStorageData();
  return (
    <View style={styles.container}>
      <Image
        source={loginLogo}
        style={styles.logo}
      />
      <Text style={styles.pageTitle}>Login</Text>
      <View style={{ marginHorizontal: 20 }}>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoComplete="email"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        autoComplete="password"
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword}
      />
      </View>
      
      <SubmitButton 
        btnTitle="Login" 
        loading={loading}
        handleSubmit={handleSubmit}
      />
      <Text style={styles.linkText}> 
        Not a User? Please{" "} 
        <Text 
            style={styles.link} 
            onPress={() => navigation.navigate("Register")}> 
            REGISTER
        </Text>{" "}
      </Text>
      <Text style={styles.linkText}> 
        Forget password? Please click{" "} 
        <Text 
            style={styles.link} 
            onPress={() => navigation.navigate("Reset")}> 
            HERE
        </Text>{" "}
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('MockPassLogin')}>
        <Image source={whiteSingpassButton} style={styles.imageButton} />
      </TouchableOpacity>
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

  input: {
    height: 40,
    borderColor: '#E1E0E0',
    backgroundColor: '#E1E0E0',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 30,
  },

  linkText:{
    textAlign: "center",
    fontWeight: 'bold', 
    fontSize: 15   
  },

  link:{
    color: "red",
  },
  
  logo: {
    width: 280,
    height: 280,
    marginLeft: 45,
  },

  imageButton: {
    marginTop: 50,
    alignSelf: 'center', 
  },

});

export default Login;