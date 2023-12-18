import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
// import { fetchDetails, fetchRecommendations } from '../context/api';

const RecipeCardDetails =({ }) => {

    // const [recommendations, setRecommendations] = useState([]);
    
    // useEffect(() => 
    // {
    //     fetchDetails(recommendations).then((data) => 
    //     {
    //         console.log("Recipe Details: ", data);
    //         setDetails(data);   // Setting Recipe Recommendations From API
    //     })
    //     .catch((error) => console.error("Error Fetching Recommendations:", error));

    // }, [recommendations]);

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

  return (
    <View style={{ flex: 1 }}>
      
      {/* Name */}
      <View style={ styles.recipeCardDetailsContainer }>
        <Text style={ styles.nameBookmark }>
          {recommendations.title}
        </Text>
      </View>

      {/* Duration & Serving */}
        <Text style={ styles.durationServing }>
          {recommendations.duration} mins | {recommendations.serving} Servings
        </Text>

    </View>
  );
};

const RecipeCardInfo = ({}) => {
  return(
    <View
      style={styles.recipeCardContainer}
    >
      <RecipeCardDetails
        recommendations={recommendations}
      />
    </View>
  )
}

const TrendingCard = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Image
        source={{ uri: recommendations.image }}
        resizeMode='cover'
        style={styles.imageSize}
      />

      {/* Category */}
      <View style={styles.categoryFormat}>
        <Text style={styles.categoryFontFormat}>
          {recommendations.category}
        </Text>
      </View>

      {/* Card Info */}
      <RecipeCardInfo 
        recommendations={recommendations}
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