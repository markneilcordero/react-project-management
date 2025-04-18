import React, { useState, useEffect } from 'react'; // Added useEffect
import './ProjectResponsive.css';

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
    <div className="project-form-container"> {/* Responsive container for consistent padding/margins */}
      <form onSubmit={handleSubmit} className="mb-4 w-100" style={{maxWidth: 900, margin: '0 auto'}}> {/* Centered and wider on desktop */}
        <div className="row g-4">
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="projectTitle" className="form-label">Title:</label>
              <input
                type="text"
                id="projectTitle"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">Description:</label>
              <textarea
                id="projectDescription"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-12 col-md-6 col-lg-3">
            <label htmlFor="projectStartDate" className="form-label">Start Date:</label>
            <input
              type="date"
              id="projectStartDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <label htmlFor="projectEndDate" className="form-label">End Date:</label>
            <input
              type="date"
              id="projectEndDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="row mb-3 g-3 align-items-end">
          <div className="col-12 col-md-6 col-lg-3">
            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary px-5 py-2 fs-5">{project ? 'Update Project' : 'Add Project'}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;