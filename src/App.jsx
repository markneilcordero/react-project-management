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

const sampleProjects = [
  { title: 'Website Redesign', description: 'Update the company website for a modern look.', startDate: '2025-04-01', endDate: '2025-05-01', status: 'In Progress' },
  { title: 'Mobile App Launch', description: 'Release the new mobile app to the app stores.', startDate: '2025-03-15', endDate: '2025-04-30', status: 'Pending' },
  { title: 'Marketing Campaign', description: 'Run a spring marketing campaign.', startDate: '2025-04-10', endDate: '2025-05-10', status: 'Completed' },
  { title: 'Database Migration', description: 'Migrate database to new server.', startDate: '2025-04-05', endDate: '2025-04-20', status: 'In Progress' },
  { title: 'Team Training', description: 'Conduct training for new tools.', startDate: '2025-04-12', endDate: '2025-04-18', status: 'Completed' },
  { title: 'API Integration', description: 'Integrate third-party APIs.', startDate: '2025-04-08', endDate: '2025-04-25', status: 'Pending' },
  { title: 'Security Audit', description: 'Perform a security audit.', startDate: '2025-04-02', endDate: '2025-04-15', status: 'Completed' },
  { title: 'Content Creation', description: 'Create new blog and social content.', startDate: '2025-04-03', endDate: '2025-04-30', status: 'In Progress' },
  { title: 'Customer Survey', description: 'Survey customers for feedback.', startDate: '2025-04-07', endDate: '2025-04-21', status: 'Pending' },
  { title: 'Bug Fixes', description: 'Fix critical bugs in production.', startDate: '2025-04-01', endDate: '2025-04-10', status: 'Completed' },
];
const sampleTasks = {
  0: [
    { title: 'Design mockups', description: 'Create new homepage mockups.', priority: 'High', dueDate: '2025-04-05', status: 'Completed' },
    { title: 'Review content', description: 'Update website text.', priority: 'Medium', dueDate: '2025-04-10', status: 'In Progress' },
  ],
  1: [
    { title: 'Beta testing', description: 'Test app with beta users.', priority: 'High', dueDate: '2025-04-20', status: 'Pending' },
    { title: 'App store assets', description: 'Prepare screenshots and descriptions.', priority: 'Medium', dueDate: '2025-04-18', status: 'Pending' },
  ],
  2: [
    { title: 'Ad design', description: 'Design banners for campaign.', priority: 'Low', dueDate: '2025-04-15', status: 'Completed' },
  ],
  3: [
    { title: 'Backup data', description: 'Backup all databases.', priority: 'High', dueDate: '2025-04-06', status: 'Completed' },
    { title: 'Migrate tables', description: 'Move tables to new server.', priority: 'High', dueDate: '2025-04-15', status: 'In Progress' },
  ],
  4: [
    { title: 'Schedule sessions', description: 'Book training rooms.', priority: 'Low', dueDate: '2025-04-13', status: 'Completed' },
  ],
  5: [
    { title: 'API research', description: 'Evaluate API options.', priority: 'Medium', dueDate: '2025-04-12', status: 'Pending' },
  ],
  6: [
    { title: 'Vulnerability scan', description: 'Run security scans.', priority: 'High', dueDate: '2025-04-10', status: 'Completed' },
  ],
  7: [
    { title: 'Write articles', description: 'Draft 3 new blog posts.', priority: 'Medium', dueDate: '2025-04-20', status: 'In Progress' },
  ],
  8: [
    { title: 'Draft questions', description: 'Prepare survey questions.', priority: 'Low', dueDate: '2025-04-09', status: 'Pending' },
  ],
  9: [
    { title: 'Fix login bug', description: 'Resolve login issue for users.', priority: 'High', dueDate: '2025-04-03', status: 'Completed' },
  ],
};

function App() {
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) return JSON.parse(savedProjects);
    return sampleProjects;
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) return JSON.parse(savedTasks);
    return sampleTasks;
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

  // Add data to local storage on first load if not present
  useEffect(() => {
    if (!localStorage.getItem('projects')) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, []);

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
    // Remove tasks for the deleted project
    const updatedTasks = { ...tasks };
    delete updatedTasks[index];
    // Re-index remaining tasks to match new project indices
    const reindexedTasks = {};
    updatedProjects.forEach((_, newIdx) => {
      // Find the old index in the original projects array
      // Since we filter by index, the new index matches the order
      if (tasks[newIdx >= index ? newIdx + 1 : newIdx]) {
        reindexedTasks[newIdx] = tasks[newIdx >= index ? newIdx + 1 : newIdx];
      } else if (tasks[newIdx]) {
        reindexedTasks[newIdx] = tasks[newIdx];
      }
    });
    setTasks(reindexedTasks);
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

  const handleStatusChange = (index, newStatus) => {
    const updatedProjects = [...projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      status: newStatus
    };
    setProjects(updatedProjects);
    showNotification('Project status updated!', 'success');
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
            onStatusChange={handleStatusChange}
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
