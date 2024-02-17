import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const VendorViewDIY = (vendordiys) => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [vendorDIYMealKits, setVendorDIYMealKits] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [calories, setCalories] = useState("0");
  const [price, setPrice] = useState("0"); // Convert to string
  const [points, setPoints] = useState("0"); // Convert to string

  useEffect(()=> {
    const getAllVendorDIYs = async () => {
        setLoading(true);
        try 
        {
          const {data} = await axios.get("http://ipaddress:5000/api/v1/vendorDIY/getAllVendorDIY");
          setLoading(false);
          setVendorDIYMealKits(data?.vendorDIYMealKits);

        }
        catch (error)
        {
          console.log("Error fetching vendor DIY meal kits:", error);
          setLoading(false);
        }
    };
    getAllVendorDIYs();
  },[]);

  const handleDeletePrompt = (id) => {
    Alert.alert(
      'Attention!',
      'Are you sure you want to delete this DIY Meal Kit?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel delete DIY Meal Kit');
          },
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDelete(id),
          style: 'destructive',
        },
      ]
    );
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`http://ipaddress:5000/api/v1/vendorDIY/delete-VendorDIY/${id}`);
      setLoading(false);
      alert(data?.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  

  return (
    <ScrollView style={styles.container}>
      {loading ?(
        <Text>Loading...</Text>
      ):(
        vendorDIYMealKits.map((kit)=>(
        <View style={styles.menuContainer} key={kit._id}>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            
            {/* Update */}
            <Text style={{ marginHorizontal: 8 }}>
            {" "}<FontAwesome5 
                name="pen" 
                size={16} 
                color={"#003300"} 
                onPress={() => { navigation.navigate('VendorUpdateDIY', { diy: kit }) }}/>
            </Text>
            
            {/* Delete */}
            <Text>
              {" "}<FontAwesome5 
                name="trash" 
                size={16} 
                color={"#777777"} 
                onPress={() => handleDeletePrompt(kit._id)}/>
            </Text>
          </View>

          <Text style={styles.header}>DIY Meal Kit: {kit.title}</Text>
          <Text style={styles.header}>Ingredients: </Text>
          <Text>{kit.ingredients}</Text>
          <Text style={styles.header}>Instructions: </Text>
          <Text>{kit.instructions}</Text>
          <Text style={styles.header}>Allergens: </Text>
          <Text>{kit.allergies}</Text>
          <Text style={styles.header}>Calories: </Text>
          <Text>{kit.calories} kCal</Text>
          <Text style={styles.header}>Price: </Text>
          <Text>${kit.price}</Text>
          <Text style={styles.header}>Points: </Text>
          <Text>{kit.points}</Text>
        </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:
  {
    
    backgroundColor: "#E7F8EE", //light green background
 
  },
  menuContainer:
  {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#E7F8EE",
    borderRadius: 12,
    elevation: 3,
    padding: 5,
    margin: 10, 
  },
  header:
  {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'left',
  },
});

export default VendorViewDIY;