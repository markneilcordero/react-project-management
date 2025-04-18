import React, { useState } from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

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
                <div>
                  <button onClick={() => onEdit(index + (currentPage-1)*pageSize)} className="btn btn-sm btn-outline-warning me-2">Edit</button> {/* Bootstrap button classes */}
                  <button onClick={() => onDelete(index + (currentPage-1)*pageSize)} className="btn btn-sm btn-outline-danger">Delete</button> {/* Bootstrap button classes */}
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
    </div>
  );
};

export default TaskList;