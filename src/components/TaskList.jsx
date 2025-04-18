import React, { useState } from 'react';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterPriority === 'All' || task.priority === filterPriority;
    return matchesSearch && matchesFilter;
  });

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
        <ul className="list-group"> {/* Use list-group */}
          {filteredTasks.map((task, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center"> {/* list-group-item and flex utilities */}
              <div>
                <h6 className="mb-1">{task.title}</h6> {/* Use h6 for title */}
                <p className="mb-1">{task.description}</p>
                <small className="text-muted">Priority: {task.priority} | Due: {task.dueDate}</small> {/* Added text-muted */}
              </div>
              <div>
                <button onClick={() => onEdit(index)} className="btn btn-sm btn-outline-warning me-2">Edit</button> {/* Bootstrap button classes */}
                <button onClick={() => onDelete(index)} className="btn btn-sm btn-outline-danger">Delete</button> {/* Bootstrap button classes */}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;