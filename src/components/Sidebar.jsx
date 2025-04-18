import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSectionChange = (section) => {
    onSectionChange(section);
    setIsOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="sidebar-toggle d-md-none"
        aria-label="Toggle sidebar"
        aria-expanded={isOpen}
        onClick={handleToggle}
      >
        <span className="hamburger" />
      </button>
      <aside className={`sidebar bg-primary text-white${isOpen ? ' open' : ''}`}>
        <div className="sidebar-header p-3 mb-4">
          <h2 className="h4">Project Manager</h2>
        </div>
        <nav>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white w-100 text-start${activeSection === 'dashboard' ? ' active' : ''}`}
                style={{ background: 'none', border: 'none', outline: 'none' }}
                onClick={() => handleSectionChange('dashboard')}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white w-100 text-start${activeSection === 'projects' ? ' active' : ''}`}
                style={{ background: 'none', border: 'none', outline: 'none' }}
                onClick={() => handleSectionChange('projects')}
              >
                Projects
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white w-100 text-start${activeSection === 'tasks' ? ' active' : ''}`}
                style={{ background: 'none', border: 'none', outline: 'none' }}
                onClick={() => handleSectionChange('tasks')}
              >
                Tasks
              </button>
            </li>
            <li className="nav-item mb-2">
              <button
                className={`nav-link text-white w-100 text-start${activeSection === 'settings' ? ' active' : ''}`}
                style={{ background: 'none', border: 'none', outline: 'none' }}
                onClick={() => handleSectionChange('settings')}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
