import { View, Text, StyleSheet, Image, TextInput, Touchable, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import axios from 'axios';

const Account = () => {
    // Global State
    const [state, setState] = useContext(AuthContext);
    const {user, token} =state;
    // Local State
    const[name, setName] = useState(user?.name);
    const[password, setPassword] = useState(user?.password);
    const[email] = useState(user?.email);
    const[loading, setLoading] =useState(false);    // loading: a state variable to track whether data is currently being updated

    // Handle Update User Data
    // handleUpdate: makes a PUT request to update user data
    // Set loading state to true to indicate that data is being updated
    // Use axios.put to make a PUT request to the server's /auth/update-user endpoint with the updated user data
    const handleUpdate = async() => {
        try
        {
            setLoading(true);
            const {data} = await axios.put("/auth/update-user", 
            {
                name, password, email
            });
            
            setLoading(false);
            let UD = JSON.stringify(data);
            setState({ ...state, user: UD?.updatedUser });
            alert(data && data.message);
        }
        catch (error)
        {
            alert(error.response.data.message);
            setLoading(false);
            console.log(error);
        }
    };

    // Render UI Components
    return (
        <View style = {styles.container}>
            <ScrollView>
            // Display Profile Image and Warning Text
                <View style={{ alignItems:  "center" }}>
                    <Image source={{ uri:"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}}
                    style={{ height: 200, width: 200, borderRadius: 100 }}
                />
                </View>
                <Text style={styles.warningtext}>
                    Currently, you are only able to update your name and password*
                </Text>

                // Handle Input Fields
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={email}
                        editable={false}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Role</Text>
                    <TextInput 
                        style={styles.inputBox}
                        value={state?.user.role}
                        editable={false}
                    />
                </View>

                // Handle Update Button
                // Creates a button (TouchableOpacity) to trigger the handleUpdate function
                // Displays different text on the button based on the loading state
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                        <Text style={styles.updateBtnText}>{loading ? "Please Wait" : "Update Profile"}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            // Renders the FooterMenu component at the bottom of the screen
            // Applies styling to position it at the bottom using flex and justifyContent
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
    warningtext:
    {
        color: 'red',
        fontSize: 13,
        textAlign: "center",
    },
    inputContainer:
    {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center,"
    },
    inputText:
    {
        fontWeight: "bold",
        width:  70,
        color: "grey",
    },
    inputBox:
    {
        width: 250,
        backgroundColor: "#ffffff",
        marginLeft: 10,
        fontSize: 16,
        paddingLeft: 20,
        borderRadius: 5,
    },
    updateBtn:
    {
        backgroundColor: "black",
        color: "white",
        height: 40,
        width: 250,
        borderRadius: 10,
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    updateBtnText:
    {
        color: "#ffffff",
        fontSize: 16,
    },

});

export default Account;
