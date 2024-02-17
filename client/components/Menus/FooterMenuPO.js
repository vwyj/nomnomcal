import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenuPO = () => {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("HomePO")}>
        <FontAwesome5 
          name="home" 
          style={styles.iconStyle}
          color={route.name === "HomePO" && "orange"}
        />
        <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("AccountPO")}>
        <FontAwesome5 
          name="user" 
          style={styles.iconStyle}
          color={route.name === "AccountPO" && "orange"}
        />
        <Text>Account</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    justifyContent: "space-evenly",
  },

  iconStyle: {
    marginBottom: 3,
    alignSelf: "center",
    fontSize: 25,
  },
});


export default FooterMenuPO;