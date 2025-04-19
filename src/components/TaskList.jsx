import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm'; // Assuming you have TaskForm component

const TaskList = ({ tasks, projectId, onEdit, onDelete, onUpdateTask }) => { // Added projectId and onUpdateTask props
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // State for Edit Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Store the whole task object
  const [editingTaskIndex, setEditingTaskIndex] = useState(null); // Store the index

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + pageSize);

  // Reset to page 1 if filter/search changes or tasks change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, filterPriority, tasks]);

  // Function to open the edit modal
  const handleEditClick = (task) => {
    // Find the original index in the unfiltered tasks array
    const originalIndex = tasks.findIndex(t => t === task); // Find based on object reference
    if (originalIndex !== -1) {
        setEditingTask(task);
        setEditingTaskIndex(originalIndex); // Store the original index
        setShowEditModal(true);
    } else {
        console.error("Could not find original task index for editing.");
        // Optionally show an error notification to the user
    }
  };

  // Function to handle saving the edited task
  const handleSaveEdit = (updatedTaskData) => {
    console.log('[TaskList] handleSaveEdit called with:', updatedTaskData);
    console.log('[TaskList] Attempting to call onUpdateTask with:', projectId, editingTaskIndex, updatedTaskData);
    if (editingTaskIndex !== null && projectId) {
      onUpdateTask(projectId, editingTaskIndex, updatedTaskData); // Pass projectId, index, and data up
    }
    setShowEditModal(false);
    setEditingTask(null);
    setEditingTaskIndex(null);
  };

  // Function to handle delete confirmation
  const handleDeleteClick = (task) => {
    const originalIndex = tasks.findIndex(t => t === task);
     if (originalIndex !== -1) {
        setDeleteIndex(originalIndex);
        setShowDeleteModal(true);
    } else {
         console.error("Could not find original task index for deletion.");
         // Optionally show an error notification
    }
  };

  const confirmDelete = () => {
    if (deleteIndex !== null && projectId) {
        onDelete(projectId, deleteIndex); // Pass projectId and original index
    }
    setShowDeleteModal(false);
    setDeleteIndex(null);
  }

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
            {paginatedTasks.map((task, pageIndex) => {
              return (
                <li key={tasks.findIndex(t => t === task)} className="list-group-item d-flex justify-content-between align-items-center"> {/* list-group-item and flex utilities */}
                  <div>
                    <h6 className="mb-1">{task.title}</h6> {/* Use h6 for title */}
                    <p className="mb-1">{task.description}</p>
                    <small className="text-muted">Priority: {task.priority} | Due: {task.dueDate} | Status: {task.status || 'Pending'}</small> {/* Added Status */}
                  </div>
                  <div className="d-flex flex-column flex-md-row">
                    <button onClick={() => handleEditClick(task)} className="btn btn-sm btn-outline-warning mb-2 mb-md-0 me-md-2">Edit</button>
                    <button onClick={() => handleDeleteClick(task)} className="btn btn-sm btn-outline-danger">Delete</button>
                  </div>
                </li>
              );
            })}
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
                  <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" style={{ position: 'fixed' }}></div>
        </>
      )}
      {/* Edit Task Modal */}
      {showEditModal && editingTask && (
         <>
          <div className="modal fade show" style={{display:'block'}} tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                 <div className="modal-header">
                   <h5 className="modal-title">Edit Task</h5>
                   <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
                 </div>
                 <div className="modal-body">
                   {/* Render TaskForm inside the modal for editing */}
                   <TaskForm
                     initialData={editingTask}
                     onSave={handleSaveEdit} // Corrected prop name from onSubmit to onSave
                     onCancel={() => setShowEditModal(false)} // Pass a cancel handler
                     isEditing={true} // Indicate that this is for editing
                   />
                 </div>
                 {/* Footer might be handled within TaskForm or removed if TaskForm has its own buttons */}
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