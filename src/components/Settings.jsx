import React, { useState, useEffect } from 'react';
import './Settings.css';

const Settings = ({ onResetData }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <div>
        <label>Theme:</label>
        <button onClick={handleThemeToggle}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      </div>
      <div>
        <button onClick={onResetData} className="reset-button">
          Reset All Data
        </button>
      </div>
    </div>
  );
};

export default Settings;