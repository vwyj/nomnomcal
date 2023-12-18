import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import moment from "moment";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const RecipePost = ({ posts }) => {
  return (
    <View>
        <Text style={styles.heading}>Total Recipes: {posts?.length}</Text>
        {posts?.map((post, i) => (
            <View style={styles.card} key={i}>
                <View>
                    <Text>
                        {" "}<FontAwesome5 name="trash" color={"#777777"}/>
                    </Text>
                </View>

                <Text style={styles.recipeTitle}>Recipe: {post?.title}</Text>
                <Text>{post?.ingredients}</Text>
                <Text>{post?.instructions}</Text>
                <Text>{post?.calorie} kCal</Text>

                    <View style={styles.footer}>
                        {post?.postedBy?.name && (
                            <Text>
                                {" "}<FontAwesome5 name="user" color={"#1A8871"}/> 
                                {" "}{post?.postedBy?.name}
                            </Text>
                        )}

                        <Text>
                            {" "}<FontAwesome5 name="clock" color={"#1A8871"}/> 
                            {" "}{moment(post?.createdAt).format('DD/MM/YYYY')}
                        </Text>
                    </View>
            </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
    heading:
    {
        color: "#229879",
        textAlign: "center",
    },
    card:
    {
        backgroundColor: "#ffffff",
        padding: 20,
        borderRadius: 10,
        marginVertical: 5,
        elevation: 3,
    },
    recipeTitle:
    {
        fontWeight: "bold",
        marginBottom: 10,
    },
    footer:
    {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});

export default RecipePost;