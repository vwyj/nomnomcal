import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { fetchCuisine  } from '../context/api';

const CuisineRecipes = ({ route }) => {
    const [recipeData, setRecipeData] = useState(null);
    const [error, setError] = useState(null);
    const { cuisineType } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
      const fetchCuisineRecipes = async () => {
        try 
        {
          const data = await fetchCuisine(cuisineType);
          setRecipeData(data);
        } 
        catch (error) 
        {
          setError(error.message);
        }
      };
  
      fetchCuisineRecipes();
    }, [cuisineType]);

    const handleRecipeClick = (recipeId) => 
    {
      navigation.navigate('Recipe Description', { recipeId });
    }; 

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleRecipeClick(item.id)}>
          <View style={styles.recipeItem}>
            <Text>{item.title}</Text>
          </View>
        </TouchableOpacity>
    );   
          
    return (
        <View style={styles.container}>
          <Text>{`${cuisineType} Cuisine Recipes`}</Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            {recipeData ? (
              <FlatList
                  data={recipeData}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderRecipeItem}
              />
            ) : error ? (
            <Text>Error: {error}</Text>
            ) : (
            <Text>Loading...</Text>
            )}
          </View>
        </View>
    );
  };


const styles= StyleSheet.create({
    container:
    {
      flex: 1,
      padding: 10,
    },
    recipeItem: 
    {
      flex: 1,
      margin: 5,
      padding: 10,
      backgroundColor: '#e0e0e0', 
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
});
export default CuisineRecipes;
