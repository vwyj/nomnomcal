// Summary: Represents a menu bar with icons and labels for different sections of the application. 
// It uses FontAwesome5 icons, TouchableOpacity for interaction, and navigation hooks to navigate to different screens 
// based on user actions. The appearance and layout are styled using the styles object.

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';  // components to build UI
import React from 'react';  // to use JSX syntax
import { useNavigation, useRoute } from '@react-navigation/native';   // to access navigation-related information
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';    // to use FontAwesome icons 

const FooterMenu = () => {
  // Navigation Hooks
  // Uses the useNavigation hook to get the navigation object, allowing navigation to other screens.
  // Uses the useRoute hook to get information about the current route.
  const navigation = useNavigation();
  const route = useRoute();

  // Returning JSX for the footerMenu Component Structure
  return (
    <View style={styles.container}>

        // Rendering TouchableOpacity Components for Each Menu Item
        // onPress: set to navigate to each respective screen using navigation.navigate
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

// Use StyleSheet.create  to define styles for the component
// container styles define a row layout with margin and space between items
// iconStyle styles define the appearance of the FontAwesome5 icons, including marginBottom, alignment, and font size
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