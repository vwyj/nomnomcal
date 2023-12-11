import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import React from 'react';
import dummyData from '../components/RecipeAPI/dummyData';
import CategoryCard from '../components/RecipeAPI/CategoryCard';
import TrendingCard from '../components/RecipeAPI/TrendingCard';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const Recipe = ({ navigation }) => {

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

    function renderSearchBar() {
        return(
            <View style={styles.searchBar}>
                <Text style={styles.searchBtnIcon}>
                    <FontAwesome5Icon name="search" />
                </Text>
                <TextInput
                    style={styles.searchFont}
                    placeholder='Search Recipes'
                >
                </TextInput>
            </View>
        );
    };

    function renderTrendingSection() {
        return(
            <View style={{ marginTop: 24 }}>
                <Text style={{ marginHorizontal: 24, fontSize: 20, fontWeight: "bold" }}>
                    Trending Recipe
                </Text>

                <FlatList
                    data={dummyData.trendingRecipes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <TrendingCard
                                    recipeItem={item}
                                />
                            </View>
                        )
                    }} 
                />
            </View>
        );
    };

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

                        {/* Trending Section */}
                        {renderTrendingSection()}

                        {/* Category Header */}
                    </View>
                }

                renderItem={({item}) => {
                    return(
                        <CategoryCard
                            containerStyle={{ marginHorizontal: 24 }}
                            categoryItem={item}
                            // onPress={() => navigation.navigate("RecipeDescription", {recipe: item})} yt: 30.26 https://www.youtube.com/watch?v=W-Oqe8Ph_eM&list=PLvx-gNAnZ2LuhpwsaT2YhFvXo9MACeIDO&index=3&t=1614s
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
        marginTop: 12,
    }
});

export default Recipe;