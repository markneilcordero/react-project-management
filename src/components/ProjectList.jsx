import React, { useState } from 'react';
import './ProjectResponsive.css';

const ProjectList = ({ projects, onEdit, onDelete, onTasks, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      (project.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (project.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'All' || project.status === filterStatus; // Assuming project has a status property
    return matchesSearch && matchesFilter;
  });

  // Helper to get the original index
  const getOriginalIndex = (project) => projects.findIndex(p => p === project);

  return (
    <div className="project-list-container"> {/* Responsive container */}
      <div className="card mt-4 w-100"> {/* Full width on all screens */}
        <div className="card-body">
          <h5 className="card-title mb-4 fs-3">Project List</h5>
          <div className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="form-select form-select-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>
          </div>
          {filteredProjects.length === 0 ? (
            <p className="text-muted fs-5">No projects match the current filter.</p>
          ) : (
            <div className="d-flex flex-column gap-4">
              {filteredProjects.map((project) => {
                const originalIndex = getOriginalIndex(project);
                return (
                  <div key={originalIndex} className="w-100">
                    <div className="card h-100">
                      <div className="card-body d-flex flex-column">
                        <h6 className="mb-2 fs-5 text-break">{project.title}</h6>
                        <p className="mb-2 fs-6 text-break">{project.description}</p>
                        <small className="text-muted mb-2">Status: {project.status || 'Not Set'} | Start: {project.startDate} | End: {project.endDate}</small>
                        <div className="d-flex flex-wrap gap-2 align-items-center mt-auto project-list-actions">
                          <select
                            className="form-select form-select-sm me-2"
                            style={{ width: 'auto', minWidth: 130 }}
                            value={project.status || 'Pending'}
                            onChange={e => onStatusChange(originalIndex, e.target.value)}
                          >
                            <option value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <button onClick={() => onEdit(originalIndex)} className="btn btn-sm btn-outline-warning px-3">Edit</button>
                          <button onClick={() => onDelete(originalIndex)} className="btn btn-sm btn-outline-danger px-3">Delete</button>
                          <button onClick={() => onTasks(project.id)} className="btn btn-sm btn-outline-primary px-3">Tasks</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;