import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitalizePage from './Screens/InitalizePage';
import Tab_Navigation from './Globals/Tab_Navigation';
import ThemeScreen from './Screens/ThemeScreen';
import { ThemeProvider } from './Globals/ThemeContext';
import AddBusiness from './Screens/AddBusiness';
import Business_Info from './Screens/Business_Info'
import LoginScreen from './Screens/LoginPage';
import SignUpScreen from './Screens/SignUpPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator()

const App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [initialRoute, setInitialRoute] = useState('InitPage');
  useEffect(() => {
    // Load fonts and check AsyncStorage
    loadFonts();
    checkAsyncStorage();
  }, []);


  const loadFonts = async () => {
    await Font.loadAsync({
      'Outfit-bold': require('./assets/Fonts/Outfit-Bold.ttf'),
      'Outfit': require('./assets/Fonts/Outfit.ttf'),
    });
    setFontsLoaded(true);

  }; const checkAsyncStorage = async () => {
    try {
      const hasOpenedBefore = await AsyncStorage.getItem('hasOpenedBefore');

      if (hasOpenedBefore) {
        setInitialRoute('Login');
      }
    } catch (error) {
      console.log('Failed to load from AsyncStorage', error);
    }
  };




  if (!fontsLoaded) {
    return null;
  }


  return (

    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name='InitPage' component={InitalizePage} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreen' component={Tab_Navigation} options={{ headerShown: false }} />
          <Stack.Screen name='ThemeScreen' component={ThemeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Business_Info' component={Business_Info} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />
          <Stack.Screen name='AddBusiness' component={AddBusiness} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>


  )


}

export default App;