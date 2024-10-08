import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../Screens/SearchScreen';
import HomeScreen from '../Screens/HomeScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const Tab = createBottomTabNavigator();

export default function Tab_Navigation() {
  const { themeColor, textColor } = useContext(ThemeContext);
  
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
        tabBarActiveTintColor: themeColor,  // Use textColor for active tab icon color
        tabBarInactiveTintColor: 'gray',  // Inactive tab icon color
        tabBarStyle: {
          backgroundColor: textColor,  // Change this to your desired color
          borderTopWidth: 0, // Optional: Remove border at the top
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
