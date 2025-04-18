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
    <nav className="navbar-mobile">
      <div className="navbar-mobile-header">
        <button
          className="navbar-mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={handleToggle}
        >
          <span className="navbar-hamburger" />
        </button>
        <span className="navbar-mobile-title">Project Manager</span>
      </div>
      <ul className={`navbar-mobile-menu${isOpen ? ' open' : ''}`}>
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
