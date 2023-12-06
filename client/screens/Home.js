import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';

const Home = () => {
    // Destructuring the context value to get Global State
    const [state] = useContext(AuthContext);

    // Render UI
    return (
        // Top-level container View
        <View style = { styles.container }>
            <ScrollView>
                <Text>{JSON.stringify(state, null, 4)}</Text>
            </ScrollView>
            <View style = {{ backgroundColor: "#ffffff" }}>
                <FooterMenu />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        margin: 10,
        justifyContent: "space-between",
    }
});

export default Home;
