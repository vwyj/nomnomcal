import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import dummyData from '../components/RecipeAPI/dummyData';
import CategoryCard from '../components/RecipeAPI/CategoryCard';
import TrendingCard from '../components/RecipeAPI/TrendingCard';
import RecipeDescription from './RecipeDescription';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { fetchSearches, fetchDetails, fetchFeatured } from '../context/api';

const Recipe = ({ navigation }) => {

    const [recipes, setRecipes] = useState([]);
    const [search,setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
          // Fetch 10 random recipes when the component mounts
      const fetchRandomRecipes = async () => {
        try {
          const recipes = await fetchFeatured(10);
          setRecommendations(recipes);
        } catch (error) {
            // Handle error if needed
          console.error("Error fetching random recipes:", error);
        }
      };
  
      fetchRandomRecipes();
    }, []);

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



    function renderHeader() {
        return (
            <>
                <View style={styles.headerFormat}>
                    <Text style={styles.headerFontFormat}>Hello!</Text>
                </View>
                <View style={styles.captionFormat}>
                    <Text style={styles.captionFontFormat}>What would you like to cook today?</Text>
                </View>
            </>
        );
    };

    // Handle Search Bar
    const handleSearches = (text) => {
        setSearch(text);
    }

    const handleSearchClick = (recipeId) => {
        console.log("Recipe id:", recipeId);
        navigation.navigate("Recipe Description", { recipeId });
    }

    const handleRecipePress = (recipeId) => {
        console.log("Recipe id:", recipeId);
        navigation.navigate("Recipe Description", { recipeId });
    };

    function renderSearchBar() {
        return(
            <View style={styles.searchBar}>
                <Text style={styles.searchBtnIcon}>
                    <FontAwesome5Icon name="search" />
                </Text>
                <TextInput
                    style={styles.searchFont}
                    placeholder='Search Recipes'
                    value={search}
                    onChangeText={(text) => handleSearches(text)}
                >
                </TextInput>
            </View>
        );
    };

    // function renderTrendingSection() {
    //     return(
    //         <View style={{ marginTop: 24 }}>
    //             <Text style={{ marginHorizontal: 24, fontSize: 20, fontWeight: "bold" }}>
    //                 Trending Recipe
    //             </Text>

    //             <FlatList
    //                 data={dummyData.trendingRecipes}
    //                 horizontal
    //                 showsHorizontalScrollIndicator={false}
    //                 keyExtractor={item => `${item.id}`}
    //                 renderItem={({ item, index }) => {
    //                     return (
    //                         <View>
    //                             <TrendingCard
    //                                 recipeItem={item}
    //                                 onPress={() => navigation.navigate("Recipe Description", { recipe: item })}
    //                             />
    //                         </View>
    //                     )
    //                 }}  
    //             />
    //         </View>
    //     );
    // };

    // <View style={{ marginTop: 24 }}>
    //             <Text style={{ marginHorizontal: 24, fontSize: 20, fontWeight: "bold" }}>
    //                 Trending Recipe
    //             </Text>

    //             <FlatList
    //                 data={trendingRecipes}
    //                 horizontal
    //                 showsHorizontalScrollIndicator={false}
    //                 keyExtractor={(item) => `${item.id}`}
    //                 renderItem={({ item, index }) => (
    //                 <View>
    //                     {/* Assuming TrendingCard is a component that displays recipe information */}
    //                     {/* Replace with your actual TrendingCard implementation */}
    //                     <TrendingCard recipeItem={item} onPress={() => navigation.navigate("Recipe Description", { id })} /> 
    //                     <View>
    //                         <Text>{item.title}</Text>
    //                     {/* Add more details as needed */}
    //                     </View>
    //                 </View>
    //                 )}
    //             />
    //         </View>
    function renderTrendingSection(){
        return(
            <View style={{ marginTop: 24 }}>
                <Text style={{ marginHorizontal: 24, fontSize: 20, fontWeight: "bold" }}>
                    Trending Recipe
                </Text>

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
        );
    };


    function renderCategoryHeader() {
        return (
            <View style={styles.categoryHeaderFormat}>
                {/* Section Title */}
                <Text style={styles.categoryHeaderFont}>
                    Categories
                </Text>

                {/* View All */}
                <TouchableOpacity>
                    <Text style={styles.viewAllFont}>
                        View All
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderPersonalRecipe() {
        return (
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
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={dummyData.categories}
                keyExtractor={(item) => `${item.id}`}
                keyboardDismissMode='on-drag'
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderHeader()}

                        {/* Search Bar */}
                        {renderSearchBar()}
                        
                        {/* Search Results */}
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

                        {/* See Personal Recipe */}
                        {renderPersonalRecipe()}

                        {/* Trending Section */}
                        {renderTrendingSection()}

                        {/* Category Header */}
                        {renderCategoryHeader()}

                    </View>
                }

                renderItem={({item}) => {
                    return(
                        <CategoryCard
                            containerStyle={{ marginHorizontal: 24 }}
                            categoryItem={item}
                            onPress={() => navigation.navigate("Recipe Description", {recipe: item})}
                        />
                    )
                }}
                ListFooterComponent={
                    <View style={{ marginBottom: 100 }}/>
                }
            />


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
    recipeContainer: {
        position: 'relative',
        width: 250,
        height: 350,
        margin: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    recipeName: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
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
        color: "#777777",
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
    viewAllFont:
    {
        color: '#777777',
        fontSize: 14,
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