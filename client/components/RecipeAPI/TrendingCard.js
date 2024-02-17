import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React from 'react';

const RecipeCardDetails =({ recipeItem }) => {
  return (
    <View style={{ flex: 1 }}>
      {/* Name & Bookmark */}
      <View style={ styles.recipeCardDetailsContainer }>
        <Text style={ styles.nameBookmark }>
          {recipeItem.name}
          </Text>
      </View>

      {/* Duration & Serving */}
        <Text style={ styles.durationServing }>
          {recipeItem.duration} | {recipeItem.serving} Serving
        </Text>

    </View>
  )
}

const RecipeCardInfo = ({ recipeItem }) => {
  return(
    <View
      style={styles.recipeCardContainer}
    >
      <RecipeCardDetails
        recipeItem={recipeItem}
      />
    </View>
  )
}

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Image
        // source={recipeItem.Image}
        source={{ uri:"https://www.kuali.com/wp-content/uploads/2016/06/Sarawak-Laksa-e1467268532122.jpg"}}
        resizeMode='cover'
        style={styles.imageSize}
      />

      {/* Category */}
      <View style={styles.categoryFormat}>
        <Text style={styles.categoryFontFormat}>
          {recipeItem.category}
        </Text>
      </View>

      {/* Card Info */}
      <RecipeCardInfo 
        recipeItem={recipeItem}
      />

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container:
  {
    height: 350,
    width: 250,
    marginTop: 12,
    marginRight: 20,
    borderRadius: 12,
  },
  imageSize:
  {
    width: 250,
    height: 350,
    borderRadius: 15,
    marginLeft: 10,
  }, 
  categoryFormat:
  {
    position: 'absolute',
    top: 20,
    left: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: 'rgba(2, 2, 2, 0.35)',
    borderRadius: 12,
  },
  categoryFontFormat:
  {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: "bold",
  },
  recipeCardContainer:
  {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 3,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'rgba(20,20,20, 0.9)',
  },
  recipeCardDetailsContainer:
  {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameBookmark:
  {
    width: "70%",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 5,
  },
  durationServing:
  {
    color: "#F5F6FB",
    fontSize: 14,
    paddingLeft: 10,
    paddingBottom: 5,
  },
})


export default TrendingCard;