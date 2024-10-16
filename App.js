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

const Stack = createStackNavigator()

const App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Outfit-bold': require('./assets/Fonts/Outfit-Bold.ttf'),
      'Outfit': require('./assets/Fonts/Outfit.ttf'),
    });
    setFontsLoaded(true);

  };

  useEffect(() => {
    loadFonts();
  }, []);


  if (!fontsLoaded) {
    return null; 
  }


  return (

    <ThemeProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName='HomeScreen'>
          <Stack.Screen name='InitPage' component={InitalizePage} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreen' component={Tab_Navigation} options={{ headerShown: false }} />
          <Stack.Screen name='ThemeScreen' component={ThemeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='Business_Info' component={Business_Info} options={{ headerShown: false }} />
          <Stack.Screen name='AddBusiness' component={AddBusiness} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>


  )


}

export default App;