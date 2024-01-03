import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenu = () => {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <FontAwesome5 
          name="home" 
          style={styles.iconStyle}
          color={route.name === "Home" && "orange"}
        />
        <Text>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5 
            name="plus-square" 
            style={styles.iconStyle} 
            color={route.name === "Post" && "orange"}
        />
        <Text>Recipe</Text>
        </TouchableOpacity>

       {/* Add Image component for the diary logo */}
       <TouchableOpacity onPress={() => navigation.navigate("LogFood")}>
       <FontAwesome5 
            name="book-open" 
            style={styles.iconStyle}
            color={route.name === "LogFood" && "orange"}
          />
          <Text>Diary</Text>
        </TouchableOpacity>

         {/* Replace with the "coins" icon */}
      <TouchableOpacity onPress={() => navigation.navigate("ViewDIY")}>
        <FontAwesome5 
          name="coins" 
          style={styles.iconStyle}
          color={route.name === "ViewDIY" && "orange"}
        />
        <Text>Loyalty</Text>
      </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
        <FontAwesome5 
          name="user" 
          style={styles.iconStyle}
          color={route.name === "Account" && "orange"}
        />
        <Text>Account</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container:
    {
        flexDirection: "row",
        margin: 10,
        justifyContent: "space-between",
    },

    iconStyle:
    {
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 25,
    },
});

export default FooterMenu;