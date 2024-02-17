import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image, Switch, ScrollView } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from '../context/authContext';
import { fetchSearches, fetchDetails, fetchFeatured, fetchCuisine, fetchFeaturedAllergies } from '../context/api';

import chinesecuisine from '../images/chinesecuisine.png';
import indiancuisine from '../images/indiancuisine.png';
import japanesecuisine from '../images/japanesecuisine.png';
import koreancuisine from '../images/koreancuisine.png';
import thaicuisine from '../images/thaicuisine.png';
import vietnamesecuisine from '../images/vietnamesecuisine.png';


const Recipe = () => {
    const [state] = useContext(AuthContext);
    const {user} = state;
    const [recipes, setRecipes] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [allergiesRecomm, setAllergiesRecomm] = useState([]);
    const [search,setSearch] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [cuisineData, setCuisineData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalCalories, setTotalCalories] = useState(user?.totalCalories.toString() || '');

    const userID= user._id;
    //const userName= user.name;
    console.log("userID: ", userID);
    //console.log("userName: ", userName);
    const navigation = useNavigation();
 
    // Random Recipes within user's calories
    useEffect(() => {
        // Fetch 10 random recipes when the component mounts
        const fetchRandomRecipes = async () => {
            try 
            {

                // Calculate one-third of the user's total calories
                console.log("totalCalories is " + totalCalories);

                const calPerMeal = totalCalories / 3;

                const recipes = await fetchFeatured(10, calPerMeal);
                console.log("recipes is " + recipes);
                setRecommendations(recipes);
            } 
            catch (error) 
            {
                // Handle error if needed
                console.error("Error fetching random recipes:", error);
            }
        };

    fetchRandomRecipes();
    }, []);

    //  Random Recipes without user's allergies
    useEffect(() => {
        const fetchAllergyRecipes = async () => {
            try {
                // Fetch user allergies
                console.log("allergy : ", user.allergyString[0]);
    
                // Ensure the response contains the expected structure
                const allergies = user.allergyString[0]?.split(', ') || [];
                setAllergies(allergies);
                console.log("allergies: ", allergies);
    
                // Call Fetch API with allergies
                const recipes = await fetchFeaturedAllergies(5, allergies);
                setAllergiesRecomm(recipes);
            } catch (error) {
                console.error("Error fetching random recipes:", error);
            }
        };
    
        fetchAllergyRecipes();
    }, []);

    // Search Recipes
    useEffect(() => {
        if(search.length > 0) 
        {
            setLoading(true);

            // Call Fetch Form API
            fetchSearches(search).then((data) => {
                setRecipes(data);
            }).catch((error) => console.error("Error fetching recipes - ", error))
            .finally(()=> setLoading(false));
        }
        
        else 
        {
            setRecipes([]);
        }
    }, [search]);

    // Cuisine Type
    const handleFetchCuisine = async (cuisineType) => {
        try 
        {
            const data = await fetchCuisine(cuisineType);
            setCuisineData(data);
        } 
        catch (error) 
        {
            setError(error.message);
        }
    };
    
    useEffect(() => {
        handleFetchCuisine('japanese');
    }, []);

    // Handle Search Bar
    const handleSearches = (text) => {
        setSearch(text);
    };

    // Handle Search Recipe
    const handleSearchClick = (recipeId) => {
        console.log("Recipe id:", recipeId);
        navigation.navigate("Recipe Description", { recipeId });
    };

    // Handle Recipe
    const handleRecipePress = (recipeId) => {
        console.log("Recipe id:", recipeId);
        navigation.navigate("Recipe Description", { recipeId });
    };

    // Handle Cuisine
    const handleCuisineClick = (cuisineType) => {
        navigation.navigate("CuisineRecipes", { cuisineType });
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Header */}
                <View style={styles.headerFormat}>
                    <Text style={styles.headerFontFormat}>Hello!</Text>
                </View>
                <View style={styles.captionFormat}>
                    <Text style={styles.captionFontFormat}>What would you like to cook today?</Text>
                </View>
                
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Text style={styles.searchBtnIcon}>
                        <FontAwesome5Icon name="search" />
                    </Text>
                    <TextInput
                        style={styles.searchFont}
                        placeholder='Search Recipes'
                        value={search}
                        onChangeText={(text) => handleSearches(text)}
                    />
                </View>

                {/* Search Bar Results */}
                <View style={styles.resultList}>
                    {loading ? (
                        <Text>Fetching Recipes..</Text>
                    ):(
                        <FlatList 
                            data={recipes}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (
                                <TouchableOpacity onPress={() => handleSearchClick(item.id)}>
                                    <Text>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />                            
                    )}
                </View>

                {/* User Recipe */}
                <View style={styles.personalRecipeFormat}>
                    <Text style={styles.personalRecipeFont}>Contribute your recipe!</Text>
                            
                    {/* View Recipe */}
                    <TouchableOpacity 
                        style={styles.createRecipeFormat} 
                        onPress={() => {
                            navigation.navigate("PostCompilation");
                        }}
                    >
                        <Text style={styles.createRecipeFont}>
                            View Community Recipes
                        </Text>
                    </TouchableOpacity>
                </View>  

                {/* Trending Recipe */}
                <View style={{ marginTop: 24 }}>
                    <Text style={{ marginHorizontal: 24, fontSize: 20, fontWeight: "bold" }}>
                        Recommended Recipes
                    </Text>
                    <Text style={{ marginHorizontal: 24, color: '#4D4D4D' }}>(based on your daily calorie intake!)</Text>

                    <FlatList
                        data={recommendations}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => handleRecipePress(item.id)}>
                                <View style={styles.recipeContainer}>
                                    <Image
                                        source={{ uri: item.image }}
                                        resizeMode='cover'
                                        style={styles.image}
                                    />
                                    <Text style={styles.recipeName}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>


                {/* Trending Recipe based allergies*/}
                <View style={{ marginTop: 24 }}>
                    <Text style={{ marginHorizontal: 24, fontSize: 20, fontWeight: "bold" }}>
                        Recommended Recipes
                    </Text>
                    <Text style={{ marginHorizontal: 24, color: '#4D4D4D' }}>(based on your allergies)</Text>

                    <FlatList
                        data={allergiesRecomm}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => handleRecipePress(item.id)}>
                                <View style={styles.recipeContainer}>
                                    <Image
                                        source={{ uri: item.image }}
                                        resizeMode='cover'
                                        style={styles.image}
                                    />
                                    <Text style={styles.recipeName}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* Cuisine Category */}
                <View style={styles.categoryHeaderFormat}>
                    {/* Section Title */}
                    <Text style={styles.categoryHeaderFont}>
                        Cuisine Types
                    </Text>
                </View>
        

                <View style={styles.cuisineContainer}>
                    <TouchableOpacity onPress={() => handleCuisineClick('Chinese')}>
                        <View style={styles.cuisinePosition}>
                            <Image
                                source={chinesecuisine} 
                                style={styles.cuisineImage} // Make the image fill out the container
                            />
                            <View style={styles.cuisinePosition1}>
                                <Text style={styles.cuisineText}>Chinese Cuisine</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.cuisineContainer}>
                    <TouchableOpacity onPress={() => handleCuisineClick('Indian')}>
                        <View style={styles.cuisinePosition}>
                            <Image
                                source={indiancuisine} 
                                style={styles.cuisineImage} // Make the image fill out the container
                            />
                            <View style={styles.cuisinePosition1}>
                                <Text style={styles.cuisineText}>Indian Cuisine</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.cuisineContainer}>
                    <TouchableOpacity onPress={() => handleCuisineClick('Japanese')}>
                        <View style={styles.cuisinePosition}>
                            <Image
                                source={japanesecuisine} 
                                style={styles.cuisineImage} // Make the image fill out the container
                            />
                            <View style={styles.cuisinePosition1}>
                                <Text style={styles.cuisineText}>Japanese Cuisine</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.cuisineContainer}>
                    <TouchableOpacity onPress={() => handleCuisineClick('Korean')}>
                        <View style={styles.cuisinePosition}>
                            <Image
                                source={koreancuisine} 
                                style={styles.cuisineImage} // Make the image fill out the container
                            />
                            <View style={styles.cuisinePosition1}>
                                <Text style={styles.cuisineText}>Korean Cuisine</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.cuisineContainer}>
                    <TouchableOpacity onPress={() => handleCuisineClick('Thai')}>
                        <View style={styles.cuisinePosition}>
                            <Image
                                source={thaicuisine} 
                                style={styles.cuisineImage} // Make the image fill out the container
                            />
                            <View style={styles.cuisinePosition1}>
                                <Text style={styles.cuisineText}>Thai Cuisine</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.cuisineContainer}>
                    <TouchableOpacity onPress={() => handleCuisineClick('Vietnamese')}>
                        <View style={styles.cuisinePosition}>
                            <Image
                                source={vietnamesecuisine} 
                                style={styles.cuisineImage} // Make the image fill out the container
                            />
                            <View style={styles.cuisinePosition1}>
                                <Text style={styles.cuisineText}>Vietnamese Cuisine</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            <FooterMenu/>
        </View>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
    },
    cuisineContainer:
    {
        backgroundColor:"#FFFFFF",
        padding: 20,
        margin: 10,
    },
    cuisinePosition:
    { 
        position: 'relative', 
        alignItems: 'center', 
        width: '100%', 
        height: 200 
    },
    cuisinePosition1:
    { 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    cuisineImage:
    { 
        width: '120%', 
        height: '120%', 
        borderRadius: 12 
    },
    cuisineText:
    {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 6, 
    },
    recipeContainer: 
    {
        position: 'relative',
        width: 250,
        height: 350,
        margin: 10,
    },
    image:
    {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        resizeMode: 'cover',
    },
    recipeName: 
    {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', 
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 6, 
    },
    headerFormat:
    {
        flexDirection: 'row',
        marginHorizontal: 24,
        alignItems: 'flex-end',
        height: 40,
    },
    headerFontFormat:
    {
        flex: 1,
        color: '#229879',
        fontSize: 20,
        fontWeight: 'bold',
    },
    captionFormat:
    {
        flexDirection: 'row',
        marginHorizontal: 24,
        alignItems: 'flex-start',
        height: 30,
    },
    captionFontFormat:
    {
        marginTop: 3,
        color: "#6F6F6F",
        fontSize: 15,
    },
    searchBar: 
    {
        flexDirection: "row",
        height: 50,
        alignItems: 'center',
        marginHorizontal: 24,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#F5F6FB",  
        elevation: 4,
    },
    resultList:
    {
        marginTop: 5,
        marginHorizontal: 24,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: "#F5F6FB",
    },
    searchBtnIcon: 
    {
        color: "#777777",
        width: 20,
        height: 20,
    },
    searchFont:
    {
        marginLeft: 12,
        fontSize: 16,
    },
    trendingFormat:
    {
        marginTop: 10,
    },
    categoryHeaderFormat:
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 24,
    },
    categoryHeaderFont:
    {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
    },
    personalRecipeFormat:
    {
        marginTop: 20,
        marginHorizontal: 24,
        borderRadius: 10,
        backgroundColor: '#E7F9EF',
    },
    personalRecipeFont: 
    {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    createRecipeFormat:
    {
        marginTop: 5,
        marginBottom: 8,
        justifyContent: 'center',
    },
    viewRecipeFormat:
    {
        marginBottom: 10,
        justifyContent: 'center',
                
    },
    createRecipeFont:
    {
        color: '#229879',
        textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default Recipe;
