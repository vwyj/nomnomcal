import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import FooterMenuVendor from '../components/Menus/FooterMenuVendor';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const CreateDIY = ({navigation}) => {
  // Local State
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState(0);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);

  // Handle form data post DATA
  const  handleDIYMealKit = async () => {
      try
      {
          setLoading(true);

          const {data} = await axios.post("http://ipaddress:5000/api/v1/vendorDIY/create-VendorDIY", {title, ingredients, instructions, allergies, calories, price, points});

          setLoading(false);
          alert(data?.message);
          navigation.navigate("HomeVendor");
      }
      catch (error)
      {
          alert(error.response.data.message || error.message);
          setLoading(false);
          console.log(error);
      }
  }

  return (
      <View style={ styles.container }>
          <ScrollView>
              <View style={{alignItems: "center"}}>
                    <Text style={styles.header}>Create DIY Meal Kit</Text>

                

                    <TextInput style={styles.inputBox} 
                        placeholder="Add DIY Meal Kit Name"
                        placeholderTextColor={"gray"}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <TextInput style={styles.inputBox} 
                        placeholder="Add DIY Meal Kit Ingredients"
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={10}
                        value={ingredients}
                        onChangeText={(text) => setIngredients(text)}
                    />


                    <TextInput style={styles.inputBox} 
                        placeholder="Add DIY Meal Kit Instructions"
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={10}
                        value={instructions}
                        onChangeText={(text) => setInstructions(text)}
                    />

                    <TextInput style={styles.inputBox} 
                        placeholder="Add DIY Meal Kit Allergens"
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={10}
                        value={allergies}
                        onChangeText={(text) => setAllergies(text)}
                    />

                    <TextInput style={styles.inputBoxSmall} 
                        placeholder="? kCal"
                        placeholderTextColor={"gray"}
                        multiline={false}
                        value={calories}
                        onChangeText={(number) => setCalories(number)}
                        keyboardType="numeric"
                    />

                    <TextInput style={styles.inputBoxSmall} 
                        placeholder="$0.00"
                        placeholderTextColor={"gray"}
                        multiline={false}
                        value={price}
                        onChangeText={(number) => setPrice(number)}
                        keyboardType="numeric"
                    />

                    <TextInput style={styles.inputBoxSmall} 
                        placeholder="0"
                        placeholderTextColor={"gray"}
                        multiline={false}
                        value={points}
                        onChangeText={(number) => setPoints(number)}
                        keyboardType="numeric"
                    />
              </View>

              <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.postBtn} onPress={handleDIYMealKit}>
                        <Text style={styles.postBtnText}>
                        <FontAwesome5 name="plus-square" size={18} /> {" "}
                        Create DIY Meal Kit
                        </Text>
                    </TouchableOpacity>
              </View>
          </ScrollView>
          <View style = {{ flex: 1, justifyContent: "flex-end" }}>
              <FooterMenuVendor/>
          </View>  
      </View>
  );
};

const styles = StyleSheet.create({
  container: 
  {
      flex: 1,
      margin: 10,
      justifyContent: "space-between",
      marginTop: 40,
  },
  header:
  {
      fontSize: 20,
      fontWeight: "bold",
  },
  inputBox:
  {
      backgroundColor: "#ffffff",
      textAlignVertical:"top",
      paddingTop: 10,
      width: 340,
      marginTop: 20,
      fontSize: 16,
      paddingLeft: 15,
      borderColor: "gray",
      borderRadius: 10,
      elevation: 3,
  },
  inputBoxSmall:
  {
      backgroundColor: "#ffffff",
      textAlignVertical:"top",
      paddingTop: 10,
      width: 60,
      marginTop: 20,
      fontSize: 16,
      paddingLeft: 15,
      borderColor: "gray",
      borderRadius: 10,
      elevation: 3,
  },
  postBtn:
  {
      backgroundColor: "black",
      width: 300,
      marginTop: 30,
      height: 40,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
  },
  postBtnText: 
  {
      color: "#ffffff",
      fontSize: 18,
      fontWeight: "bold",
  },
});

export default CreateDIY; 