import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create the Context
export const ThemeContext = createContext();

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState(''); // Default theme color
  const [textColor, setTextColor] = useState('#fff');
  const [userDetails, setUserDetails] = useState({});
  const [token, setToken] = useState('');

  useEffect(() => {
    // Retrieve the theme color from SecureStore
    const getThemeColor = async () => {
      console.log('Getting Theme Color');
      
      try {
        const themeColor = await SecureStore.getItemAsync('themeColor');
        const textColor = await SecureStore.getItemAsync('textColor');
        const token = await SecureStore.getItemAsync('token');
        if (themeColor !== null && textColor !== null && token !== null) {
          setThemeColor(themeColor);
          setToken(token);
          setTextColor(textColor);          
        } else {
          setThemeColor('#673fd2');
          await SecureStore.setItemAsync('themeColor', '#673fd2');
          await SecureStore.setItemAsync('textColor', '#fff');
          await SecureStore.setItemAsync('token', '');
        }
      } catch (e) {
        console.log(e);
      }
    };

    getThemeColor();
  }, []);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, textColor, setTextColor, userDetails, setUserDetails, setToken, token }}>
      {children}
    </ThemeContext.Provider>
  );
};
