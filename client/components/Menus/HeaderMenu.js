// Summary: HeaderMenu component provides a button for logging out. 
// It uses FontAwesome5 for a sign-out icon, and the handleLogout function updates the authentication state and 
// removes authentication data from AsyncStorage. The styles are defined using StyleSheet.create.

import { View, Text, TouchableOpacity, StyleSheet  } from 'react-native';
import React, {useContext} from 'react';  // React: use JSX syntax;   useContext: To access context
import { AuthContext } from '../../context/authContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';  // FontAwesome5: library to use FontAwesome icons
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderMenu = () => {
    const [state, setState] = useContext(AuthContext)
    
    // Logout
    // Define handleLogout that performs the logout action
    // It sets the authentication state to an empty token and null user
    // Remove authentication data from AsyncStorage using AsyncStorage.removeItem
    // Display an alert indicating a successful logout
    const handleLogout  = async () => {
        setState({token:'', user:null})
        await AsyncStorage.removeItem('@auth')
        alert('Logout Successfully');
    }

  // Return JSX to render component
  // The component includes a TouchableOpacity wrapping a FontAwesome5 icon for the sign-out action
  // The onPress prop is set to the handleLogout function, triggering the logout action when the icon is pressed
  return (
    <View>
      <TouchableOpacity onPress={ handleLogout }>
        <FontAwesome5 
            name="sign-out-alt" 
            color={"red"}
            style={styles.iconStyle}/>
      </TouchableOpacity>
    </View>
  );
};

// Uses StyleSheet.create to define styles for component
// container styles define a row layout with margin and space between items
// iconStyle styles define the appearance of the FontAwesome5 icon, including marginBottom, alignment, and font size
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

// HeaderMenu component provides a button for logging out
export default HeaderMenu;