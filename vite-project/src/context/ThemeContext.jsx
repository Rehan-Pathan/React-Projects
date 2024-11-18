/* eslint-disable react/prop-types */
import  { createContext, useState } from 'react';

// 1. Create the ThemeContext
const ThemeContext = createContext();

// 2. Create a ThemeProvider component
const ThemeProvider = ({ children }) => {
  // 3. Initialize theme state with useState hook
  const savedTheme = localStorage.getItem('theme') || 'light';

  const [theme, setTheme] = useState(savedTheme);
  // 4. Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Save theme to local storage

  };

  // 5. Pass theme and toggleTheme to the Provider's value
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 6. Export ThemeContext and ThemeProvider for use in other components
export { ThemeContext, ThemeProvider };
