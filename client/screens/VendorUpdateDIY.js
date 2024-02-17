import { View, Text, TextInput, StyleSheet, ScrollView, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const VendorUpdateDIY = ({route}) => {
    const navigation = useNavigation();
    const { diy } = route.params;
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [allergies, setAllergies] = useState("");
    const [calories, setCalories] = useState(0);
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
      try 
      {
        setLoading(true);
        const response = await axios.put(`http://ipaddress:5000/api/v1/vendorDIY/update-VendorDIY/${diy._id}`,
        { title, ingredients, instructions, allergies, calories, price });

        if (response.data) 
        {
            alert(response.data.message);
        }
        else 
        {
            alert('No data received from the server');
        }
      } 
      catch (error) 
      {
        alert(error.response ? error.response.data.message : 'VendorUpdateDIY.js error');
        setLoading(false);
        console.log(error);
      }
    };

    // Initial Post Data
    useEffect(() => {
        setTitle(diy?.title || '');
        setIngredients(diy?.ingredients || '');
        setInstructions(diy?.instructions || '');
        setAllergies(diy?.allergies || '');
        setCalories(diy?.calories || 0);
        setPrice(diy?.price || 0);
    }, [diy]);
    
    return (
        <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}> 

            {/* DIY Meal Kit Name */}
            <Text style={styles.textFont}>DIY Meal Kit Name: </Text>
            <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={(text) => setTitle(text)}
            />

            {/* Ingredients */}
            <Text style={styles.textFont}>Ingredients: </Text>
            <TextInput
                style={styles.inputBox}
                value={ingredients}
                onChangeText={(text) => setIngredients(text)}
                multiline={true} 
                numberOfLines={4}
            />

            {/* Instructions */}
            <Text style={styles.textFont}>Instructions: </Text>
            <TextInput
                style={styles.inputBox}
                value={instructions}
                onChangeText={(text) => setInstructions(text)}
                multiline={true} 
                numberOfLines={4}
            />

            {/* Allergies */}
            <Text style={styles.textFont}>Allergens: </Text>
            <TextInput
                style={styles.inputBox}
                value={allergies}
                onChangeText={(text) => setAllergies(text)}
                multiline={true} 
                numberOfLines={4}
            />

            {/* Calories */}
            <Text style={styles.textFont}>Calories: </Text>
            <TextInput
                style={styles.smallInputBox}
                value={`${calories}`}
                keyboardType="numeric"
                onChangeText={(number) => setCalories(number)}
                placeholder='? kCal'
            />

            {/* Price */}
            <Text style={styles.textFont}>Price: </Text>
            <TextInput
                style={styles.smallInputBox}
                value={`${price}`}
                keyboardType="numeric"
                onChangeText={(number) => setPrice(number)}
                placeholder='$0.00'
            />

            {/* Button to trigger the update */}
            <Button
                title={'Update'}
                color={'#1A8871'}
                onPress= {handleUpdate}
            />
        </ScrollView>   
        </View>
  );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    textFont:
    {
        marginTop: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    inputBox: 
    {
        textAlignVertical: 'top',
        backgroundColor: "#F5F6FB",
        borderRadius: 12,
        elevation: 3,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10, 
        width: 320, 
        height: 100,
    },
    smallInputBox: 
    {
        textAlignVertical: 'top',
        backgroundColor: "#F5F6FB",
        borderRadius: 12,
        elevation: 3,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 10, 
        width: 320, 
        height: 40,
    },
});
export default VendorUpdateDIY;