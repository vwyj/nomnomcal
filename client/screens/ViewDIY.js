// ViewComponent.js   
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Button} from 'react-native';   
import axios from 'axios';   
import React, { useContext,useState } from 'react';   
import { AuthContext } from '../context/authContext';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
 
  
//press function on image 
const ViewDIY = ({navigation}) => {   
 
    // State to control the visibility of the text for each image set 
    const [selectedSet, setSelectedSet] = useState(null);     
    const [availablePoints, setAvailablePoints] = useState(10); 
    const [selectedPrice, setSelectedPrice] = useState(null); 
    const [selectedPoint, setSelectedPoint] = useState(null); 
    const [showText, setShowText] = useState({ setA: false, setB: false, setC: false, setD: false });
    const toggleText = (setImage) => { 
      setShowText({ ...showText, [setImage]: !showText[setImage] }); 
    }; 

    // handlePress1 etc are functions designed to handle presses on different sets 
    const handlePress1 = () => { 
      handlePress('setA', '$9.90'); 
    }; 
   
    const handlePress2 = () => { 
      handlePress('setB', '$12.90'); 
    }; 
   
    const handlePress3 = () => { 
      handlePress('setC', '$15.90'); 
    }; 
   
    const handlePress4 = () => { 
      handlePress('setD', '$19.90'); 
    }; 
    //function desugbed to handle presses on for redeem sets
    const handlePresstoRedeemdiy1 = () => {
      handlePresstoRedeemdiy('setA', '300', availablePoints); 
    };
    const handlePresstoRedeemdiy2 = () => { 
      handlePresstoRedeemdiy('setB', '500', availablePoints); 
    }; 
   
    const handlePresstoRedeemdiy3 = () => { 
      handlePresstoRedeemdiy('setC', '800', availablePoints); 
    }; 
   
    const handlePresstoRedeemdiy4 = () => { 
      handlePresstoRedeemdiy('setD', '900', availablePoints); 
    }; 


    //function to direct to another page
    //direct viewDIY.js to paymentDIY when purchase button is pressed
    const handlePress = (selectedSet, selectedPrice) => { 
      navigation.navigate('PaymentDIY', { selectedSet, selectedPrice }); 
    };
        //direct viewDIY.js to paymentDIY when purchase button is press
    const handlePresstoRedeemdiy = (selectedSet, selectedPoint, availablePoints) => { 
      navigation.navigate('RedeemDIY', { selectedSet, selectedPoint, availablePoints }); 
    }; 
 
  const [state] = useContext(AuthContext);   
    
  // Auth Condition True False   
  const authenticatedUser = state?.user && state?.token;   
  const Stack = createNativeStackNavigator();  
 
  return (   
  
    <View style={styles.container}>   
      {/* <Text style={styles.text}> DIY MealKits </Text>    */}
      {/* Add other content or components as needed */}   
        {/* scroll*/}  
        <Text style={styles.points}>{`Available points: ${availablePoints}`} </Text>  
      <ScrollView style={styles.scrollView}>  
  
      
       {/* set A design*/}  
      <Text style={styles.setText}>Set A $9.90</Text>  
      <Pressable onPress={() => toggleText('setA')}>      
      <Image    
        style={styles.image}    
        source={require('..//images/mealkit1.jpg')}/>   
        {showText.setA && <Text style={styles.toggleText}>Calories:600kcal{"\n"}  Protein:10g {"\n"} Fat:60g </Text>}    
       </Pressable>  
       <View style={styles.textButtonContainer}>  
       {/* button test*/}  
       <Button title="Purchase" onPress={handlePress1}/> 
       <Button title="Redeem-300 points"  onPress={handlePresstoRedeemdiy1}/>  
       </View> 
 
       
       {/* set B*/} 
       <Text style={styles.setText}>Set B $12.90</Text> 
      <Pressable onPress={() => toggleText('setB')}>     
      <Image   
        style={styles.image}   
        source={require('..//images/mealkit2.png')}/>  
        {showText.setB && <Text style={styles.toggleText}>Calories:600kcal{"\n"}  Protein:10g {"\n"} Fat:60g </Text>}   
       </Pressable> 
       <View style={styles.textButtonContainer}> 
       {/* button test*/} 
       <Button title="Purchase" onPress={handlePress2}/>
       <Button title="Redeem-500 Points" onPress={handlePresstoRedeemdiy2} />   
       </View> 
 
       {/* set C*/} 
       <Text style={styles.setText}>Set C $15.90</Text> 
      <Pressable onPress={() => toggleText('setC')}>     
      <Image   
        style={styles.image}
        source={require('..//images/mealkit3.jpg')}/>  
        {showText.setC && <Text style={styles.toggleText}>Calories:700kcal{"\n"}  Protein:20g {"\n"} Fat:40g </Text>}   
       </Pressable> 
       <View style={styles.textButtonContainer}> 
       {/* button test*/} 
       <Button title="Purchase" onPress={handlePress3} /> 
       <Button title="Redeem-800 Points" onPress={handlePresstoRedeemdiy3} />   
       </View> 
{/* set D*/} 
<Text style={styles.setText}>Set D $19.90</Text> 
      <Pressable onPress={() => toggleText('setD')}>     
      <Image   
        style={styles.image}   
        source={require('..//images/mealkit4.jpg')}/>  
        {showText.setD && <Text style={styles.toggleText}>Calories:800kcal{"\n"}  Protein:50g {"\n"} Fat:50g </Text>}   
       </Pressable> 
       <View style={styles.textButtonContainer}> 
       {/* button test*/} 
       <Button title="Purchase" onPress={handlePress4}/> 
       <Button title="Redeem-900 points" onPress={handlePresstoRedeemdiy4} />   
       </View>              
      </ScrollView> 
    </View>  
  );   
   
};   
    
    
 //UI design   
 const styles = StyleSheet.create({   
  container: {   
    flex: 1,   
    justifyContent: 'center',   
    alignItems: 'center',
    backgroundColor: 'white',   
  },   
  text: {   
    fontSize: 20,   
    fontWeight: 'bold',   
    color: 'black',   
  },   
  image: {   
    width: 300,   
    height: 300,   
    borderRadius: 30,   
  },  
  scrollView: {    
    backgroundColor: 'white', 
    marginHorizontal: 10, 
  }, 
 
    setText: { 
      color: 'black', // Choose a color that suits your theme 
      textAlign: 'center',   
      fontSize: 20, 
      marginTop: 10, // Adjust as needed for spacing 
      fontWeight: 'bold', 
    }, 
    textButtonContainer: { 
   
      color: 'black', // Choose a color that suits your theme 
      textAlign: 'right',   
      fontSize: 20, 
      marginTop: 10, // Adjust as needed for spacing 
      fontWeight: 'bold', 
    }, 
    toggleText: { 
      color: 'black', 
      textAlign: 'center', 
      fontSize: 20, 
      marginTop: 10, 
      fontWeight: 'bold', 
    }, 
    points:
    {
      textAlign: 'right', 
      paddingLeft: 150,
      fontWeight: 'bold', 
      fontSize: 20, 
    }
   
});   
   
export default ViewDIY;
