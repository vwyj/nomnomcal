import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const SearchButton = ({ handleSubmit }) => {
    const [search, setSearch] = useState("");

    return (
        <View style={ styles.searchBar }>
            <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.SearchBtnText}>
                <FontAwesome5Icon name="search" />
                </Text>

                <TextInput 
                    style={styles.inputBox} 
                    placeholder="Search Recipe"
                    placeholderTextColor={"gray"}
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: 
    {
        flex: 1,
        margin: 10,
        margintop: 40,
        backgroundColor:"#fff",
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginVertical: 16,
        borderRadius: 10,
        elevation: 5,
    },

    SearchBtnText: 
    {
        color: "gray",
        fontSize: 18,
    },

});
export default SearchButton;