import React, { useState } from 'react';

const ProjectList = ({ projects, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'All' || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2>Project List</h2>
      <div>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      {filteredProjects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <ul>
          {filteredProjects.map((project, index) => (
            <li key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>Status: {project.status}</p>
              <p>Start Date: {project.startDate}</p>
              <p>End Date: {project.endDate}</p>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectList;