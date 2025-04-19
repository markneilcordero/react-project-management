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
import Navbar from './components/Navbar';
import OnboardingNote from './components/OnboardingNote';
import Footer from './components/Footer';

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
  // Added 20 more projects
  { id: 'p11', title: 'New Feature Development', description: 'Develop feature X for the main product.', startDate: '2025-05-01', endDate: '2025-06-15', status: 'Pending' },
  { id: 'p12', title: 'Server Upgrade', description: 'Upgrade production servers.', startDate: '2025-05-05', endDate: '2025-05-12', status: 'Pending' },
  { id: 'p13', title: 'UI/UX Improvement', description: 'Improve user interface based on feedback.', startDate: '2025-05-10', endDate: '2025-06-10', status: 'In Progress' },
  { id: 'p14', title: 'Documentation Update', description: 'Update all project documentation.', startDate: '2025-05-15', endDate: '2025-05-30', status: 'Pending' },
  { id: 'p15', title: 'Performance Optimization', description: 'Optimize application performance.', startDate: '2025-05-20', endDate: '2025-06-20', status: 'In Progress' },
  { id: 'p16', title: 'Competitor Analysis', description: 'Analyze key competitors.', startDate: '2025-05-25', endDate: '2025-06-05', status: 'Pending' },
  { id: 'p17', title: 'User Testing Round 2', description: 'Conduct second round of user testing.', startDate: '2025-06-01', endDate: '2025-06-10', status: 'Pending' },
  { id: 'p18', title: 'Refactor Legacy Code', description: 'Refactor old codebase sections.', startDate: '2025-06-05', endDate: '2025-07-05', status: 'In Progress' },
  { id: 'p19', title: 'Onboarding Process Refinement', description: 'Improve new user onboarding flow.', startDate: '2025-06-10', endDate: '2025-06-25', status: 'Pending' },
  { id: 'p20', title: 'Analytics Integration', description: 'Integrate new analytics tool.', startDate: '2025-06-15', endDate: '2025-06-30', status: 'Pending' },
  { id: 'p21', title: 'Q2 Report Generation', description: 'Generate quarterly performance report.', startDate: '2025-07-01', endDate: '2025-07-07', status: 'Pending' },
  { id: 'p22', title: 'Social Media Strategy', description: 'Develop new social media plan.', startDate: '2025-07-05', endDate: '2025-07-20', status: 'Pending' },
  { id: 'p23', title: 'A/B Testing Setup', description: 'Set up A/B tests for homepage.', startDate: '2025-07-10', endDate: '2025-07-15', status: 'Pending' },
  { id: 'p24', title: 'Accessibility Audit', description: 'Audit website for WCAG compliance.', startDate: '2025-07-15', endDate: '2025-07-30', status: 'Pending' },
  { id: 'p25', title: 'Email Marketing Setup', description: 'Set up email marketing flows.', startDate: '2025-07-20', endDate: '2025-08-05', status: 'Pending' },
  { id: 'p26', title: 'Partnership Outreach', description: 'Reach out to potential partners.', startDate: '2025-07-25', endDate: '2025-08-15', status: 'Pending' },
  { id: 'p27', title: 'Internal Tool Development', description: 'Build an internal tool for team.', startDate: '2025-08-01', endDate: '2025-09-01', status: 'Pending' },
  { id: 'p28', title: 'Code Review Process', description: 'Establish a formal code review process.', startDate: '2025-08-05', endDate: '2025-08-12', status: 'Pending' },
  { id: 'p29', title: 'Disaster Recovery Plan', description: 'Create a disaster recovery plan.', startDate: '2025-08-10', endDate: '2025-08-25', status: 'Pending' },
  { id: 'p30', title: 'Year-End Planning', description: 'Plan projects for the next year.', startDate: '2025-08-15', endDate: '2025-09-15', status: 'Pending' },
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
  // Added tasks for new projects
  p11: [
    { title: 'Define requirements', description: 'Finalize requirements for feature X.', priority: 'High', dueDate: '2025-05-05', status: 'Pending' },
    { title: 'Develop backend', description: 'Implement backend logic.', priority: 'High', dueDate: '2025-05-20', status: 'Pending' },
    { title: 'Develop frontend', description: 'Implement frontend UI.', priority: 'Medium', dueDate: '2025-06-01', status: 'Pending' },
  ],
  p12: [
    { title: 'Plan upgrade', description: 'Create detailed upgrade plan.', priority: 'High', dueDate: '2025-05-06', status: 'Pending' },
    { title: 'Perform upgrade', description: 'Execute server upgrade.', priority: 'High', dueDate: '2025-05-10', status: 'Pending' },
  ],
  p13: [
    { title: 'Gather feedback', description: 'Collect user feedback on current UI.', priority: 'Medium', dueDate: '2025-05-15', status: 'In Progress' },
    { title: 'Design improvements', description: 'Design new UI elements.', priority: 'Medium', dueDate: '2025-05-25', status: 'Pending' },
  ],
  p14: [
    { title: 'Review existing docs', description: 'Identify outdated documentation.', priority: 'Low', dueDate: '2025-05-20', status: 'Pending' },
    { title: 'Write new sections', description: 'Add documentation for new features.', priority: 'Medium', dueDate: '2025-05-28', status: 'Pending' },
  ],
  p15: [
    { title: 'Identify bottlenecks', description: 'Profile application to find slow areas.', priority: 'High', dueDate: '2025-05-25', status: 'In Progress' },
    { title: 'Implement optimizations', description: 'Apply performance improvements.', priority: 'High', dueDate: '2025-06-10', status: 'Pending' },
  ],
  p16: [
    { title: 'List competitors', description: 'Identify main competitors.', priority: 'Low', dueDate: '2025-05-28', status: 'Pending' },
    { title: 'Analyze features', description: 'Compare feature sets.', priority: 'Medium', dueDate: '2025-06-02', status: 'Pending' },
  ],
  p17: [
    { title: 'Recruit testers', description: 'Find participants for user testing.', priority: 'Medium', dueDate: '2025-06-03', status: 'Pending' },
    { title: 'Conduct sessions', description: 'Run testing sessions.', priority: 'High', dueDate: '2025-06-08', status: 'Pending' },
  ],
  p18: [
    { title: 'Identify modules', description: 'Select legacy modules for refactoring.', priority: 'Medium', dueDate: '2025-06-10', status: 'In Progress' },
    { title: 'Refactor module A', description: 'Rewrite module A.', priority: 'High', dueDate: '2025-06-25', status: 'Pending' },
  ],
  p19: [
    { title: 'Map current flow', description: 'Document the existing onboarding process.', priority: 'Medium', dueDate: '2025-06-15', status: 'Pending' },
    { title: 'Design new flow', description: 'Create improved onboarding steps.', priority: 'High', dueDate: '2025-06-22', status: 'Pending' },
  ],
  p20: [
    { title: 'Choose tool', description: 'Select an analytics provider.', priority: 'Medium', dueDate: '2025-06-18', status: 'Pending' },
    { title: 'Implement tracking', description: 'Add tracking code to application.', priority: 'High', dueDate: '2025-06-28', status: 'Pending' },
  ],
  p21: [
    { title: 'Gather data', description: 'Collect performance metrics for Q2.', priority: 'High', dueDate: '2025-07-03', status: 'Pending' },
    { title: 'Write report', description: 'Compile and write the Q2 report.', priority: 'Medium', dueDate: '2025-07-06', status: 'Pending' },
  ],
  p22: [
    { title: 'Analyze current strategy', description: 'Review effectiveness of current social media.', priority: 'Low', dueDate: '2025-07-10', status: 'Pending' },
    { title: 'Develop new plan', description: 'Outline new strategy and content calendar.', priority: 'Medium', dueDate: '2025-07-18', status: 'Pending' },
  ],
  p23: [
    { title: 'Define test variants', description: 'Decide on homepage variations for testing.', priority: 'Medium', dueDate: '2025-07-12', status: 'Pending' },
    { title: 'Configure A/B test tool', description: 'Set up the test in the A/B testing software.', priority: 'High', dueDate: '2025-07-14', status: 'Pending' },
  ],
  p24: [
    { title: 'Run automated checks', description: 'Use tools to scan for accessibility issues.', priority: 'Medium', dueDate: '2025-07-20', status: 'Pending' },
    { title: 'Manual review', description: 'Manually test key user flows for accessibility.', priority: 'High', dueDate: '2025-07-28', status: 'Pending' },
  ],
  p25: [
    { title: 'Select email platform', description: 'Choose an email marketing service.', priority: 'Medium', dueDate: '2025-07-25', status: 'Pending' },
    { title: 'Create email templates', description: 'Design and build email templates.', priority: 'Medium', dueDate: '2025-08-01', status: 'Pending' },
  ],
  p26: [
    { title: 'Identify potential partners', description: 'List companies for potential partnerships.', priority: 'Medium', dueDate: '2025-07-30', status: 'Pending' },
    { title: 'Draft outreach emails', description: 'Write initial contact emails.', priority: 'Low', dueDate: '2025-08-05', status: 'Pending' },
  ],
  p27: [
    { title: 'Gather requirements', description: 'Define the needs for the internal tool.', priority: 'High', dueDate: '2025-08-07', status: 'Pending' },
    { title: 'Develop prototype', description: 'Build a basic working version.', priority: 'Medium', dueDate: '2025-08-20', status: 'Pending' },
  ],
  p28: [
    { title: 'Define guidelines', description: 'Write code review standards and guidelines.', priority: 'Medium', dueDate: '2025-08-08', status: 'Pending' },
    { title: 'Train team', description: 'Conduct a session on the new process.', priority: 'Low', dueDate: '2025-08-11', status: 'Pending' },
  ],
  p29: [
    { title: 'Assess risks', description: 'Identify potential disaster scenarios.', priority: 'High', dueDate: '2025-08-15', status: 'Pending' },
    { title: 'Document procedures', description: 'Write down recovery steps.', priority: 'High', dueDate: '2025-08-22', status: 'Pending' },
  ],
  p30: [
    { title: 'Brainstorm ideas', description: 'Generate project ideas for next year.', priority: 'Medium', dueDate: '2025-08-25', status: 'Pending' },
    { title: 'Prioritize projects', description: 'Select and prioritize projects.', priority: 'High', dueDate: '2025-09-10', status: 'Pending' },
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

// Custom hook to get window width
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function App() {
  const [projects, setProjects] = useLocalStorage('projects', sampleProjects, (msg) => showNotification(msg, 'error'));
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [tasks, setTasks] = useLocalStorage('tasks', sampleTasks, (msg) => showNotification(msg, 'error'));
  const [notification, setNotification] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const width = useWindowWidth();
  const isDesktop = width >= 992;
  const [projectFilter, setProjectFilter] = useState('All');
  // Add state to control quick add
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  // Modal state for Add Task
  const [modalOpen, setModalOpen] = useState(false);
  // Modal state for Add Project
  const [projectModalOpen, setProjectModalOpen] = useState(false);

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
  };

  const handleEditProject = (id) => {
    setEditingProjectId(id);
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
    showNotification('Project deleted successfully!', 'success');
  };

  // Keep handleSaveTask for the 'Add Task' modal
  const handleSaveTask = (projectId, task) => {
    const projectTasks = tasks[projectId] ? [...tasks[projectId]] : [];
    // This function is now only for *adding* new tasks from the general 'Add Task' modal
    projectTasks.push(task);
    showNotification('Task added successfully!', 'success');
    setTasks({ ...tasks, [projectId]: projectTasks });
    setEditingProjectId(null); // Keep this reset
  };

  // Define the new handleUpdateTask function
  const handleUpdateTask = (projectId, taskIndex, updatedTaskData) => {
    console.log('[App] handleUpdateTask received:', { projectId, taskIndex, updatedTaskData });
    const currentTasks = tasks[projectId] ? [...tasks[projectId]] : [];
    console.log('[App] Tasks for project before update:', currentTasks);

    if (taskIndex >= 0 && taskIndex < currentTasks.length) {
      const updatedProjectTasks = [...currentTasks]; // Create a new array for the specific project
      updatedProjectTasks[taskIndex] = updatedTaskData;
      
      const newTasksState = { ...tasks, [projectId]: updatedProjectTasks };
      console.log('[App] New tasks state to be set:', newTasksState);
      setTasks(newTasksState);
      showNotification('Task updated successfully!', 'success');
    } else {
      showNotification('Error updating task: Invalid index.', 'error');
      console.error("[App] Invalid task index provided for update:", taskIndex, "Project ID:", projectId);
    }
    // Reset any potentially conflicting state if needed
    setEditingProjectId(null);
  };

  // Ensure handleDeleteTask uses projectId and taskIndex correctly (it already does)
  const handleDeleteTask = (projectId, taskIndex) => {
    const projectTasks = tasks[projectId] ? [...tasks[projectId]] : [];
    if (taskIndex >= 0 && taskIndex < projectTasks.length) { // Add bounds check
        projectTasks.splice(taskIndex, 1);
        setTasks({ ...tasks, [projectId]: projectTasks });
        showNotification('Task deleted successfully!', 'success');
    } else {
        showNotification('Error deleting task: Invalid index.', 'error');
        console.error("Invalid task index provided for deletion:", taskIndex);
    }
    setEditingProjectId(null); // Keep this reset
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
  };

  // Handle dashboard card clicks
  const handleDashboardCardClick = (type) => {
    setActiveSection('projects');
    if (type === 'all-projects') setProjectFilter('All');
    else if (type === 'completed-projects') setProjectFilter('Completed');
    else if (type === 'inprogress-projects') setProjectFilter('In Progress');
    else if (type === 'pending-projects') setProjectFilter('Pending');
  };

  // Quick Action handlers
  const handleAddProject = () => {
    // setActiveSection('projects'); // Prevent navigation to Projects section
    setEditingProjectId(null);
    setShowAddProject(true);
    setProjectModalOpen(true);
    setShowAddTask(false);
  };
  // Update handleAddTask to open modal
  const handleAddTask = () => {
    setActiveSection('dashboard'); // Stay on dashboard
    setShowAddProject(false);
    setShowAddTask(true);
    setEditingProjectId(null);
    setSelectedProjectId(null); // Prompt user to select project
    setModalOpen(true);
  };

  // Helper: handle saving a task from modal
  const handleModalSaveTask = (task) => {
    if (!selectedProjectId) {
      showNotification('Please select a project for this task.', 'error');
      return;
    }
    handleSaveTask(selectedProjectId, task);
    setModalOpen(false);
    setShowAddTask(false);
  };

  // Helper: handle saving a project from modal
  const handleModalSaveProject = (project) => {
    handleSaveProject(project);
    setShowAddProject(false);
    setProjectModalOpen(false);
  };

  // Helper: close modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setShowAddTask(false);
  };

  return (
    <div className={isDesktop ? "d-flex" : "d-flex flex-column"} style={{ minHeight: '100vh' }}>
      {isDesktop ? (
        <>
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          <div className="d-flex flex-column flex-grow-1"> {/* Wrapper for main content and footer */}
            <main className="flex-grow-1 container mt-4" role="main">
              {notification && (
                <Notification
                  message={notification.message}
                  type={notification.type}
                  onClose={() => setNotification(null)}
                />
              )}
              {/* Show ProjectForm in modal if adding or editing (always render when projectModalOpen is true) */}
              {projectModalOpen && (
                <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1050 }} tabIndex="-1" role="dialog" aria-modal="true">
                  <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add Project</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => { setProjectModalOpen(false); setShowAddProject(false); }}></button>
                      </div>
                      <div className="modal-body">
                        <ProjectForm onSave={handleModalSaveProject} project={editingProjectId !== null ? projects.find((p) => p.id === editingProjectId) : null} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeSection === 'dashboard' && (
                <>
                  <h1 className="mb-4" tabIndex={0}>Project Management</h1>
                  <OnboardingNote storageKey="onboardingNoteDashboard">
                    <div style={{ fontSize: '2rem', marginRight: '1rem' }}>👋✨</div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-2">Welcome to Project Management! 🚀</h5>
                      <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                        <li>➕ <b>Add</b> projects and tasks with the buttons above.</li>
                        <li>📝 <b>Edit</b> or <b>delete</b> items anytime.</li>
                        <li>📊 <b>Dashboard</b> shows your progress at a glance.</li>
                        <li>⚙️ <b>Settings</b> lets you reset your data.</li>
                        <li>💡 <b>Tip:</b> Click cards to filter projects!</li>
                      </ul>
                      <span style={{ fontSize: '1.1em' }}>Have fun managing your work! 🎉</span>
                    </div>
                  </OnboardingNote>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <Dashboard
                        projects={projects}
                        tasks={tasks}
                        onCardClick={handleDashboardCardClick}
                        onAddProject={handleAddProject}
                        onAddTask={handleAddTask}
                      />
                    </div>
                  </div>
                </>
              )}
              {activeSection === 'projects' && (
                <div className="row">
                  <div className="col-12">
                    <OnboardingNote storageKey="onboardingNoteProjects">
                      <div style={{ fontSize: '2rem', marginRight: '1rem' }}>📁🛠️</div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-2">Projects Section Guide</h5>
                        <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                          <li>➕ <b>Add</b> a new project with the button above.</li>
                          <li>✏️ <b>Edit</b> or 🗑️ <b>delete</b> projects as needed.</li>
                          <li>🔍 <b>Filter</b> projects by status.</li>
                          <li>📂 <b>View tasks</b> for each project.</li>
                        </ul>
                        <span style={{ fontSize: '1.1em' }}>Organize your projects easily! 🧩</span>
                      </div>
                    </OnboardingNote>
                    <div className="d-flex justify-content-end mb-3 gap-2">
                      <button className="btn btn-primary" onClick={() => { setShowAddProject(true); setProjectModalOpen(true); setEditingProjectId(null); setModalOpen(false); setShowAddTask(false); }} type="button">+ Add Project</button>
                      <button className="btn btn-success" onClick={() => { setModalOpen(true); setShowAddTask(true); setSelectedProjectId(null); }} type="button">+ Add Task</button>
                    </div>
                    <h2 className="mb-3" tabIndex={0}>Projects</h2>
                    <ProjectList
                      projects={projects}
                      onEdit={id => {
                        setEditingProjectId(id);
                        setProjectModalOpen(true);
                        setShowAddProject(false);
                        setShowAddTask(false);
                      }}
                      onDelete={handleDeleteProject}
                      onTasks={id => {
                        setSelectedProjectId(id);
                        setShowAddTask(true);
                        setShowAddProject(false);
                        setEditingProjectId(null);
                        setActiveSection('tasks'); // Fix: Go to Tasks section
                      }}
                      onStatusChange={handleStatusChange}
                      filterStatus={projectFilter}
                    />
                  </div>
                </div>
              )}
              {activeSection === 'tasks' && (
                <div className="row">
                  <div className="col-md-12">
                    <OnboardingNote storageKey="onboardingNoteTasks">
                      <div style={{ fontSize: '2rem', marginRight: '1rem' }}>✅📝</div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-2">Tasks Section Guide</h5>
                        <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                          <li>➕ <b>Add</b> tasks to any project.</li>
                          <li>✏️ <b>Edit</b> or 🗑️ <b>delete</b> tasks anytime.</li>
                          <li>📅 <b>Set due dates</b> and priorities.</li>
                          <li>🔄 <b>Track progress</b> by updating status.</li>
                        </ul>
                        <span style={{ fontSize: '1.1em' }}>Stay on top of your tasks! 🏆</span>
                      </div>
                    </OnboardingNote>
                    <div className="d-flex justify-content-end mb-3 gap-2">
                      <button className="btn btn-primary" onClick={() => { setActiveSection('projects'); setShowAddProject(true); setProjectModalOpen(true); setEditingProjectId(null); setModalOpen(false); setShowAddTask(false); }} type="button">+ Add Project</button>
                      <button className="btn btn-success" onClick={() => { setModalOpen(true); setShowAddTask(true); setSelectedProjectId(null); }} type="button">+ Add Task</button>
                    </div>
                    <h2 className="mb-3" tabIndex={0}>All Tasks</h2>
                    {/* Render all tasks for all projects inside Bootstrap cards */}
                    {projects.map((project) => (
                      <div key={project.id} className="mb-4">
                        <div className="card">
                          <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">{project.title}</h5>
                          </div>
                          <div className="card-body">
                            <TaskList
                              tasks={tasks[project.id] || []}
                              projectId={project.id} // Pass the project ID
                              onUpdateTask={handleUpdateTask} // Pass the new update handler
                              onDelete={handleDeleteTask} // Pass the delete handler (already correct)
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeSection === 'settings' && (
                <div className="row mb-4">
                  <div className="col-md-12">
                    <OnboardingNote storageKey="onboardingNoteSettings">
                      <div style={{ fontSize: '2rem', marginRight: '1rem' }}>⚙️🧹</div>
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-2">Settings Section Guide</h5>
                        <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                          <li>🧹 <b>Reset</b> all your project and task data.</li>
                          <li>⚠️ <b>Warning:</b> This action cannot be undone!</li>
                        </ul>
                        <span style={{ fontSize: '1.1em' }}>Manage your app settings here. 🔒</span>
                      </div>
                    </OnboardingNote>
                    <Settings onResetData={handleResetData} />
                  </div>
                </div>
              )}
              {/* Modal for Add Task (should be outside section conditionals so it works everywhere) */}
              {modalOpen && (
                <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1050 }} tabIndex="-1" role="dialog" aria-modal="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Add Task</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                      </div>
                      <div className="modal-body">
                        {/* Project selector if not selected */}
                        {!selectedProjectId && (
                          <div className="mb-3">
                            <label className="form-label">Select Project:</label>
                            <select className="form-select" value={selectedProjectId || ''} onChange={e => setSelectedProjectId(e.target.value)} required>
                              <option value="" disabled>Select a project</option>
                              {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.title}</option>
                              ))}
                            </select>
                          </div>
                        )}
                        <TaskForm onSave={handleModalSaveTask} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
            <Footer />
          </div>
        </>
      ) : (
        <>
          <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
          <main className="flex-grow-1 container mt-4" role="main">
            {notification && (
              <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
              />
            )}
            {/* Show ProjectForm in modal if adding or editing (always render when projectModalOpen is true) */}
            {projectModalOpen && (
              <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1050 }} tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Project</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => { setProjectModalOpen(false); setShowAddProject(false); }}></button>
                    </div>
                    <div className="modal-body">
                      <ProjectForm onSave={handleModalSaveProject} project={editingProjectId !== null ? projects.find((p) => p.id === editingProjectId) : null} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeSection === 'dashboard' && (
              <>
                <h1 className="mb-4" tabIndex={0}>Project Management</h1>
                <OnboardingNote storageKey="onboardingNoteDashboard">
                  <div style={{ fontSize: '2rem', marginRight: '1rem' }}>👋✨</div>
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-2">Welcome to Project Management! 🚀</h5>
                    <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                      <li>➕ <b>Add</b> projects and tasks with the buttons above.</li>
                      <li>📝 <b>Edit</b> or <b>delete</b> items anytime.</li>
                      <li>📊 <b>Dashboard</b> shows your progress at a glance.</li>
                      <li>⚙️ <b>Settings</b> lets you reset your data.</li>
                      <li>💡 <b>Tip:</b> Click cards to filter projects!</li>
                    </ul>
                    <span style={{ fontSize: '1.1em' }}>Have fun managing your work! 🎉</span>
                  </div>
                </OnboardingNote>
                <div className="row mb-4">
                  <div className="col-md-12">
                    <Dashboard
                      projects={projects}
                      tasks={tasks}
                      onCardClick={handleDashboardCardClick}
                      onAddProject={handleAddProject}
                      onAddTask={handleAddTask}
                    />
                  </div>
                </div>
              </>
            )}
            {activeSection === 'projects' && (
              <div className="row">
                <div className="col-12">
                  <OnboardingNote storageKey="onboardingNoteProjects">
                    <div style={{ fontSize: '2rem', marginRight: '1rem' }}>📁🛠️</div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-2">Projects Section Guide</h5>
                      <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                        <li>➕ <b>Add</b> a new project with the button above.</li>
                        <li>✏️ <b>Edit</b> or 🗑️ <b>delete</b> projects as needed.</li>
                        <li>🔍 <b>Filter</b> projects by status.</li>
                        <li>📂 <b>View tasks</b> for each project.</li>
                      </ul>
                      <span style={{ fontSize: '1.1em' }}>Organize your projects easily! 🧩</span>
                    </div>
                  </OnboardingNote>
                  <div className="d-flex justify-content-end mb-3 gap-2">
                    <button className="btn btn-primary" onClick={() => { setShowAddProject(true); setProjectModalOpen(true); setEditingProjectId(null); setModalOpen(false); setShowAddTask(false); }} type="button">+ Add Project</button>
                    <button className="btn btn-success" onClick={() => { setModalOpen(true); setShowAddTask(true); setSelectedProjectId(null); }} type="button">+ Add Task</button>
                  </div>
                  <h2 className="mb-3" tabIndex={0}>Projects</h2>
                  <ProjectList
                    projects={projects}
                    onEdit={id => {
                      setEditingProjectId(id);
                      setProjectModalOpen(true);
                      setShowAddProject(false);
                      setShowAddTask(false);
                    }}
                    onDelete={handleDeleteProject}
                    onTasks={id => {
                      setSelectedProjectId(id);
                      setShowAddTask(true);
                      setShowAddProject(false);
                      setEditingProjectId(null);
                      setActiveSection('tasks'); // Fix: Go to Tasks section
                    }}
                    onStatusChange={handleStatusChange}
                    filterStatus={projectFilter}
                  />
                </div>
              </div>
            )}
            {activeSection === 'tasks' && (
              <div className="row">
                <div className="col-md-12">
                  <OnboardingNote storageKey="onboardingNoteTasks">
                    <div style={{ fontSize: '2rem', marginRight: '1rem' }}>✅📝</div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-2">Tasks Section Guide</h5>
                      <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                        <li>➕ <b>Add</b> tasks to any project.</li>
                        <li>✏️ <b>Edit</b> or 🗑️ <b>delete</b> tasks anytime.</li>
                        <li>📅 <b>Set due dates</b> and priorities.</li>
                        <li>🔄 <b>Track progress</b> by updating status.</li>
                      </ul>
                      <span style={{ fontSize: '1.1em' }}>Stay on top of your tasks! 🏆</span>
                    </div>
                  </OnboardingNote>
                  <div className="d-flex justify-content-end mb-3 gap-2">
                    <button className="btn btn-primary" onClick={() => { setActiveSection('projects'); setShowAddProject(true); setProjectModalOpen(true); setEditingProjectId(null); setModalOpen(false); setShowAddTask(false); }} type="button">+ Add Project</button>
                    <button className="btn btn-success" onClick={() => { setModalOpen(true); setShowAddTask(true); setSelectedProjectId(null); }} type="button">+ Add Task</button>
                  </div>
                  <h2 className="mb-3" tabIndex={0}>All Tasks</h2>
                  {/* Render all tasks for all projects inside Bootstrap cards */}
                  {projects.map((project) => (
                    <div key={project.id} className="mb-4">
                      <div className="card">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">{project.title}</h5>
                        </div>
                        <div className="card-body">
                          <TaskList
                            tasks={tasks[project.id] || []}
                            projectId={project.id} // Pass the project ID
                            onUpdateTask={handleUpdateTask} // Pass the new update handler
                            onDelete={handleDeleteTask} // Pass the delete handler (already correct)
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeSection === 'settings' && (
              <div className="row mb-4">
                <div className="col-md-12">
                  <OnboardingNote storageKey="onboardingNoteSettings">
                    <div style={{ fontSize: '2rem', marginRight: '1rem' }}>⚙️🧹</div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-2">Settings Section Guide</h5>
                      <ul className="mb-2" style={{ paddingLeft: '1.2em' }}>
                        <li>🧹 <b>Reset</b> all your project and task data.</li>
                        <li>⚠️ <b>Warning:</b> This action cannot be undone!</li>
                      </ul>
                      <span style={{ fontSize: '1.1em' }}>Manage your app settings here. 🔒</span>
                    </div>
                  </OnboardingNote>
                  <Settings onResetData={handleResetData} />
                </div>
              </div>
            )}
            {/* Modal for Add Task (should be outside section conditionals so it works everywhere) */}
            {modalOpen && (
              <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.3)', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1050 }} tabIndex="-1" role="dialog" aria-modal="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Add Task</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                      {/* Project selector if not selected */}
                      {!selectedProjectId && (
                        <div className="mb-3">
                          <label className="form-label">Select Project:</label>
                          <select className="form-select" value={selectedProjectId || ''} onChange={e => setSelectedProjectId(e.target.value)} required>
                            <option value="" disabled>Select a project</option>
                            {projects.map(p => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        </div>
                      )}
                      <TaskForm onSave={handleModalSaveTask} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
