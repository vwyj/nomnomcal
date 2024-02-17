import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import FooterMenuPO from '../components/Menus/FooterMenuPO';

const HomePO = () => {
  const [userCount, setUserCount] = useState(null);
  const [bestDiy, setBestDiy] = useState(null);
  const [mostPopularDate, setMostPopularDate] = useState(null);
  const [mostPopularAgeGrp, setMostPopularAgeGrp] = useState(null);
  const [data, setData] = useState([]);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-indexed, so we add 1
  const startMonth = currentMonth - 5 > 0 ? currentMonth - 5 : currentMonth + 7 - 5;

  useEffect(() => {
    fetchGraphData();
    fetchUsernDIY();
    fetchMostPopularDate();
    fetchMostPopularAgeGrp();
  }, []);
  
  const fetchGraphData = async () => {
    try {
      const response = await axios.get('http://ipaddress:5000/api/v1/diymealkit/monthly-data');
      const graphData = response.data.graphData;
  
      // Process the graphData as needed
      console.log(graphData);
  
      setData(graphData);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsernDIY = async () => {
    try {
      const response = await axios.get(`http://ipaddress:5000/api/v1/auth/getUserCount`);
      const data = response.data;
      setUserCount(data.userCount);
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get(`http://ipaddress:5000/api/v1/diymealkit/bestsellingDiy`);
      const data = response.data;
      setBestDiy(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMostPopularDate = async () => {
    try {
      const response = await axios.get('http://ipaddress:5000/api/v1/diymealkit/popDate');
      const mostPopDate = response.data;
      setMostPopularDate(mostPopDate);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMostPopularAgeGrp = async () => {
    try {
      const response = await axios.get('http://ipaddress:5000/api/v1/diymealkit/popAgeGrp');
      const popularAgeGroup = response.data;
      setMostPopularAgeGrp(popularAgeGroup);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Revenue Report</Text>
      {data.length > 0 && (
        <BarChart
          data={{
            labels: data
              .sort((a, b) => a.year - b.year || a.month - b.month)
              .map(item => {
                const monthNames = [
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'
                ];

                const monthIndex = (item.month + 5) % 12; 

                if (monthIndex >= 0 && monthIndex < monthNames.length) {
                  const month = monthNames[monthIndex];
                  const year = item.year % 100; // Use the last two digits of the year
                  return `${month}'${year.toString().padStart(2, '0')}`;
                } else {
                  return 'Invalid Month';
                }
              }),
                      
            datasets: [
              {
                data: data.map(item => item.totalAmount),
              },
            ],
          }}
          width={400}
          height={200}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#f0f0f0',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Change color to blue
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Change label color to black
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 0, // Set border width to 0 to remove the line
            },
          }}
        />
      )}
 
 <TouchableOpacity style={styles.button} onPress={() => console.log('User Count Pressed')}>
    <Text style={styles.buttonText}>
      {userCount !== null ? `Overall Users Count: ${userCount}` : 'Loading...'}
    </Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.button} onPress={() => console.log('Best DIY Pressed')}>
    <Text style={styles.buttonText}>
      {bestDiy !== null ? `Top-Selling Mealkit: ${bestDiy}` : 'Loading...'}
    </Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.button} onPress={() => console.log('Most Popular Date Pressed')}>
    <Text style={styles.buttonText}>
      {mostPopularDate !== null ? mostPopularDate : 'Loading most popular date...'}
    </Text>
  </TouchableOpacity>
  
  <TouchableOpacity style={styles.button} onPress={() => console.log('Most Popular Age Group Pressed')}>
    <Text style={styles.buttonText}>
      {mostPopularAgeGrp !== null ? mostPopularAgeGrp : 'Loading most popular age group...'}
    </Text>
  </TouchableOpacity>

      
      <View >
        <FooterMenuPO />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    marginTop: 40,
//    backgroundColor: '#FFA07A', // Lighter, brighter orange background color
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: '#E53935', // Bright red for attention-grabbing
    marginBottom: 20,
    textTransform: 'uppercase', // UPPERCASE for added impact
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    fontFamily: 'Futura',
 
  },

  buttonText: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Futura',
    color: '#FFFFFF',  
    backgroundColor: '#008080', 
    paddingVertical: 6,  
    paddingHorizontal: 12,  
    borderRadius: 20,  
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,  
  },
});

export default HomePO;