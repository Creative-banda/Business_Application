import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { enableScreens } from 'react-native-screens';


import InitalizePage from './Screens/InitalizePage';
import Tab_Navigation from './Globals/Tab_Navigation';
import ThemeScreen from './Screens/ThemeScreen';
import { ThemeProvider } from './Globals/ThemeContext';
import AddBusiness from './Screens/AddBusiness';
import Business_Info from './Screens/Business_Info';
import LoginScreen from './Screens/LoginPage';
import SignUpScreen from './Screens/SignUpPage';
import MyBusiness from './Screens/MyBusiness';
import ForgetPassword from './Screens/ForgetPassword';
import OpenMail from './Screens/OpenMail';
import Feedback from './Screens/Feedback';
import CategoryScreen from './Screens/CategoryScreen';
import Toast from 'react-native-toast-message';
import { toastConfig } from './GlobalComponents/Customalert';
import SeeReview from './Screens/SeeReview';

const Stack = createStackNavigator();
enableScreens();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  console.log("Loading App.js");
  

  useEffect(() => {
    loadFonts();
    checkInitialLaunch();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Outfit-bold': require('./assets/Fonts/Outfit-Bold.ttf'),
      'Outfit': require('./assets/Fonts/Outfit.ttf'),
    });
    setFontsLoaded(true);
    console.log("Fonts Loaded");
    
  };

  const checkInitialLaunch = async () => {
    console.log("Checking Initial Launch");
    
    try {
      const hasOpenedBefore = await SecureStore.getItemAsync('hasOpenedBefore');
      console.log("Has Opened Before: ", hasOpenedBefore);
      

      if (!hasOpenedBefore) {
        await SecureStore.setItemAsync('hasOpenedBefore', 'true');
        setInitialRoute('InitPage');
        console.log("Navigation To InitPage");
      } else {
        checkUserAuthentication();
        console.log("Checking User Authentication")
      }
    } catch (error) {
      console.log('Error reading from SecureStore:', error);
      setInitialRoute('Login');
    }
  };

  const checkUserAuthentication = async () => {
    console.log("Checking User Authentication");
    
    const token = await SecureStore.getItemAsync('token');
    console.log("Token: ", token);
    
    if (token) {
      setInitialRoute('HomeScreen');
      console.log("Navigation To HomeScreen");
      
    } else {
      setInitialRoute('Login');
      console.log("Navigation To Login");
    }
  };

  if (!fontsLoaded || !initialRoute) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="InitPage" component={InitalizePage} options={{ headerShown: false }} />
          <Stack.Screen name="HomeScreen" component={Tab_Navigation} options={{ headerShown: false }} />
          <Stack.Screen name="ThemeScreen" component={ThemeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Business_Info" component={Business_Info} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} />
          <Stack.Screen name="MyBusiness" component={MyBusiness} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }} />
          <Stack.Screen name="OpenMail" component={OpenMail} options={{ headerShown: false }} />
          <Stack.Screen name="Feedback" component={Feedback} options={{ headerShown: false }} />
          <Stack.Screen name="CateGorySelection" component={CategoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SeeReview" component={SeeReview} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={toastConfig}
        position='bottom'
        bottomOffset={80}
      />
    </ThemeProvider>
  );
};
export default App;
