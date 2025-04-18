import React, { useState, useEffect } from 'react';

const Settings = ({ onResetData }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="card"> {/* Wrap in a card */}
      <div className="card-body"> {/* Card body */}
        <h5 className="card-title mb-3">Settings</h5> {/* Card title */}
        {/* Removed theme toggle */}
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