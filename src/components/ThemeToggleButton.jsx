// ThemeToggleButton.js
import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggleButton = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-800">
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggleButton;
