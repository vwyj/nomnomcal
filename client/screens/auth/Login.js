import { View, Text, StyleSheet, TextInput, Alert, Image } from 'react-native';
import React, { useState, useContext } from 'react'; 
import { AuthContext } from '../../context/authContext';
import InputBox from '../../components/Forms/InputBox';
import SubmitButton from '../../components/Forms/SubmitButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import loginLogo from '../../images/logo.png';
import { useNavigation } from '@react-navigation/native';

/* LOGIN PAGE */
const Login = () => {
  const navigation = useNavigation();

  // Global State
  const [state, setState] = useContext(AuthContext);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Function
  // Button Function
  const handleSubmit = async () => {
    try{
      if (!email || !password)
      {
        Alert.alert('Please Fill In All Fields');
        setLoading(false);
        return;
      }
      setLoading(false);
      // Van
      const { data } = await axios.post("http://192.168.1.88:5000/api/v1/auth/login", { email, password });
      // Vicky
      // const { data } = await axios.post("http://192.168.18.34:5000/api/v1/auth/login", { email, password });
      //const { data } = await axios.post("http://172.20.10.2:5000/api/v1/auth/login", { email, password });
      setState(data);
      await AsyncStorage.setItem("@auth",JSON.stringify(data));
      alert(data && data.message);

      // Display last login information if needed
      // if (data && data.user && data.user.lastLogin) {
      //   alert(`Last Login: ${data.user.lastLogin}`);
      // }

      if(data && data.user && data.user.role !== undefined) {
        console.log("User Role:", data.user.role);
      
        // if (data.user.role.toString() === 'admin') {
        //   console.log("Navigating to HomeSysAd");
        //   navigation.navigate('Home');
        // } else {
        //   console.log("Navigating to Home");
        //   navigation.navigate('HomeSysAd');
        // }
      }
    }
    catch(error)
    {
      console.error("Login Error:", error);
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
      {/* <Text>{JSON.stringify({ name, email, password }, null, 4)}</Text> */}
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
            REGISTER</Text>{" "}
      </Text>
      <Text style={styles.linkText}> 
        Forget password? Please click{" "} 
        <Text 
            style={styles.link} 
            onPress={() => navigation.navigate("Register")}> 
            HERE</Text>{" "}
      </Text>
    </View> 
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
    },

    pageTitle:
    {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#1e2225",
        marginBottom: 50,
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

    linkText:
    {
      textAlign: "center",
    },

    link:
    {
      color: "red",
    },
    
    logo: 
    {
      width: 280,
      height: 280,
      // marginBottom: 20,
      marginLeft: 45,
   },

});

export default Login;
