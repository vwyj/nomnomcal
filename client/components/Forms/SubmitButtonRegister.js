import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const SubmitButtonRegister = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {loading ? "Register": btnTitle}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    submitBtn:
    {
      height: 50,
      borderColor: '#7D7A7A',
      backgroundColor: '#7D7A7A',
      borderWidth: 1,
      marginBottom: 10,
      marginLeft: 20,
      paddingLeft: 10,
      borderRadius: 30,
      width: 372
    },
   
    btnText: 
    {
        color: "#000000",
        textAlign: "center",
        fontSize: 33,
        fontWeight: "400",
    }
});

export default SubmitButtonRegister;