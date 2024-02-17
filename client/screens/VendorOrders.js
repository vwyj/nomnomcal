import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import UserPurchase from './UserPurchase';
import { AuthContext } from '../context/authContext';

const VendorOrders = () => {
  const [Orders, setOrders] = useState([]);
  const [state, setState] = useContext(AuthContext);
    const {user, token} =state;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://ipaddress:5000/api/v1/diymealkit/pending-diy-meal-kits');
      const data = await response.json();

      setOrders(data.diyMealKitsOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);

    }
  };

  
  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await fetch(`http://ipaddress:5000/api/v1/diymealkit/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, 
      },
        body: JSON.stringify({ status: 'Accepted' }), 
      });
  
      if (response.ok) {
        
        fetchOrders();
      } else {
        console.error('Error accepting order:', response.statusText);
        
      }
    } catch (error) {
      console.error('Error accepting order:', error);
    } 
  };

  
  const handleRejectOrder = async (orderId) => {
    try {

      const response = await fetch(`http://ipaddress:5000/api/v1/diymealkit/ordersReject/${orderId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, 
      },
        body: JSON.stringify({ status: 'Rejected' }), 
      });
  
      if (response.ok) {
        fetchOrders();
      } else {
        console.error('Error rejecting order:', response.statusText);
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
    } 
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <Text style={styles.header}>Order Details</Text>
        <Text style={styles.font}>Order Information</Text>

        {Orders.map(order => (
          <View key={order._id} style={styles.container1}>
            <Text>Order Name: {order.diymealkit || 'Unknown'}</Text>
            <Text>Ordered By: {order.postedBy ? order.postedBy.name : 'Unknown'}</Text>
            <Text  style={styles.font3}>Status: {order.status || 'Unknown'}</Text>
            <Text>Allergy: {order.postedBy ? order.postedBy.allergyString : 'Null'}</Text>
          
            <Text>Address: {order.postedBy?.address ?        
    `${order.postedBy.address.block} ${order.postedBy.address.street} \n                 ${order.postedBy.address.building}\n                #${order.postedBy.address.unit}-${order.postedBy.address.floor}\n                ${order.postedBy.address.country}  ${order.postedBy.address.postal} ` 
    : 'Address Not Available'}</Text> 


            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity style={styles.container2} onPress={() => handleAcceptOrder(order._id)}>
                <Text style={styles.font1}>Accept</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.container3} onPress={() => handleRejectOrder(order._id)}>
                <Text style={styles.font1}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
    container1: 
    {
      backgroundColor: '#FFFFFF', 
      borderRadius: 5, 
      padding: 8, 
      borderWidth: 0.5,
      marginLeft: 20,
      marginRight: 20,
    },
    container2: 
    {
      backgroundColor: '#006648', 
      borderRadius: 5, 
      padding: 8, 
      borderColor: '#D4D5D9',
      borderWidth: 0.5,
      paddingHorizontal: 66,
    },
    container3: 
    {
      backgroundColor: '#B32B34', 
      borderRadius: 5, 
      padding: 8, 
      borderColor: '#D4D5D9',
      borderWidth: 0.5,
      paddingHorizontal: 66,
    },
    payButton: 
    {   
        alignItems: 'center', 
        backgroundColor: '#008871', 
        borderRadius: 5, 
        padding: 8, 
        borderColor: '#D4D5D9',
        borderWidth: 0.5,
        margin: 10,
        marginLeft: 20,
        marginRight: 20,
    },
    header:
    {
        color: "#4D4D4D",
        fontSize: 16,
        fontWeight: "bold",
        margin: 10,
        marginLeft: 20,
    },
    font:
    {
        color: "#4D4D4D",
        fontSize: 14,
        margin: 5,
        marginLeft: 20,
        marginTop: 10,
    },
    font1:
    {
        color: "#FFFFFF",
        fontSize: 14,
        margin: 5,
        justifyContent: 'center',
        
    },
    font3:
    {
        fontWeight: "bold",
    },
    payFont:
    {
        color: "#FFFFFF",
        fontSize: 16,
        margin: 3,

    }

  });

export default VendorOrders;

