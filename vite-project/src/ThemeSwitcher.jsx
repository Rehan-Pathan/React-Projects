import  { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext';

function ThemeSwitcher() {
  // 1. Access toggleTheme function from ThemeContext
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ThemeSwitcher;
