import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native'; 
import React, { useContext, useState, useEffect } from 'react'; 
import { AuthContext } from '../context/authContext'; 
import FooterMenu from '../components/Menus/FooterMenu'; 
//import ViewComponent from './ViewDIY'; 
import axios from 'axios'; 
import caloriesReport from '../images/caloriesReport.jpg';
import mealKit from '../images/mealKit.jpg';
import recipe from '../images/recipe.jpg';
import habits from '../images/habits.png';
import consultation from '../images/consultation.jpg';
import goals from '../images/goals.jpg';
import steak from '../images/icon-circle-check.png';
import ImageViewer from 'react-native-image-zoom-viewer';
import moment from 'moment';
import { PieChart } from 'react-native-chart-kit';
// import HomeSysAd from './HomeSysAd';
 
const Home = ({ navigation }) => { 

    // Global State //funtion to connect to another page
    const [state] = useContext(AuthContext); 
    const {user, token} =state;
    //const [calorieRemaining, setCalorieRemaining] = useState(totalCalories);
    const [totalCalories, setTotalCalories] = useState(user?.totalCalories.toString() || '');
    const [displayedCalorieRemaining, setDisplayedCalorieRemaining] = useState(totalCalories);
    const [totalCaloriesConsumedForDate, setTotalCaloriesConsumedForDate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allLogFood, setAllLogFood] = useState([]);

     // get all log food based on the date
     const getAllUserLog = async () =>
     {
       try
       {
         setLoading(true);
         const formattedDate = moment().format('ddd, DD MMM');
         const {data} = await axios.get('http://192.168.18.34:5000/api/v1/allLogs/get-user-logs?date=${formattedDate}');
         //const {data} = await axios.get('http://172.20.10.2:5000/api/v1/allLogs/get-user-logs?date=${formattedDate}');
         setLoading(false);
         //console.log("Data from API:", data);
         // Filter logs based on the selected date
         const filteredLogs = data?.logs.filter(log => log.dateToDb === formattedDate);
         setAllLogFood(filteredLogs);
         // Calculate total calories consumed for the selected date
         const totalCaloriesConsumed = filteredLogs.reduce((total, log) => {
           const caloriesBreakfast = log.caloriesBreakfast || 0;
           const caloriesLunch = log.caloriesLunch || 0;
           const caloriesDinner = log.caloriesDinner || 0;
 
           return total + caloriesBreakfast + caloriesLunch + caloriesDinner;
         }, 0);
 
         // Update remaining calories
         const updatedCalorieRemaining = totalCalories - totalCaloriesConsumed;
         
         // Update displayed calorie remaining
         setDisplayedCalorieRemaining(updatedCalorieRemaining);
         setTotalCaloriesConsumedForDate(totalCaloriesConsumed);
         //console.log("totalCaloriesConsumed from API:", totalCaloriesConsumed);
 
       }
       catch (error)
       {
         setLoading(false);
         //console.log(error);
         alert(error);
       }
     };
     const doughnutChartData  = [
        {
          name: 'Consumed',
          calories: totalCalories - displayedCalorieRemaining,
          color: '#B0F991', // Adjust color as needed
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
        {
          name: 'Remaining',
          calories: displayedCalorieRemaining,
          color: '#B5B6AC', // Adjust color as needed
          legendFontColor: '#7F7F7F',
          legendFontSize: 15,
        },
      ];
  
      const doughnutChartConfig = {
        backgroundColor: '#e26a00',
        backgroundGradientFrom: '#fb8c00',
        backgroundGradientTo: '#ffa726',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      };
    

    const handlePress = () => { 
        // Navigate to the "View" screen 
        navigation.navigate('ViewDIY'); 
    }; 

    const handlePressDiary = () => {
        // Navigate to the "View" screen
        navigation.navigate('Diary');
    };

    const handlePressLogFood = () => {
        // Navigate to the "View" screen
        navigation.navigate('LogFood');
    };

    const handlePressRecipe= () => {
        // Navigate to the "View" screen
        navigation.navigate('Recipe');
    };

    const handlePressGoal= () => {
        // Navigate to the "View" screen
        navigation.navigate('Goal');
    };

    const handlePressConsultation= () => {
        // Navigate to the "View" screen
        navigation.navigate('Consultation');
    };

    const handlePressStreak= () => {
        // Navigate to the "View" screen
        navigation.navigate('DailyStreak');
    };

    const handlePressHabit= () => {
        // Navigate to the "View" screen
        navigation.navigate('HealthHacks');
    };

    const handlePressHomeAdmin= () => {
      // Navigate to the "View" screen
      navigation.navigate('HomeSysAd');
  };
    useEffect(() => {
        getAllUserLog();
      }, []);
   
    return ( 
        <View style = { styles.container }> 
         <ScrollView style={styles.scrollView}> 
{/* 
         <Pressable style={styles.button} onPress={handlePressStreak}>
            <Text style={styles.text}>DailyStreak</Text> 
            <Image
            source={steak}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable> */}

          <Pressable style={styles.button} onPress={handlePressHomeAdmin}> 
                <Text style={styles.text}>Home page for sys ad</Text> 
                
            </Pressable> 



            <Text style={styles.text}>Daily calorie report</Text> 
            <Text style={styles.calorieGoal}>Calorie Goal: {totalCalories}</Text>
            <PieChart
          data={doughnutChartData}
          width={355}
          height={150}
          chartConfig={doughnutChartConfig}
          accessor="calories"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        
          
            <Pressable style={styles.button} onPress={handlePress}> 
                <Text style={styles.text}>DIY Meal Kits</Text> 
                <Image
            source={mealKit}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable> 
            {/* <Pressable style={styles.button} onPress={handlePressDiary}>
                <Text style={styles.text}>Add calorie intake</Text>
            </Pressable> */}
            <Pressable style={styles.button} onPress={handlePressRecipe}>
            <Text style={styles.text}>All Recipes</Text> 
            <Image
            source={recipe}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable>

            <Pressable style={styles.button} onPress={handlePressHabit}>
            <Text style={styles.text}>Health Hacks</Text> 
            <Image
            source={habits}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable>

            <Pressable style={styles.button} onPress={handlePressConsultation}>
            <Text style={styles.text}>Consultation Booking</Text> 
            <Image
            source={consultation}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable>

           

            {/* <Pressable style={styles.button} onPress={handlePressLogFood}>
                <Text style={styles.text}>Diary</Text>
            </Pressable> */}


{/* <Pressable style={styles.button} onPress={handlePressGoal}>
            <Text style={styles.text}>Goal</Text> 
            <Image
            source={goals}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable> */}


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
    }, 
    button: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingVertical: 12, 
        paddingHorizontal: 32, 
        borderRadius: 4, 
        //elevation: 3, 
        //backgroundColor: 'black', 
      }, 
      text: { 
        fontSize: 23, 
        lineHeight: 21, 
        fontWeight: 'bold', 
        letterSpacing: 0.25, 
        color: 'black', 
      }, 

      dashboard: {
        width: 370,
        height: 220,
        //marginBottom: 20,
       // marginRight: 300,
        resizeMode: "contain"
     },
     calorieGoal: {
        fontSize: 18,
        fontWeight: 'bold', 
      },
}); 
 
export default Home;
