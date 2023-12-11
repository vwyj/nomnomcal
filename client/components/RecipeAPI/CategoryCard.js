import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  return (
    <TouchableOpacity 
        style={styles.container} 
        onPress={onPress}
    >
        {/* Image */}
        <Image
            // source={categoryItem.Image}
            source={{ uri:"https://www.elmundoeats.com/wp-content/uploads/2021/02/FP-Nasi-lemak-with-all-its-trimmings.jpg" }}
            resizeMode='cover'
            style={styles.imageSize}
        />

        {/* Details */}
        <View
            style={styles.detailFormat}
        >

            {/* Name */}
            <Text style={styles.nameFormat}>
                {categoryItem.name}
            </Text>

            {/* Servings */}
            <Text style={styles.servingFormat}>
                {categoryItem.duration} | {categoryItem.serving} Serving
            </Text>

        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: '#F8F8F8',
    },
    imageSize:
    {
        width: 100,
        height: 100,
        borderRadius: 10,
        
    },
    detailFormat:
    { 
        flex: 1,
        paddingHorizontal: 5,
        fontSize: 10,
    }, 
    nameFormat:
    {
        flex: 1, 
        fontSize: 20, 
        fontWeight: 'bold'
    },
    servingFormat:
    {
        color: '#777777',
        fontSize: 14,
    },
});

export default CategoryCard;