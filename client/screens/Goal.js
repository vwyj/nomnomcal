import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import React, {useState} from 'react';
import FooterMenu from '../components/Menus/FooterMenu';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
//import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

//const { width, height } = useWindowDimensions();

//const Home = ({ navigation }) => {  
const Goal = ({navigation}) => {

   

    const [goal, setGoal] = useState('');

    const handlePressGoalMsg = () => {
        if (goal) {
         navigation.navigate('GoalMsg');
            //console.log('Selected Goal:', goal);
            // Perform the desired action with the selected goal
        } else {
            alert('Please select a goal');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.centeredView}>
                <ScrollView>
                    <View style={styles.goalForm}>
                        <Text style={styles.header}>Select Your Goal</Text>

                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>Lose Weight</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => setGoal('Lose Weight')}
                            >
                                {goal === 'Lose Weight' && (
                                    <FontAwesome5
                                        name="check"
                                        size={20}
                                        color="green"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>Gain Weight</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => setGoal('Gain Weight')}
                            >
                                {goal === 'Gain Weight' && (
                                    <FontAwesome5
                                        name="check"
                                        size={20}
                                        color="green"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>Maintain Weight</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => setGoal('Maintain Weight')}
                            >
                                {goal === 'Maintain Weight' && (
                                    <FontAwesome5
                                        name="check"
                                        size={20}
                                        color="green"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.radioContainer}>
                            <Text style={styles.radioLabel}>Gain Muscle</Text>
                            <TouchableOpacity
                                style={styles.radioCircle}
                                onPress={() => setGoal('Gain Muscle')}
                            >
                                {goal === 'Gain Muscle' && (
                                    <FontAwesome5
                                        name="check"
                                        size={20}
                                        color="green"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Other radio buttons */}

                    </View>
                </ScrollView>
            

            <TouchableOpacity style={styles.postBtn} onPress={handlePressGoalMsg}>
                <Text style={styles.postBtnText}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
    },
    centeredView: {
        borderWidth: 2,
        borderColor: 'lightgrey',
        padding: 20,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    goalForm: {
        marginTop: 10,
    },
    header: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    radioLabel: {
        fontSize: 18,
    },
    radioCircle: {
        borderWidth: 2,
        borderRadius: 50,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postBtn: {
        //alignItems: 'center',
        //backgroundColor: '#1C1C1C',
        //padding: 10,
        //marginHorizontal: 10,
        //marginTop: 20,
        //borderRadius: 5,

        backgroundColor: '#4A69D9',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        //width: windowWidth - 40,
        width : '40%',
        marginTop: 10,
        alignSelf: 'flex-end',


    },
    postBtnText: {
        color: 'white',
        fontSize: 18,
    },
});


export default Goal;

