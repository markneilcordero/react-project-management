import React, { useState, useEffect } from 'react'; // Added useEffect

const ProjectForm = ({ onSave, project }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Use useEffect to update form when 'project' prop changes (for editing)
  useEffect(() => {
    if (project) {
      setTitle(project.title || '');
      setDescription(project.description || '');
      setStartDate(project.startDate || '');
      setEndDate(project.endDate || '');
    } else {
      // Reset form when switching from edit to add
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    }
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, description, startDate, endDate });
    // Reset form after saving
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4"> {/* Added margin-bottom */}
      <div className="mb-3"> {/* Added margin-bottom */}
        <label htmlFor="projectTitle" className="form-label">Title:</label> {/* Added Bootstrap class */}
        <input
          type="text"
          id="projectTitle" // Added id for label association
          className="form-control" // Added Bootstrap class
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3"> {/* Added margin-bottom */}
        <label htmlFor="projectDescription" className="form-label">Description:</label> {/* Added Bootstrap class */}
        <textarea
          id="projectDescription" // Added id for label association
          className="form-control" // Added Bootstrap class
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="row mb-3"> {/* Use row for dates */}
        <div className="col"> {/* Column for start date */}
          <label htmlFor="projectStartDate" className="form-label">Start Date:</label> {/* Added Bootstrap class */}
          <input
            type="date"
            id="projectStartDate" // Added id for label association
            className="form-control" // Added Bootstrap class
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="col"> {/* Column for end date */}
          <label htmlFor="projectEndDate" className="form-label">End Date:</label> {/* Added Bootstrap class */}
          <input
            type="date"
            id="projectEndDate" // Added id for label association
            className="form-control" // Added Bootstrap class
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">{project ? 'Update Project' : 'Add Project'}</button> {/* Added Bootstrap classes and dynamic text */}
    </form>
  );
};

export default ProjectForm;