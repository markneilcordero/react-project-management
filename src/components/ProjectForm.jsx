import React, { useState } from 'react';

const ProjectForm = ({ onSave, project }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [startDate, setStartDate] = useState(project?.startDate || '');
  const [endDate, setEndDate] = useState(project?.endDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, startDate, endDate });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProjectForm;