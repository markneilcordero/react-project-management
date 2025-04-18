import { useState, useEffect } from 'react';
// Remove App.css import if Bootstrap handles most styling
// import './App.css';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Dashboard from './components/Dashboard';
import Notification from './components/Notification';
import Settings from './components/Settings';

function App() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : [];
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const showNotification = (message, type) => {
    setNotification({ message, type });
  };

  const handleSaveProject = (project) => {
    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = project;
      setProjects(updatedProjects);
      setEditingIndex(null);
      showNotification('Project updated successfully!', 'success');
    } else {
      setProjects([...projects, project]);
      showNotification('Project added successfully!', 'success');
    }
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
    showNotification('Project deleted successfully!', 'success');
  };

  const handleSaveTask = (projectIndex, task) => {
    const projectTasks = tasks[projectIndex] || [];
    if (editingTaskIndex !== null) {
      projectTasks[editingTaskIndex] = task;
      showNotification('Task updated successfully!', 'success');
    } else {
      projectTasks.push(task);
      showNotification('Task added successfully!', 'success');
    }
    setTasks({ ...tasks, [projectIndex]: projectTasks });
    setEditingTaskIndex(null);
  };

  const handleEditTask = (projectIndex, taskIndex) => {
    setEditingTaskIndex(taskIndex);
  };

  const handleDeleteTask = (projectIndex, taskIndex) => {
    const projectTasks = tasks[projectIndex] || [];
    projectTasks.splice(taskIndex, 1);
    setTasks({ ...tasks, [projectIndex]: projectTasks });
    showNotification('Task deleted successfully!', 'success');
  };

  const handleResetData = () => {
    localStorage.removeItem('projects');
    localStorage.removeItem('tasks');
    setProjects([]);
    setTasks({});
    showNotification('All data has been reset!', 'success');
  };

  return (
    <div className="container mt-4"> {/* Added Bootstrap container and margin-top */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1 className="mb-4">Project Management</h1> {/* Added margin-bottom */}
      <div className="row mb-4"> {/* Dashboard row moved to top */}
        <div className="col-md-12">
          <Dashboard projects={projects} tasks={tasks} />
        </div>
      </div>
      <div className="row mb-4"> {/* Settings row below Dashboard */}
        <div className="col-md-6">
          <Settings onResetData={handleResetData} />
        </div>
      </div>
      <div className="row"> {/* Project Form and List */}
        <div className="col-md-6">
          <h2 className="mb-3">Projects</h2>
          <ProjectForm
            onSave={handleSaveProject}
            project={editingIndex !== null ? projects[editingIndex] : null}
          />
          <ProjectList
            projects={projects}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onTasks={setSelectedProjectIndex}
          />
        </div>
        <div className="col-md-6">
          {selectedProjectIndex !== null && projects[selectedProjectIndex] && (
            <div className="mb-4">
              <h2 className="mb-3">Tasks for {projects[selectedProjectIndex].title}</h2>
              <TaskForm
                onSave={(task) => handleSaveTask(selectedProjectIndex, task)}
                task={editingTaskIndex !== null ? tasks[selectedProjectIndex]?.[editingTaskIndex] : null}
              />
              <TaskList
                tasks={tasks[selectedProjectIndex] || []}
                onEdit={(taskIndex) => handleEditTask(selectedProjectIndex, taskIndex)}
                onDelete={(taskIndex) => handleDeleteTask(selectedProjectIndex, taskIndex)}
              />
              <button className="btn btn-secondary mt-2" onClick={() => setSelectedProjectIndex(null)}>Close Tasks</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
