import React, { createContext, useState } from 'react';

// Create the Context
export const ThemeContext = createContext();

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('#673fd2'); // Default theme color
  const [textColor, setTextColor] = useState('#fff')

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, textColor, setTextColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
