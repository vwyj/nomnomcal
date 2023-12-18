import { View, Text, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import moment from "moment";
import axios from "axios";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import EditModal from '../EditModal';

const RecipePost = ({ posts, myPostScreen }) => {
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [post, setPost] = useState ({});
    const navigation = useNavigation();

    // Handle Delete Post
    const handleDeletePrompt = (id) => {
        Alert.alert(
            "Attention!",
            "Are you sure you want to delete this recipe?",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        console.log("Cancel delete recipe");
                    },
                    style: "cancel",
                },
                    
                {
                    text: "Delete",
                    onPress: () => handleDeletePost(id),
                    style: "destructive",
                },
            ]
        );
    };

    // Delete Post Data
    const handleDeletePost = async (id) => {
        try
        {
            setLoading(true);
            const {data} =await axios.delete(`/post/delete-post/${id}`);
            setLoading(false);
            alert(data?.message);
            navigation.push("PostCompilation");
        }
        catch(error)
        {
            setLoading(false);
            console.log(error);
            alert(error);
        }
    };

    return (
        <View>
            {myPostScreen && <EditModal modalVisible={modalVisible} setModalVisible={setModalVisible} post={post}/>}
            {posts?.map((post, i) => (
                <View style={styles.card} key={i}>
                    {myPostScreen && (
                        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                            {/* Update */}
                            <Text style={{ marginHorizontal: 8 }}>
                                {" "}<FontAwesome5 name="pen" size={16} color={"#4085FF"} onPress={() => {setPost(post), setModalVisible(true)}}/>
                            </Text>

                            {/* Delete */}
                            <Text>
                                {" "}<FontAwesome5 name="trash" size={16} color={"#777777"} onPress={() => handleDeletePrompt(post?._id)}/>
                            </Text>
                        </View>
                    )}

                    <Text style={styles.recipeTitle}>Recipe: {post?.title}</Text>
                    <Text style={styles.title}>Ingredients:</Text>
                    <Text>{post?.ingredients}</Text>
                    <Text style={styles.title}>Instructions:</Text>
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
            <Text style={styles.total}>Total Recipes: {posts?.length}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    total:
    {
        color: "#229879",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 20,
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
    title:
    {
        fontWeight: "bold",
        marginTop: 5,
    },
    footer:
    {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
});

export default RecipePost;