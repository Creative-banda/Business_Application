import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create the Context
export const ThemeContext = createContext();

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(''); // Default theme color
  const [textColor, setTextColor] = useState('#fff');
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Retrieve the theme color from SecureStore
    const getThemeColor = async () => {
      try {
        const themeColor = await SecureStore.getItemAsync('themeColor');
        const textColor = await SecureStore.getItemAsync('textColor');
        if (themeColor !== null && textColor !== null) {
          setThemeColor(themeColor);
          setTextColor(textColor);
        } else {
          setThemeColor('#673fd2');
          await SecureStore.setItemAsync('themeColor', '#673fd2');
          await SecureStore.setItemAsync('textColor', '#fff');
        }
      } catch (e) {
        console.log(e);
      }
    };

    getThemeColor();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, textColor, setTextColor, userDetails, setUserDetails }}>
      {children}
    </ThemeContext.Provider>
  );
};
