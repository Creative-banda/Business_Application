import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

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

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

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
      const hasOpenedBefore = await AsyncStorage.getItem('hasOpenedBefore');

      if (!hasOpenedBefore) {
        await AsyncStorage.setItem('hasOpenedBefore', 'true');
        setInitialRoute('InitPage');
      } else {
        checkUserAuthentication();
      }
    } catch (error) {
      console.log('Error reading from AsyncStorage:', error);
      setInitialRoute('Login'); 
    }
  };

  const checkUserAuthentication = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            if (user.emailVerified) {
              
                setUserDetails(user);
                setInitialRoute('HomeScreen');
            } else {
                // If the email is not verified, redirect to Login
                setInitialRoute('Login');
            }
        } else {
            // No user is signed in
            setInitialRoute('Login');
        }
    });
};


  if (!fontsLoaded || !initialRoute) {
    return null; // Or a loading screen component
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="InitPage" component={InitalizePage} options={{ headerShown: false }} />
          <Stack.Screen 
            name="HomeScreen" 
            component={Tab_Navigation} 
            options={{ headerShown: false }}
            initialParams={{ userDetails: { 
              uid: userDetails?.uid, 
              email: userDetails?.email, 
              name: userDetails?.displayName 
          } }}
          />
          <Stack.Screen name="ThemeScreen" component={ThemeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Business_Info" component={Business_Info} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddBusiness" component={AddBusiness} />
          <Stack.Screen name="MyBusiness" component={MyBusiness} />
          <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown:false}}/>
          <Stack.Screen name="OpenMail" component={OpenMail} options={{headerShown:false}}/>
          <Stack.Screen name="Feedback" component={Feedback} options={{headerShown:false}}/>
          <Stack.Screen name="CateGorySelection" component={CategoryScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;