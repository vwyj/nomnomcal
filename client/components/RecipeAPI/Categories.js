import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { categoryData } from './Index';


export default function Categories({ categories, activeCategory, handleChangeCategory }) 

{
  return (
    <View>
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal:15 }}
            style={styles.scrollView}
        >
            {categoryData.map((category, index) => {
    
            return (
                    <TouchableOpacity
                        key={index}
                        onPress={ () => handleChangeCategory(category.strCategory)}
                        style={styles.touchableItems}
                    >

                    <View style={[ styles.roundedContainer ]}>
                        <Image
                            source={{ uri:"https://cravingsjournal.com/wp-content/uploads/2023/08/croissants-4.jpg" }}
                            style={styles.roundedEdge}
                        />
                    </View>

                    <Text style={ styles.textStyle }>
                        {category.strCategory}
                    </Text>

                    </TouchableOpacity>
                );
            })}

        </ScrollView>
        <Text>Categories</Text>
    </View>
  );
};

const styles = StyleSheet.create({

    scrollView:
    {
        flexdirection:"row",
        marginRight: 4,
    },

    touchableItems:
    {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginVertical: 5,
    },

    roundedEdge: 
    {
        borderRadius: 15, 
        width: 120, 
        height: 200, 
        backgroundColor: 'gray',
        margin: 5, 
    },

    roundedContainer:
    {
        borderRadius: 15, 
        marginHorizontal: 5,
    },

    textStyle:
    {
        color: "#262626",
        fontSize: 12,
    },

});
