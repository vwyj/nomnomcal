import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const FooterMenuVendor = () => {
  // Hooks
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeVendor")}>
        <FontAwesome5 
          name="home" 
          style={styles.iconStyle}
          color={route.name === "HomeVendor" && "#1A8871"}
        />
        <Text>Home</Text>
        </TouchableOpacity>

        {/* Add Image component for the diary logo */}
       <TouchableOpacity onPress={() => navigation.navigate("VendorViewDIY")}>
       <FontAwesome5 
            name="book-open" 
            style={styles.iconStyle}
            color={route.name === "DIY" && "#1A8871"}
          />
          <Text>View</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateDIY")}>
        <FontAwesome5 
            name="plus-square" 
            style={styles.iconStyle} 
            color={route.name === "CreateDIY" && "#1A8871"}
        />
        <Text>Create</Text>
        </TouchableOpacity>

         {/* Replace with the "coins" icon */}
      <TouchableOpacity onPress={() => navigation.navigate("VendorOrders")}>
        <FontAwesome5 
          name="coins" 
          style={styles.iconStyle}
          color={route.name === "VendorOrders" && "#1A8871"}
        />
        <Text>Orders</Text>
      </TouchableOpacity>


        <TouchableOpacity onPress={() => navigation.navigate("AccountVendor")}>
        <FontAwesome5 
          name="user" 
          style={styles.iconStyle}
          color={route.name === "AccountVendor" && "#1A8871"}
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
        margin: 5,
        justifyContent: "space-between",
    },

    iconStyle:
    {
        marginBottom: 3,
        alignSelf: "center",
        fontSize: 25,
    },
});

export default FooterMenuVendor;