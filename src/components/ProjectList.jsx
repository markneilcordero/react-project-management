import React, { useState } from 'react';

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
    <div className="card mt-4"> {/* Wrap in a card and add margin top */}
      <div className="card-body"> {/* Card body */}
        <h5 className="card-title mb-3">Project List</h5> {/* Card title */}
        <div className="row mb-3"> {/* Filter/Search row */}
          <div className="col-md-6 mb-2 mb-md-0"> {/* Added bottom margin for small screens */}
            <input
              type="text"
              className="form-control form-control-sm" // Added Bootstrap class (small)
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select form-select-sm" // Added Bootstrap class (small)
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
          <p className="text-muted">No projects match the current filter.</p> /* Added text-muted */
        ) : (
          <ul className="list-group"> {/* Use list-group */}
            {filteredProjects.map((project) => {
              const originalIndex = getOriginalIndex(project);
              return (
                <li key={originalIndex} className="list-group-item d-flex justify-content-between align-items-center"> {/* list-group-item and flex utilities */}
                  <div>
                    <h6 className="mb-1">{project.title}</h6> {/* Use h6 for title */}
                    <p className="mb-1 small">{project.description}</p> {/* Made description smaller */}
                    <small className="text-muted">Status: {project.status || 'Not Set'} | Start: {project.startDate} | End: {project.endDate}</small> {/* Added default status and text-muted */}
                  </div>
                  <div className="d-flex align-items-center">
                    <select
                      className="form-select form-select-sm me-2"
                      style={{ width: 'auto' }}
                      value={project.status || 'Pending'}
                      onChange={e => onStatusChange(originalIndex, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button onClick={() => onEdit(originalIndex)} className="btn btn-sm btn-outline-warning me-2">Edit</button> {/* Bootstrap button classes */}
                    <button onClick={() => onDelete(originalIndex)} className="btn btn-sm btn-outline-danger me-2">Delete</button> {/* Bootstrap button classes */}
                    <button onClick={() => onTasks(originalIndex)} className="btn btn-sm btn-outline-primary">Tasks</button> {/* New Tasks button */}
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