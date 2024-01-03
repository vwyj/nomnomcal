import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import { PostContext } from '../context/postContext';
import RecipePost from "../components/RecipeAPI/RecipePost";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PostCompilation = ({ navigation }) => {

    // Global State
    const [posts] = useContext(PostContext);
    return (
        <View style={styles.container}>
            <ScrollView>
            {/* Create Personal Recipe */}
            <View>
                <Text style={styles.personalRecipeFont}>Create your own recipe!</Text>
                
                {/* Community Recipe Posts */}
                <View style={styles.buttons}>

                    {/* View Personal Recipe Posts */}
                    <TouchableOpacity 
                        style={styles.createRecipeFormat} 
                        onPress={() => {
                            console.log("View My Recipes");
                            navigation.navigate("MyRecipePosts");
                        }}
                    >
                    <Text style={styles.createRecipeFont}>
                        {" "}<FontAwesome5 name="list" color={"#757575"}/>
                        {" "}View My Recipes 
                    </Text>
                    </TouchableOpacity>
                    
                    {/* Create Personal Recipe Posts */}
                    <TouchableOpacity 
                        style={styles.createRecipeFormat} 
                        onPress={() => {
                            navigation.navigate("Post");
                        }}
                    >
                    <Text style={styles.createRecipeFont}>
                        {" "}<FontAwesome5 name="plus-square" color={"#757575"}/>
                        {" "}Create Recipes
                    </Text>
                    </TouchableOpacity>
        
                </View>
            </View>

                <RecipePost posts={posts} />
                
                {/* <Text>{JSON.stringify(posts, null, 4)}</Text> */}
            </ScrollView>
            <View>
                <FooterMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
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
    createRecipeFont:
    {
        color: '#229879',
        // textDecorationLine: 'underline',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    buttons:
    {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});

export default PostCompilation;