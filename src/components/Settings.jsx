import React, { useState, useEffect } from 'react';

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
    <div className="card"> {/* Wrap in a card */}
      <div className="card-body"> {/* Card body */}
        <h5 className="card-title mb-3">Settings</h5> {/* Card title */}
        <div className="mb-3"> {/* Add margin */}
          <label className="form-label me-2">Theme:</label> {/* Use form-label and margin */}
          <button onClick={handleThemeToggle} className="btn btn-secondary btn-sm"> {/* Bootstrap button classes */}
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
        <div>
          <button onClick={onResetData} className="btn btn-danger btn-sm"> {/* Bootstrap button classes */}
            Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;