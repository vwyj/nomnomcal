import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { fetchDetails } from '../context/api';

const RecipeDescription = ({ navigation, route }) => {

    const {recipeId} = route.params;
    const [selectedRecipe, setSelectedRecipe] = React.useState(null);
    const [details, setDetails] = useState(null);

    // useEffect(() => {
    //     setSelectedRecipe(recipe)
    // }, []);

    useEffect(() => 
    {
        fetchDetails(recipeId).then((data) => 
        {
            console.log("Recipe Details: ", data);
            setDetails(data);   // Setting Recipe Details From API Using Recipe ID
        })
        .catch((error) => console.error("Error Fetching Details:", error));

    }, [recipeId]);

    const sanitizeInstructions = (instructions) => { 
        return instructions.replace(/<\/?p>|<\/?ol>|<\/?li>/g, "");
    };

    // For image
    function renderRecipeImage() 
    {
        return (
            <View style={{ alignItems: 'center' }}>
                {/* Background Image */}
                <Image
                    source={{ uri: details.image }}
                    resizeMode={"cover"}
                    style={{  height: 350, width: "100%" }}
                />
            </View>
        );
    };

    // For name, serving, duration for preparation
    function renderRecipeInfo() 
    {
        return (
            <View style={styles.recipeInfoFormat}>

                {/* Recipe */}
                <View style={{ flex: 1.5,  justifyContent: 'center' }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{details.title}</Text>
                    <Text style={styles.recipeInfoFont}>
                        {details.readyInMinutes} mins | {details.servings} Servings
                    </Text>
                </View> 
            </View>
        );
    };

    // "measures": {
    //     "metric": {
    //         "amount": 1.0,
    //         "unitLong": "Tbsp",
    //         "unitShort": "Tbsp"
    //     },
    //     "us": {
    //         "amount": 1.0,
    //         "unitLong": "Tbsp",
    //         "unitShort": "Tbsp"
    //     }
    // },

    // Ingredients
    function renderIngredients() {
        return (
            <View style={styles.container1}>
                <Text style={styles.font1}>Ingredients: </Text>
                    {details.extendedIngredients.map(
                        (ingredient, index) => (
                            <View key={index} style={styles.ingredientsInfo}>
                                <Text style={styles.recipeInfoFont}>
                                    {ingredient.original}
                                </Text>
                            </View>
                        )
                    )}
            </View>
        );

    };

    // Instruction
    function renderRecipeInstruction(){
        return (
            <View style={styles.container1}>
                <Text style={styles.font1}>Instructions: </Text>
                <Text style={styles.recipeInfoFont}>
                    {sanitizeInstructions(details.instructions)}
                </Text>
            </View>
        );
    };

    return (
        <ScrollView>
            {details ?(
                <View style={styles.container}>
                    {renderRecipeImage()}
                    {renderRecipeInfo()}
                    {renderIngredients()}
                    {renderRecipeInstruction()}
                </View>
            ):(
                <Text>Fetching recipe details...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',
    },
    recipeDescContainer:
    {
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    descriptionFormat:
    {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    quantityFormat:
    {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    recipeInfoFormat:
    {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 10,
        alignItems: 'center',
    },
    recipeInfoFont:
    {
        textAlign: "left",
        color: '#595959',
        fontSize: 14,
    },
    container1:
    {
        flex: 1,
        margin: 10,
        borderRadius:5,
        padding: 10,
        fontSize: 10,
    },
    ingredients:
    {
        marginTop: 5,
        color: 'black',
    },
    ingredientsInfo:
    {
        flexDirection: "row",
    },
    font1:
    {
        fontSize: 15,
    },
});

export default RecipeDescription;