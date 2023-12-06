import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import FooterMenu from '../components/Menus/FooterMenu';

const Home = () => {
    // Global State
    const [state] = useContext(AuthContext);
    return (
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
