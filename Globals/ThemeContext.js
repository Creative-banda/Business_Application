import React, { createContext, useState } from 'react';

// Create the Context
export const ThemeContext = createContext();

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  const [themeColor, setThemeColor] = useState('#673fd2'); // Default theme color

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
