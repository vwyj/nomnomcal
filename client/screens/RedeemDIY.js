//RedeemDIY.js
//for user to redeem mealkit using loyalty points 
import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Image, TextInput,TouchableOpacity, Button, Alert, ImageBackground} from 'react-native';  
import axios from 'axios'; 
import { useNavigation } from '@react-navigation/native';
import FooterMenu from '../components/Menus/FooterMenu';

const RedeemDIY = ({ route }) => { 
    const { diymealkit, points, ingredients, instructions, allergens, calories, availablePoints } = route.params; 
    const [redeemPoints, setRedeemPoints] = useState(''); 
    const [loading, setLoading] = useState(false); 
    const [diymealkitorder, setDiymealkitorder] = useState([]);
    const navigation = useNavigation();

     const redeemLoyaltyPoints = async () => {  
      try 
          { 
            setLoading(true); 
            const { data } = await axios.post("http://ipaddress:5000/api/v1/diymealkit/create-diymealkit",  {diymealkit, points, ingredients, instructions, allergens, calories} ); 
            alert(data && data.message); 
            console.log("Response from API:", data); 
            console.log("diymealkit Data==> ", {diymealkit, points, ingredients, instructions, allergens, calories}); 
   
            // Save the entry to a data store (e.g., state, database) 
            const entry = {diymealkit, points, ingredients, instructions, allergens, calories}; 
            setDiymealkitorder([...diymealkitorder, entry]); 

            // Deduct points if redemption is successful
            await axios.post("http://ipaddress:5000/api/v1/dailyStreak/deductPoints", { deductedPoints: points }); 

            setLoading(false); 
            navigation.navigate('ViewDIY');
          } 
          catch(error) 
          { 
            alert(error.response ? error.response.data.message : 'An error occurred'); 
            setLoading(false); 
            console.error(error); 
          } 
        }; 

    const handleRedeem = () => { 
        // Add validation logic for redeeming points
        if (parseInt(points) > availablePoints) {
          Alert.alert('Error', 'Insufficient points for redemption');
          return;
        }
        redeemLoyaltyPoints(); 
    }; 

    return ( 
      <ImageBackground
      source={require('../images/redeem.png')}  
      style={styles.backgroundImage}
      resizeMode="cover"
    >
          
         <View style={styles.lightenOverlay}>
        <View style={styles.container}> 
         
          <Text style={styles.text}>Redeem Your Loyalty Points</Text>       
          
          <Text style={styles.mealKitText}>{`DIY Meal Kit: ${diymealkit}`}</Text>
          <Text style={styles.pointsText}>{`Redemption Points: ${points}`}</Text>
          <Text style={styles.infoText}>{`Available points: ${availablePoints}`}</Text>
 
          <View style={styles.redeemForm}> 
            
          <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
            <Text style={styles.redeemButtonText}>Redeem Now</Text>
          </TouchableOpacity> 
          </View> 

          
       <View style = {{ flex: 1, justifyContent: "flex-end" }}>
                <FooterMenu/>
            </View> 
        </View> 
        </View> 
        </ImageBackground>
    ); 
}; 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between", 
    //alignItems: "center", 
    marginTop: 100,
  },
  redeemButton:{
    alignItems: "center", 

  },
  backgroundImage: {
    flex: 1,
    width: '100%', 
    height: '100%',      

  },
  lightenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)' 
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d35400',
    textAlign: 'center',
    marginBottom: 20,
  },
  redeemForm: {
    width: '85%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    marginLeft:30,
    borderWidth: 2,
    marginTop: 20, //shift the box down
    
  },
  Button: {
  //  backgroundColor: '#24987a',
    color: '##24987a',
    borderRadius: 30,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealKitText:{
    fontSize: 18,  
    fontWeight: 'bold',   
    textAlign: 'center',
    
  },
  pointsText:{
    fontSize: 18,  
    fontWeight: 'bold',  
    textAlign: 'center',

  },
  infoText:{
    fontSize: 18,  
    fontWeight: 'bold',  
    textAlign: 'center',
     
  },
  redeemButtonText:{
    fontSize: 18,  
    fontWeight: 'bold',  
    textAlign: 'center',
  },

});
export default RedeemDIY;