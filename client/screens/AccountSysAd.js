import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import SysAdFooterMenu from '../components/Menus/SysAdFooterMenu';
import axios from 'axios';

const AccountSysAd = () => {
    // Global State
    const [state, setState] = useContext(AuthContext);
    const {user, token} =state;
    // Local State
    const [name, setName] = useState(user?.name);
    const [password, setPassword] = useState(user?.password);
    const [email] = useState(user?.email);
    const [loading, setLoading] =useState(false);
  

    // Handle Update User Data
    const handleUpdate = async() => {
        try
        {
            setLoading(true);
            const {data} = await axios.put("http://ipaddress:5000/api/v1/auth/updatePW-user", 
            {
                name, password, email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the headers
                },
            }
           );
            
        
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

    return (
        <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
        >
            <View style = {styles.container}>
                <ScrollView>
                    <View style={{ alignItems:  "center" }}>
                        <Image source={{ uri:"https://cdn-icons-png.flaticon.com/512/3177/3177440.png"}}
                        style={{ height: 200, width: 200, borderRadius: 100 }}
                    />
                    </View>
                    <Text style={styles.warningtext}>
                        *Currently, you are only able to update your password*
                    </Text>

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


                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                            <Text style={styles.updateBtnText}>{loading ? "Please Wait" : "Update Password"}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                
                <View>
                    <SysAdFooterMenu/>
                </View>  
            </View>
        </KeyboardAvoidingView>
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

export default AccountSysAd;
