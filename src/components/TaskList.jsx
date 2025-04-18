import React, { useState } from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Reset to page 1 if filter/search changes
  React.useEffect(() => { setCurrentPage(1); }, [searchTerm, filterPriority]);

  return (
    <div className="mt-3"> {/* Add margin top */}
      {/* Removed duplicate H2 - Title is handled in App.jsx */}
      <div className="row mb-3"> {/* Filter/Search row */}
        <div className="col-md-6">
          <input
            type="text"
            className="form-control form-control-sm" // Added Bootstrap classes (small)
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select form-select-sm" // Added Bootstrap classes (small)
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      {filteredTasks.length === 0 ? (
        <p className="text-muted">No tasks available for this project.</p> /* Added text-muted */
      ) : (
        <>
          <ul className="list-group"> {/* Use list-group */}
            {paginatedTasks.map((task, index) => (
              <li key={index + (currentPage-1)*pageSize} className="list-group-item d-flex justify-content-between align-items-center"> {/* list-group-item and flex utilities */}
                <div>
                  <h6 className="mb-1">{task.title}</h6> {/* Use h6 for title */}
                  <p className="mb-1">{task.description}</p>
                  <small className="text-muted">Priority: {task.priority} | Due: {task.dueDate}</small> {/* Added text-muted */}
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <button onClick={() => onEdit(index + (currentPage-1)*pageSize)} className="btn btn-sm btn-outline-warning mb-2 mb-md-0 me-md-2">Edit</button>
                  <button onClick={() => { setShowDeleteModal(true); setDeleteIndex(index + (currentPage-1)*pageSize); }} className="btn btn-sm btn-outline-danger">Delete</button>
                </div>
              </li>
            ))}
          </ul>
          {/* Pagination controls */}
          {totalPages > 1 && (
            <nav className="mt-3" aria-label="Task list pagination">
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
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <>
          <div className="modal fade show" style={{display:'block'}} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this task?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-danger" onClick={() => { onDelete(deleteIndex); setShowDeleteModal(false); }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ position: 'fixed' }}></div>
        </>
      )}
    </div>
  );
};

export default TaskList;