import React, { useState, useEffect } from 'react';

// Add onCancel and isEditing to props
const TaskForm = ({ onSave, task, onCancel, isEditing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('Pending');

  // Use useEffect to update form when 'task' prop changes (for editing)
  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setPriority(task.priority || 'Low');
      setDueDate(task.dueDate || '');
      setStatus(task.status || 'Pending');
    } else {
      // Reset form when switching from edit to add or if task is null
      setTitle('');
      setDescription('');
      setPriority('Low');
      setDueDate('');
      setStatus('Pending');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { title, description, priority, dueDate, status };
    console.log('[TaskForm] Saving task:', taskData); // Log data being saved
    onSave(taskData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3"> {/* Added margin-bottom */}
      <div className="mb-3"> {/* Added margin-bottom */}
        <label htmlFor="taskTitle" className="form-label">Title:</label> {/* Added Bootstrap class */}
        <input
          type="text"
          id="taskTitle" // Added id
          className="form-control" // Added Bootstrap class
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3"> {/* Added margin-bottom */}
        <label htmlFor="taskDescription" className="form-label">Description:</label> {/* Added Bootstrap class */}
        <textarea
          id="taskDescription" // Added id
          className="form-control" // Added Bootstrap class
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="row mb-3"> {/* Use row for priority, due date, and status */}
        <div className="col"> {/* Column for priority */}
          <label htmlFor="taskPriority" className="form-label">Priority:</label> {/* Added Bootstrap class */}
          <select
            id="taskPriority" // Added id
            className="form-select" // Added Bootstrap class
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="col"> {/* Column for due date */}
          <label htmlFor="taskDueDate" className="form-label">Due Date:</label> {/* Added Bootstrap class */}
          <input
            type="date"
            id="taskDueDate" // Added id
            className="form-control" // Added Bootstrap class
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="col"> {/* Column for status */}
          <label htmlFor="taskStatus" className="form-label">Status:</label> {/* Added Bootstrap class */}
          <select
            id="taskStatus" // Added id
            className="form-select" // Added Bootstrap class
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-end gap-2"> {/* Use flexbox for button alignment */} 
        {/* Use isEditing prop for button text (more explicit) */}
        <button type="submit" className="btn btn-success">{isEditing ? 'Update Task' : 'Add Task'}</button>
        {/* Add Cancel button only if onCancel is provided (likely in edit mode) */}
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;