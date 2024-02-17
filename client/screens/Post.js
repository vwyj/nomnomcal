import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const Post = ({navigation}) => {
    // Local State
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [calorie, setCalorie] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle form data post DATA
    const  handlePost = async () => {
        try
        {
            setLoading(true);
            // if (!title || !ingredients || !instructions || !calorie)
            // {
            //     alert("Please Fill In All Fields");
            // }
           
            const {data} = await axios.post("http://ipaddress:5000/api/v1/post/create-post", {title, ingredients, instructions, calorie});
  
            setLoading(false);
            alert(data?.message);
            navigation.navigate("Home");
        }
        catch (error)
        {
            alert(error.response.data.message || error.message);
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <View style={ styles.container }>
            <ScrollView>
                <View style={{alignItems: "center"}}>
                    <Text style={styles.header}>Create Recipe</Text>
                    <TextInput style={styles.inputBox} 
                        placeholder="Add Recipe Name"
                        placeholderTextColor={"gray"}
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />

                    <TextInput style={styles.inputBox} 
                        placeholder="Add Recipe Ingredients"
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={10}
                        value={ingredients}
                        onChangeText={(text) => setIngredients(text)}
                    />


                    <TextInput style={styles.inputBox} 
                        placeholder="Add Recipe Instructions"
                        placeholderTextColor={"gray"}
                        multiline={true}
                        numberOfLines={10}
                        value={instructions}
                        onChangeText={(text) => setInstructions(text)}
                    />

                     <TextInput style={styles.inputBoxSmall} 
                        placeholder="? kCal"
                        placeholderTextColor={"gray"}
                        multiline={false}
                        value={calorie}
                        onChangeText={(number) => setCalorie(number)}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
                        <Text style={styles.postBtnText}>
                        <FontAwesome5 name="plus-square" size={18} /> {" "}
                        Create Recipe
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style = {{ flex: 1, justifyContent: "flex-end" }}>
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
        fontSize: 20,
        fontWeight: "bold",
    },
    inputBox:
    {
        backgroundColor: "#ffffff",
        textAlignVertical:"top",
        paddingTop: 10,
        width: 340,
        marginTop: 20,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: "gray",
        borderRadius: 10,
        elevation: 3,
    },
    inputBoxSmall:
    {
        backgroundColor: "#ffffff",
        textAlignVertical:"top",
        paddingTop: 10,
        width: 60,
        marginTop: 20,
        fontSize: 16,
        paddingLeft: 15,
        borderColor: "gray",
        borderRadius: 10,
        elevation: 3,
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
        borderRadius: 15,
    },
    postBtnText: 
    {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
});


export default Post;