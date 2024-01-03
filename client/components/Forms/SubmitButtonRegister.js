import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const SubmitButtonRegister = ({ handleSubmit, btnTitle, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.btnText}>
          {loading ? "Please Wait...": btnTitle}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitBtn:
  {
    justifyContent: "center", 
    height: 50,
    backgroundColor: '#DEDEDE',
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
      fontSize: 30,
  }
});

export default SubmitButtonRegister;