import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the Context
export const ThemeContext = createContext();


// Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(''); // Default theme color
  const [textColor, setTextColor] = useState('#fff')

  useEffect(() => {
    // Retrieve the theme color from AsyncStorage
    const getThemeColor = async () => {
      try {
        const themeColor = await AsyncStorage.getItem('themeColor');
        const textColor = await AsyncStorage.getItem('textColor');
        if (themeColor !== null && textColor !== null) {
          setThemeColor(themeColor);
          setTextColor(textColor);
        }
        else {
          setThemeColor('#673fd2');
          await AsyncStorage.setItem('themeColor', '#673fd2');
          await AsyncStorage.setItem('textColor', '#fff');
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    getThemeColor();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, textColor, setTextColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
