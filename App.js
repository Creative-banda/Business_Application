import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitalizePage from './Screens/InitalizePage';
import Tab_Navigation from './Globals/Tab_Navigation';
import { ThemeProvider } from './Globals/ThemeContext';

const stack = createStackNavigator()

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
    return null; // Render nothing while waiting for fonts to load
  }


  return (

    <ThemeProvider>
      <NavigationContainer>

        <stack.Navigator initialRouteName='InitPage'>
          <stack.Screen name='InitPage' component={InitalizePage} options={{ headerShown: false }} />
          <stack.Screen name='HomeScreen' component={Tab_Navigation} options={{ headerShown: false }} />
        </stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>


  )


}

export default App;