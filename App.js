import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import {BASE_URL} from "@env"

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
console.log(BASE_URL);


const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);

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
  };

  const checkInitialLaunch = async () => {
    try {
      const hasOpenedBefore = await SecureStore.getItemAsync('hasOpenedBefore');

      if (!hasOpenedBefore) {
        await SecureStore.setItemAsync('hasOpenedBefore', 'true');
        setInitialRoute('InitPage');
      } else {
        checkUserAuthentication();
      }
    } catch (error) {
      console.log('Error reading from SecureStore:', error);
      setInitialRoute('Login');
    }
  };

  const checkUserAuthentication = async () => {
    const token = await SecureStore.getItemAsync('token');


    if (token) {
      setInitialRoute('HomeScreen');
    } else {
      setInitialRoute('Login');
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
        </Stack.Navigator>
      </NavigationContainer>
      <Toast
        config={toastConfig} // Add this line
        position='bottom'
        bottomOffset={80}
      />
    </ThemeProvider>
  );
};
export default App;
