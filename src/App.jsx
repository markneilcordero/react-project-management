import { useState, useEffect } from 'react';
import './App.css';
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
    <div className="App">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <h1>Project Management</h1>
      <Settings onResetData={handleResetData} />
      <Dashboard projects={projects} tasks={tasks} />
      <ProjectForm
        onSave={handleSaveProject}
        project={editingIndex !== null ? projects[editingIndex] : null}
      />
      <ProjectList
        projects={projects}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
      {projects.map((project, projectIndex) => (
        <div key={projectIndex}>
          <h2>Tasks for {project.title}</h2>
          <TaskForm
            onSave={(task) => handleSaveTask(projectIndex, task)}
            task={editingTaskIndex !== null ? tasks[projectIndex]?.[editingTaskIndex] : null}
          />
          <TaskList
            tasks={tasks[projectIndex] || []}
            onEdit={(taskIndex) => handleEditTask(projectIndex, taskIndex)}
            onDelete={(taskIndex) => handleDeleteTask(projectIndex, taskIndex)}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
