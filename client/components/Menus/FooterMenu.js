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

        <TouchableOpacity onPress={() => navigation.navigate("Recipe")}>
        <FontAwesome5 
            name="plus-square" 
            style={styles.iconStyle} 
            color={route.name === "Recipe" && "orange"}
        />
        <Text>Recipe</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <FontAwesome5 
            name="plus-square" 
            style={styles.iconStyle} 
            color={route.name === "Post" && "orange"}
        />
        <Text>Post</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("About")}>
        <FontAwesome5 
          name="info-circle" 
          style={styles.iconStyle}
          color={route.name === "About" && "orange"}
        />
        <Text>About</Text>
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
        marginHorizontal: 5,
        alignSelf: "center",
        fontSize: 25,
    },
});

export default FooterMenu;