import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../Screens/SearchScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Tab = createBottomTabNavigator();

export default function Tab_Navigation({ route }) {
  const { themeColor, textColor } = useContext(ThemeContext);
  const { userDetails } = route.params || {}; // Get userDetails from route params

  return (
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
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: textColor,
          borderTopWidth: 0,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        initialParams={{ userDetails }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        initialParams={{ userDetails }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        initialParams={{ userDetails }}
      />
    </Tab.Navigator>
  );
}