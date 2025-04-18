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
import Sidebar from './components/Sidebar';

// Add a helper to generate unique IDs
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// Assign unique ids to sample projects
const sampleProjects = [
  { id: 'p1', title: 'Website Redesign', description: 'Update the company website for a modern look.', startDate: '2025-04-01', endDate: '2025-05-01', status: 'In Progress' },
  { id: 'p2', title: 'Mobile App Launch', description: 'Release the new mobile app to the app stores.', startDate: '2025-03-15', endDate: '2025-04-30', status: 'Pending' },
  { id: 'p3', title: 'Marketing Campaign', description: 'Run a spring marketing campaign.', startDate: '2025-04-10', endDate: '2025-05-10', status: 'Completed' },
  { id: 'p4', title: 'Database Migration', description: 'Migrate database to new server.', startDate: '2025-04-05', endDate: '2025-04-20', status: 'In Progress' },
  { id: 'p5', title: 'Team Training', description: 'Conduct training for new tools.', startDate: '2025-04-12', endDate: '2025-04-18', status: 'Completed' },
  { id: 'p6', title: 'API Integration', description: 'Integrate third-party APIs.', startDate: '2025-04-08', endDate: '2025-04-25', status: 'Pending' },
  { id: 'p7', title: 'Security Audit', description: 'Perform a security audit.', startDate: '2025-04-02', endDate: '2025-04-15', status: 'Completed' },
  { id: 'p8', title: 'Content Creation', description: 'Create new blog and social content.', startDate: '2025-04-03', endDate: '2025-04-30', status: 'In Progress' },
  { id: 'p9', title: 'Customer Survey', description: 'Survey customers for feedback.', startDate: '2025-04-07', endDate: '2025-04-21', status: 'Pending' },
  { id: 'p10', title: 'Bug Fixes', description: 'Fix critical bugs in production.', startDate: '2025-04-01', endDate: '2025-04-10', status: 'Completed' },
];

// Map sample tasks to use project ids as keys
const sampleTasks = {
  p1: [
    { title: 'Design mockups', description: 'Create new homepage mockups.', priority: 'High', dueDate: '2025-04-05', status: 'Completed' },
    { title: 'Review content', description: 'Update website text.', priority: 'Medium', dueDate: '2025-04-10', status: 'In Progress' },
  ],
  p2: [
    { title: 'Beta testing', description: 'Test app with beta users.', priority: 'High', dueDate: '2025-04-20', status: 'Pending' },
    { title: 'App store assets', description: 'Prepare screenshots and descriptions.', priority: 'Medium', dueDate: '2025-04-18', status: 'Pending' },
  ],
  p3: [
    { title: 'Ad design', description: 'Design banners for campaign.', priority: 'Low', dueDate: '2025-04-15', status: 'Completed' },
  ],
  p4: [
    { title: 'Backup data', description: 'Backup all databases.', priority: 'High', dueDate: '2025-04-06', status: 'Completed' },
    { title: 'Migrate tables', description: 'Move tables to new server.', priority: 'High', dueDate: '2025-04-15', status: 'In Progress' },
  ],
  p5: [
    { title: 'Schedule sessions', description: 'Book training rooms.', priority: 'Low', dueDate: '2025-04-13', status: 'Completed' },
  ],
  p6: [
    { title: 'API research', description: 'Evaluate API options.', priority: 'Medium', dueDate: '2025-04-12', status: 'Pending' },
  ],
  p7: [
    { title: 'Vulnerability scan', description: 'Run security scans.', priority: 'High', dueDate: '2025-04-10', status: 'Completed' },
  ],
  p8: [
    { title: 'Write articles', description: 'Draft 3 new blog posts.', priority: 'Medium', dueDate: '2025-04-20', status: 'In Progress' },
  ],
  p9: [
    { title: 'Draft questions', description: 'Prepare survey questions.', priority: 'Low', dueDate: '2025-04-09', status: 'Pending' },
  ],
  p10: [
    { title: 'Fix login bug', description: 'Resolve login issue for users.', priority: 'High', dueDate: '2025-04-03', status: 'Completed' },
  ],
};

// Custom hook for localStorage
function useLocalStorage(key, initialValue, notifyError) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        try {
          return JSON.parse(item);
        } catch (parseError) {
          if (notifyError) notifyError(`Corrupted data for '${key}' was reset.`);
          localStorage.removeItem(key);
          return initialValue;
        }
      }
      return initialValue;
    } catch (error) {
      if (notifyError) notifyError(`Error accessing localStorage for '${key}'.`);
      return initialValue;
    }
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        if (notifyError) notifyError(`Failed to save '${key}' to localStorage.`);
      }
    }, 400); // Debounce delay in ms
    return () => clearTimeout(handler);
  }, [key, value, notifyError]);

  return [value, setValue];
}

