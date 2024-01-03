import { View, Text, StyleSheet, ScrollView,Image } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list';
 

const UserAccount = () => {
    // Global State
    const [state] = useContext(AuthContext);
    const [actor, setActor] = useState("User");

    const actors = [
        { key: 'U', value: 'User' },
        { key: 'PO', value: 'Product Owner' },
        { key: 'BO', value: 'Vendor' },
      ];
    return (
        <View style = { styles.container }>
            <Text>hello</Text>

            <View style={{ backgroundColor: "#ffffff" }}>
                <FooterMenu />
            </View>
        </View>
);
};
            
       /*     <SelectList
          setSelected={setActor}
          data={actors}
          placeholder="Select a user profile"
          search={false}
          boxStyles={{ borderColor:'#E1E0E0', backgroundColor: '#E1E0E0',borderWidth: 1,
          marginBottom: 10,
          paddingLeft: 10,
          borderRadius: 30, }} //override default styles
          dropdownStyles={{ borderRadius: 20, backgroundColor: '#E1E0E0',  marginBottom: 18}}
          
        /> */

            <View style = {{ backgroundColor: "#ffffff" }}>
                <FooterMenu />
            </View>
        
   
 

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
        marginTop: 40,
    },
    dashboard: {
        width: 370,
        height: 220,
        //marginBottom: 20,
       // marginRight: 300,
        resizeMode: "contain"
     },
     dropdownContainer: {
        position: 'absolute',
        top: 10,  // Adjust as needed
        right: 10, // Adjust as needed
    },
    selectListBox: {
        borderColor: '#E1E0E0',
        backgroundColor: '#E1E0E0',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 30,
        // Add any additional styling as required
    },
    selectListDropdown: {
        borderRadius: 20,
        backgroundColor: '#E1E0E0',
        marginBottom: 18,
        // Add any additional styling as required
    }
});

export default UserAccount;