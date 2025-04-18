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
    <div className="card mt-4" style={{maxWidth: 1100, margin: '0 auto'}}> {/* Centered and wider on desktop */}
      <div className="card-body">
        <h5 className="card-title mb-4 fs-3">Project List</h5>
        <div className="row mb-4 g-3 flex-md-row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select form-select-lg"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
        </div>
        {filteredProjects.length === 0 ? (
          <p className="text-muted fs-5">No projects match the current filter.</p>
        ) : (
          <ul className="list-group">
            {filteredProjects.map((project) => {
              const originalIndex = getOriginalIndex(project);
              return (
                <li key={originalIndex} className="list-group-item py-4">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-4">
                    <div className="flex-grow-1">
                      <h6 className="mb-2 fs-5">{project.title}</h6>
                      <p className="mb-2 fs-6">{project.description}</p>
                      <small className="text-muted">Status: {project.status || 'Not Set'} | Start: {project.startDate} | End: {project.endDate}</small>
                    </div>
                    <div className="d-flex flex-wrap gap-3 align-items-center mt-3 mt-md-0 justify-content-md-end">
                      <select
                        className="form-select form-select-sm me-3"
                        style={{ width: 'auto', minWidth: 130 }}
                        value={project.status || 'Pending'}
                        onChange={e => onStatusChange(originalIndex, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button onClick={() => onEdit(originalIndex)} className="btn btn-sm btn-outline-warning px-4">Edit</button> {/* Bootstrap button classes */}
                      <button onClick={() => onDelete(originalIndex)} className="btn btn-sm btn-outline-danger px-4">Delete</button> {/* Bootstrap button classes */}
                      <button onClick={() => onTasks(project.id)} className="btn btn-sm btn-outline-primary px-4">Tasks</button> {/* New Tasks button */}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectList;