import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, ScrollView} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EditModal = ({ modalVisible, setModalVisible, post }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [instructions, setInstructions] = useState("");
    const [calorie, setCalorie] = useState("");

    // Handle Update Post
    const updatePostHandler = async (id) => {
        try 
        {
            const {data} = await axios.put(`/post/update-post/${id}`, {title, ingredients, instructions, calorie});
            alert(data?.message)
            navigation.push("PostCompilation");
        }
        catch(error)
        {
            console.log(error)
            alert(error)
        }
    }

    // Initial Post Data
    useEffect(() => {
        setTitle(post?.title);
        setIngredients(post?.ingredients);
        setInstructions(post?.instructions);
        setCalorie(post?.calorie);
    }, [post]);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <ScrollView 
                        style={styles.modalView}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* <Text>{JSON.stringify(post, null, 4)}</Text> */}

                        <Text style={styles.modalText}>Update your Recipe</Text>
                        
                        {/* Recipe Name */}
                        <Text style={styles.textFont}>Recipe Name:</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            value={title}
                            onChangeText={(text) => {setTitle(text);
                            }} 
                        />
                        
                        {/* Ingredients */}
                        <Text style={styles.textFont}>Ingredients:</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            value={ingredients}
                            onChangeText={(text) => {setIngredients(text);
                            }} 
                            multiline={true} 
                            numberOfLines={4}
                        />
                        
                        {/* Instructions */}
                        <Text style={styles.textFont}>Instructions:</Text>
                        <TextInput 
                            style={styles.inputBox} 
                            value={instructions} 
                            onChangeText={(text) => {setInstructions(text);
                            }} 
                            multiline={true} 
                            numberOfLines={4}
                        />
                        
                        {/* Calorie */}
                        <Text style={styles.textFont}>Calorie:</Text>
                        <TextInput 
                            style={styles.inputBoxSmall} 
                            value={`${calorie}`} 
                            keyboardType="numeric"
                            onChangeText={(number) => {setCalorie(number);
                            }} 
                            placeholder='? kCal'
                        />
                        
                        <View style={styles.btnContainer}>
                            {/* Cancel Button */}
                            <Pressable
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </Pressable>

                            {/* Update Button */}
                            <Pressable
                                style={styles.button}
                                onPress={() => {updatePostHandler(post && post._id), setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Update</Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: 
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: 
    {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 35,
      width: 380,
      elevation: 5,
    },
    format:
    {
        justifyContent: 'center',
    },
    button: 
    {
      borderRadius: 20,
      backgroundColor: '#4085FF',
      padding: 10,
      width: 100,
      margin: 10,
      marginVertical: 10,
      elevation: 3,
    },
    btnContainer:
    {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textStyle: 
    {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: 
    {
      marginBottom: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    textFont:
    {
        fontWeight: 'bold',
    },
    inputBox:
    {
        textAlignVertical: 'top',
        paddingTop: 10,
        marginBottom: 15,
        backgroundColor: "#F5F6FB",
        borderRadius: 12,
        marginTop: 10,
        paddingLeft: 10,
        elevation: 3,
    },
    inputBoxSmall:
    {
        marginBottom: 15,
        backgroundColor: "#F5F6FB",
        borderRadius: 12,
        marginTop: 10,
        paddingLeft: 10,
        width: 60,
        elevation: 3,
    },
});

export default EditModal;