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
    <div>
      <h2>Task List</h2>
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      {filteredTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul>
          {filteredTasks.map((task, index) => (
            <li key={index}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.dueDate}</p>
              <button onClick={() => onEdit(index)}>Edit</button>
              <button onClick={() => onDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;