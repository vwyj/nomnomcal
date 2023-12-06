import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import FooterMenu from '../components/Menus/FooterMenu';

// flex: 1 ensures that this inner view takes up the available space
// justifyContent: "flex-end" aligns its child components to the bottom of the view
const About = () => {
  return (
    <View style = { styles.container }>
      <View style = {{ flex: 1, justifyContent: "flex-end" }}>
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
    justifyContent: "space-between",  // arranges child components with space evenly distributed between them
    marginTop: 40,
  }
});

export default About;