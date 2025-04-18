import React from 'react';
import './Sidebar.css';

const Sidebar = ({ activeSection, onSectionChange }) => (
  <aside className="sidebar bg-primary text-white">
    <div className="sidebar-header p-3 mb-4">
      <h2 className="h4">Project Manager</h2>
    </div>
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <button
            className={`nav-link text-white w-100 text-start${activeSection === 'dashboard' ? ' active' : ''}`}
            style={{ background: 'none', border: 'none', outline: 'none' }}
            onClick={() => onSectionChange('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className={`nav-link text-white w-100 text-start${activeSection === 'projects' ? ' active' : ''}`}
            style={{ background: 'none', border: 'none', outline: 'none' }}
            onClick={() => onSectionChange('projects')}
          >
            Projects
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className={`nav-link text-white w-100 text-start${activeSection === 'tasks' ? ' active' : ''}`}
            style={{ background: 'none', border: 'none', outline: 'none' }}
            onClick={() => onSectionChange('tasks')}
          >
            Tasks
          </button>
        </li>
        <li className="nav-item mb-2">
          <button
            className={`nav-link text-white w-100 text-start${activeSection === 'settings' ? ' active' : ''}`}
            style={{ background: 'none', border: 'none', outline: 'none' }}
            onClick={() => onSectionChange('settings')}
          >
            Settings
          </button>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
