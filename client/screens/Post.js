import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const Post = ({navigation}) => {
    // Local State using useState hook
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle form data post DATA
    const  handlePost = async () => {
        try
        {
            setLoading(true);   // set loading to true
            // Validate title and description
            if (!title)
            {
                alert("Please add Post Title");
            }
            if (!description)
            {
                alert("Please add Post Description");
            }
            // Make a POST request to create a new post
            const {data} = await axios.post("/post/create-post", {title, description});
            setLoading(false);  // set loading to false
            alert(data?.message);   // show success message
            // navigation.navigate("Home");    // Navigate to Home screen after successful post creation
        }
        catch (error)
        {
            alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
        }
    }

    // Render UI
    return (
        // Top-level container View
        <View style={ styles.container }>
            // ScrollView to scroll content
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    // Header text create post
                    <Text style={styles.header}>Create Post</Text>
                    
                    // TextInput to add post title
                    <TextInput style={styles.inputBox} 
                        placeholder="Add Post Title"
                        placeholderTextColor={"gray"}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />

                    // TextInput to add post description
                    <TextInput style={styles.inputBox} 
                        placeholder="Add Post Description"
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={6}
                        value={description}
                        onChangeText={(text) => setDescription(text)}
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    // TouchableOpacity to trigger handlePost function
                    <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                        <Text style={styles.postBtnText}>
                        <FontAwesome5 name="plus-square" size={18} /> {" "}
                        Create Post
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            // Bottom container View with FooterMenu
            <View style = {{ flex: 1, justifyContent: "flex-end" }}>
                // Render FooterMenu component
                <FooterMenu/>
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
        marginTop: 40,
    },
    header:
    {
        fontSize: 25,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    inputBox:
    {
        backgroundColor: "#ffffff",
        textAlignVertical:"top",
        paddingTop: 10,
        width: 320,
        marginTop: 30,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: "gray",
        borderWidth: 1,
    },
    postBtn:
    {
        backgroundColor: "black",
        width: 300,
        marginTop: 30,
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    postBtnText: 
    {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
});


export default Post;