import React from 'react';
import './Sidebar.css';

const Sidebar = () => (
  <aside className="sidebar bg-primary text-white">
    <div className="sidebar-header p-3 mb-4">
      <h2 className="h4">Project Manager</h2>
    </div>
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#projects">Projects</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#tasks">Tasks</a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#settings">Settings</a>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
