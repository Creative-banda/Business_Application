import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../Screens/SearchScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState, useContext } from 'react';
import { BASE_URL } from '@env';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from './ThemeContext';

const Tab = createBottomTabNavigator();

export default function Tab_Navigation() {
  const { setUserDetails } = useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const { themeColor, textColor } = useContext(ThemeContext);


  useEffect(() => {
    const fetchuserData = async () => {
      const id = await SecureStore.getItemAsync('id');
      const token = await SecureStore.getItemAsync('token');

      if (id && token) {
        try {
          console.log("Fetching user data...");
          const response = await axios.get(`${BASE_URL}/users/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.data;
          setUserDetails(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          navigation.navigate('Login');
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No token or id found");
        navigation.navigate('Login');
      }
    };

    fetchuserData();
  }, []);

  return (
    <>
      {loading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: themeColor,
            tabBarInactiveTintColor: themeColor,
            tabBarStyle: {
              backgroundColor: textColor,
              borderTopWidth: 0,
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            color={themeColor}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            color={themeColor}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            color={themeColor}
          />
        </Tab.Navigator>
      )}
    </>
  );
}