function App() {
  const [projects, setProjects] = useLocalStorage('projects', sampleProjects, (msg) => showNotification(msg, 'error'));
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [tasks, setTasks] = useLocalStorage('tasks', sampleTasks, (msg) => showNotification(msg, 'error'));
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
  };

  const handleSaveProject = (project) => {
    if (editingProjectId !== null) {
      const updatedProjects = projects.map((p) =>
        p.id === editingProjectId ? { ...project, id: editingProjectId } : p
      );
      setProjects(updatedProjects);
      setEditingProjectId(null);
      showNotification('Project updated successfully!', 'success');
    } else {
      const newProject = { ...project, id: generateId() };
      setProjects([...projects, newProject]);
      showNotification('Project added successfully!', 'success');
    }
    setEditingTaskIndex(null);
  };

  const handleEditProject = (id) => {
    setEditingProjectId(id);
    setEditingTaskIndex(null);
  };

  const handleDeleteProject = (id) => {
    const updatedProjects = projects.filter((p) => p.id !== id);
    setProjects(updatedProjects);
    // Remove tasks for the deleted project
    const updatedTasks = { ...tasks };
    delete updatedTasks[id];
    setTasks(updatedTasks);
    // Reset selection and editing state if needed
    if (selectedProjectId === id) setSelectedProjectId(null);
    if (editingProjectId === id) setEditingProjectId(null);
    setEditingTaskIndex(null);
    showNotification('Project deleted successfully!', 'success');
  };

  const handleSaveTask = (projectId, task) => {
    const projectTasks = tasks[projectId] ? [...tasks[projectId]] : [];
    if (editingTaskIndex !== null) {
      projectTasks[editingTaskIndex] = task;
      showNotification('Task updated successfully!', 'success');
    } else {
      projectTasks.push(task);
      showNotification('Task added successfully!', 'success');
    }
    setTasks({ ...tasks, [projectId]: projectTasks });
    setEditingTaskIndex(null);
    setEditingProjectId(null);
  };

  const handleEditTask = (taskIndex) => {
    setEditingTaskIndex(taskIndex);
    setEditingProjectId(null);
  };

  const handleDeleteTask = (projectId, taskIndex) => {
    const projectTasks = tasks[projectId] ? [...tasks[projectId]] : [];
    projectTasks.splice(taskIndex, 1);
    setTasks({ ...tasks, [projectId]: projectTasks });
    showNotification('Task deleted successfully!', 'success');
    setEditingProjectId(null);
  };

  const handleResetData = () => {
    localStorage.removeItem('projects');
    localStorage.removeItem('tasks');
    setProjects([]);
    setTasks({});
    showNotification('All data has been reset!', 'success');
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedProjects = projects.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setProjects(updatedProjects);
    showNotification('Project status updated!', 'success');
  };

  const handleProjectSelection = (id) => {
    setSelectedProjectId(id);
    setEditingProjectId(null);
    setEditingTaskIndex(null);
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 container mt-4" role="main">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <h1 className="mb-4" tabIndex={0}>Project Management</h1>
        <div className="row mb-4">
          <div className="col-md-12">
            <Dashboard projects={projects} tasks={tasks} />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-6">
            <Settings onResetData={handleResetData} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2 className="mb-3" tabIndex={0}>Projects</h2>
            <ProjectForm
              onSave={handleSaveProject}
              project={editingProjectId !== null ? projects.find((p) => p.id === editingProjectId) : null}
            />
            <ProjectList
              projects={projects}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onTasks={handleProjectSelection}
              onStatusChange={handleStatusChange}
            />
          </div>
          <div className="col-md-6">
            {selectedProjectId !== null && projects.find((p) => p.id === selectedProjectId) && (
              <div className="mb-4" aria-live="polite">
                <h2 className="mb-3" tabIndex={0}>
                  Tasks for {projects.find((p) => p.id === selectedProjectId).title}
                </h2>
                <TaskForm
                  onSave={(task) => handleSaveTask(selectedProjectId, task)}
                  task={editingTaskIndex !== null ? (tasks[selectedProjectId]?.[editingTaskIndex] || null) : null}
                />
                <TaskList
                  tasks={tasks[selectedProjectId] || []}
                  onEdit={handleEditTask}
                  onDelete={(taskIndex) => handleDeleteTask(selectedProjectId, taskIndex)}
                />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    setSelectedProjectId(null);
                    setEditingProjectId(null);
                    setEditingTaskIndex(null);
                  }}
                  aria-label="Close task list and return to projects"
                >
                  Close Tasks
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
