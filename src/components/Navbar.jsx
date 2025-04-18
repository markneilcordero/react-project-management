import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleNavClick = (section) => {
    onSectionChange(section);
    setIsOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-mobile">
      <div className="container-fluid navbar-mobile-header">
        <span className="navbar-mobile-title navbar-brand">Project Manager</span>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>
      <ul className={`navbar-mobile-menu${isOpen ? ' open' : ''}`}
        style={{ display: isOpen ? 'flex' : 'none' }}
      >
        <li>
          <button className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => handleNavClick('dashboard')}>Dashboard</button>
        </li>
        <li>
          <button className={activeSection === 'projects' ? 'active' : ''} onClick={() => handleNavClick('projects')}>Projects</button>
        </li>
        <li>
          <button className={activeSection === 'tasks' ? 'active' : ''} onClick={() => handleNavClick('tasks')}>Tasks</button>
        </li>
        <li>
          <button className={activeSection === 'settings' ? 'active' : ''} onClick={() => handleNavClick('settings')}>Settings</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
