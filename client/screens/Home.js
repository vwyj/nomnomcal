import { View, Text, StyleSheet, ScrollView, Pressable, Image, Alert, TouchableOpacity } from 'react-native'; 
import React, { useContext, useState, useEffect } from 'react'; 
import { AuthContext } from '../context/authContext'; 
import FooterMenu from '../components/Menus/FooterMenu'; 
import axios from 'axios'; 
import mealKit from '../images/mealKit.jpg';
import recipe from '../images/recipe.jpg';
import habits from '../images/habits.png';
import consultation from '../images/consultation.jpg';
import moment from 'moment';
import { PieChart, BarChart } from 'react-native-chart-kit';
import DailyStreak from './DailyStreak';

const Home = ({ navigation }) => { 

    // Global State 
    const [state] = useContext(AuthContext); 
    const {user, token} =state;
    const [totalCalories, setTotalCalories] = useState(user?.totalCalories || '');
    const [displayedCalorieRemaining, setDisplayedCalorieRemaining] = useState(totalCalories);
    const [totalCaloriesConsumedForDate, setTotalCaloriesConsumedForDate] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allLogFood, setAllLogFood] = useState([]);
    const [monthlyCaloriesData, setMonthlyCaloriesData] = useState([]);
    const [selectedReportType, setSelectedReportType] = useState('daily');
    const [showDailyStreakModal, setShowDailyStreakModal] = useState(true);
    const [entries, setEntries] = useState([]);
    const [consumedCalories, setConsumedCalories] = useState(0);
    const [remainingCalories, setRemainingCalories] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);

    const handlePressViewDIY = () => { 
        // Navigate to the "View" screen 
        navigation.navigate('ViewDIY'); 
    }; 

    const handlePressRecipe= () => {
        // Navigate to the "View" screen
        navigation.navigate('Recipe');
    };

    const handlePressConsultation= () => {
        // Navigate to the "View" screen
        navigation.navigate('ConsultationSelection');
    };

    const handlePressStreak= () => {
        // Navigate to the "View" screen
        navigation.navigate('DailyStreak');
    };

    const handlePressHabit= () => {
        // Navigate to the "View" screen
        navigation.navigate('HealthHacks');

        
    };
  
    useEffect(() => {
      // Function to check if the daily streak modal should be displayed
      const checkDailyStreakModal = async () => {
        try {
          const { data } = await axios.get('http://ipaddress:5000/api/v1/dailyStreak/get-logged-days');
          console.log('Daily Streak Modal Data:', data);
      
          const loggedDays = data?.loggedDays || [];
          console.log('Logged Days:', loggedDays);
      
          const isTodayLogged = loggedDays.includes(moment().format('YYYY-MM-DD'));
          console.log('Is Today Logged:', isTodayLogged);
      
          setShowDailyStreakModal(!isTodayLogged);
      
        } catch (error) {
          console.error('Error checking daily streak modal:', error);
        }
      };
      
    
      checkDailyStreakModal();
    }, []);

    
  useEffect(() => {
    const fetchEntriesForDate = async () => {
      try {
        const date = moment().format('YYYY-MM-DD');
        const response = await axios.get(`http://ipaddress:5000/api/v1/dailydiary/getDaily?date=${date}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const entries = response.data;
        let totalConsumed = 0;
        entries.forEach(entry => {
          totalConsumed += entry.calories;
        });
        setConsumedCalories(totalConsumed);
      } catch (error) {
        console.error('Error fetching daily entries:', error);
      }
    };

    fetchEntriesForDate();

    const intervalId = setInterval(fetchEntriesForDate, 3000)
    return () => clearInterval(intervalId);
  }, [token]);

  useEffect(() => {
    const remainingCalories = totalCalories - consumedCalories;
    setRemainingCalories(remainingCalories > 0 ? remainingCalories : 0);
  }, [totalCalories, consumedCalories]);


  const data = [
    {
      name: 'Consumed',
      calories: consumedCalories,
      color: '#B0F991',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Remaining',
      calories: remainingCalories,
      color: '#B5B6AC',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  const dataBar={
    backgroundColor: '#f0f0f0',
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, 
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
    style: {
      borderRadius: 16,
    },
     decimalPlaces: 0,
  };

  useEffect(() => {
    
    setTotalCalories(user?.totalCalories || '');
  }, [user]);

  useEffect(() => {
    const fetchMonthlyGraph = async () => {
      try {
        const response = await axios.get('http://ipaddress:5000/api/v1/dailydiary/monthly-graph');
        console.log('Monthly graph data:', response.data);
    
        // Sort and format the monthly data
        const sortedData = response.data.sort((a, b) => {
          const monthA = moment(a.month, "MMM 'YY").toDate();
          const monthB = moment(b.month, "MMM 'YY").toDate();
          return monthA - monthB;
        });
        const roundedData = sortedData.map(month => ({
          month: month.month,
          totalCalories: Math.round(month.totalCalories),
        }));
    
        setMonthlyData(roundedData);
      } catch (error) {
        console.error('Error fetching monthly graph data:', error);
      }
    };
  
    fetchMonthlyGraph();
  
    const intervalId = setInterval(fetchMonthlyGraph, 3000); 
  
    return () => clearInterval(intervalId);
  }, []);
  
  
  const toggleReportType = () => {
    setSelectedReportType((prevType) => (prevType === 'daily' ? 'monthly' : 'daily'));
  };

   
    return ( 
        <View style = { styles.container }> 

{showDailyStreakModal && (
        <DailyStreak
          onClose={() => {
            setShowDailyStreakModal(false);
          }}
        />
      )}
         <ScrollView style={styles.scrollView}>
          
         <View style={styles.header}>
          <Text style={styles.text}>Calorie Report</Text>
          <Pressable onPress={toggleReportType} style={styles.toggleButton}>
            <Text style={styles.toggleButtonText}>
              {selectedReportType === 'daily' ? 'Daily Report' : 'Monthly Report'}
            </Text>
          </Pressable>
        </View>
        {selectedReportType === 'daily' && (
          <>
            <Text style={styles.calorieGoal}>Calorie Goal: {totalCalories}</Text>
         <PieChart
                data={data}
                width={350}
                height={200}
                chartConfig={{
                    backgroundColor: '#FFFFFF',
                    backgroundGradientFrom: '#FFFFFF',
                    backgroundGradientTo: '#FFFFFF',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="calories"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />
         </>
        )}


{selectedReportType === 'monthly' && (
  <>
  <Text style={styles.calorieGoal}>Calorie Goal: {totalCalories}</Text>
    {monthlyData.length > 0 ? (
      
      <BarChart
        data={{
          labels: monthlyData.map(month => month.month),
          datasets: [
            {
              data: monthlyData.map(month => month.totalCalories),
            },
          ],
        }}
        width={380}
        height={200}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={dataBar}
      />
    ) : (
      <Text>No monthly data available</Text>
    )}
  </>
)}

            <Pressable style={styles.button} onPress={handlePressViewDIY}> 
                <Text style={styles.text}>DIY Meal Kits</Text> 
                <Image
            source={mealKit}
            style={styles.dashboard}
            resizeMode="contain"
        />
            </Pressable> 

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
            </ScrollView>

            <View > 
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
        resizeMode: "contain"
     },
     calorieGoal: {
        fontSize: 18,
        fontWeight: 'bold', 
      },

      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      toggleButton: {
        backgroundColor: '#24987a',
        padding: 10,
        borderRadius: 5,
      },
      toggleButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
}); 
 
export default Home;