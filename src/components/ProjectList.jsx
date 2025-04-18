import React, { useState } from 'react';
import './ProjectResponsive.css';

const ProjectList = ({ projects, onEdit, onDelete, onTasks, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      (project.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (project.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'All' || project.status === filterStatus; // Assuming project has a status property
    return matchesSearch && matchesFilter;
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to page 1 if filter/search changes
  React.useEffect(() => { setCurrentPage(1); }, [searchTerm, filterStatus]);

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
            <>
              <div className="d-flex flex-column gap-4">
                {paginatedProjects.map((project) => {
                  // Use project.id instead of index
                  return (
                    <div key={project.id} className="w-100">
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
                              onChange={e => onStatusChange(project.id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                            <button onClick={() => onEdit(project.id)} className="btn btn-sm btn-outline-warning px-3">Edit</button>
                            <button onClick={() => { setPendingDeleteId(project.id); setShowDeleteModal(true); }} className="btn btn-sm btn-outline-danger px-3">Delete</button>
                            <button onClick={() => onTasks(project.id)} className="btn btn-sm btn-outline-primary px-3">Tasks</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <nav className="mt-4" aria-label="Project list pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>&laquo;</button>
                    </li>
                    {[...Array(totalPages)].map((_, idx) => (
                      <li key={idx + 1} className={`page-item${currentPage === idx + 1 ? ' active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>&raquo;</button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
      {/* Bootstrap Modal for Delete Confirmation */}
      {showDeleteModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this project? This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={() => { onDelete(pendingDeleteId); setShowDeleteModal(false); }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
          {/* Modal backdrop as a sibling, not a child, and with fixed position */}
          <div className="modal-backdrop fade show" style={{ position: 'fixed' }}></div>
        </>
      )}
    </div>
  );
};

export default ProjectList;