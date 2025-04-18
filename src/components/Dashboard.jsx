import React, { useState, useEffect } from 'react';
import { Pie, Bar, Radar, Doughnut, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import './DashboardResponsive.css';
import DashboardCard from './DashboardCard';
import Notification from './Notification';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement);

const Dashboard = ({ projects, tasks, onCardClick, onAddProject, onAddTask }) => {
  // Calculate project statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const inProgressProjects = projects.filter((p) => p.status === 'In Progress').length;
  const pendingProjects = totalProjects - completedProjects - inProgressProjects;

  // Calculate task statistics
  const totalTasks = Object.values(tasks).flat().length;
  const completedTasks = Object.values(tasks).flat().filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  // Data for charts
  const projectData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [completedProjects, inProgressProjects, pendingProjects],
        backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
      },
    ],
  };

  const taskData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  // Data for task status (Doughnut)
  const inProgressTasks = Object.values(tasks).flat().filter((t) => t.status === 'Ongoing' || t.status === 'In Progress').length;
  const taskStatusData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [completedTasks, inProgressTasks, pendingTasks],
        backgroundColor: ['#4caf50', '#2196f3', '#f44336'],
      },
    ],
  };

  // Data for project names chart
  const projectNames = projects.map((p) => p.title || 'Untitled');
  const projectNamesData = {
    labels: projectNames.length > 0 ? projectNames : ['No Projects'],
    datasets: [
      {
        data: projectNames.length > 0 ? Array(projectNames.length).fill(1) : [1],
        backgroundColor: [
          '#4caf50', '#2196f3', '#f44336', '#ff9800', '#9c27b0', '#00bcd4', '#8bc34a', '#ffc107', '#e91e63', '#795548',
        ],
      },
    ],
  };

  // Data for task list (Bar Chart: tasks per project by status)
  const statuses = ['Completed', 'In Progress', 'Pending'];
  const statusColors = ['#4caf50', '#2196f3', '#f44336'];
  const projectTitles = projects.map((p) => p.title || 'Untitled');
  // FIX: Use project.id instead of projectIdx for tasks lookup
  const tasksByProjectAndStatus = statuses.map((status) =>
    projects.map((p) =>
      (tasks[p.id] || []).filter((t) => t.status === status).length
    )
  );
  const taskListBarData = {
    labels: projectTitles.length > 0 ? projectTitles : ['No Projects'],
    datasets: statuses.map((status, i) => ({
      label: status,
      data: tasksByProjectAndStatus[i],
      backgroundColor: statusColors[i],
    })),
  };

  // Helper: Get next 3–5 projects by end date, highlight overdue
  const today = new Date('2025-04-18');
  const upcomingProjects = [...projects]
    .filter(p => p.endDate)
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
    .slice(0, 5);

  // Helper: Calculate progress for each project
  function getProjectProgress(project) {
    const projectTasks = tasks[project.id] || [];
    if (projectTasks.length === 0) return 0;
    const completed = projectTasks.filter(t => t.status === 'Completed').length;
    return Math.round((completed / projectTasks.length) * 100);
  }

  // Dismissed notifications state (persisted in localStorage)
  const [dismissedAlerts, setDismissedAlerts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dismissedAlerts') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('dismissedAlerts', JSON.stringify(dismissedAlerts));
  }, [dismissedAlerts]);

  // Notification for upcoming deadlines (within 7 days or overdue)
  const upcomingAlerts = projects
    .filter(p => p.endDate)
    .map(p => ({
      ...p,
      end: new Date(p.endDate),
      daysLeft: Math.ceil((new Date(p.endDate) - today) / (1000 * 60 * 60 * 24))
    }))
    .filter(p => p.daysLeft <= 7 && !dismissedAlerts.includes(p.id))
    .sort((a, b) => a.daysLeft - b.daysLeft);
  const hasAlerts = upcomingAlerts.length > 0;

  // Handler to dismiss a notification
  const handleDismissAlert = (id) => {
    setDismissedAlerts(prev => [...prev, id]);
  };

  return (
    <div className="card"> {/* Wrap in a card */}
      <div className="card-body"> {/* Card body */}
        {/* User Notifications for upcoming deadlines */}
        {hasAlerts && (
          <div className="mb-3">
            {upcomingAlerts.map(alert => {
              let icon = '⏰';
              let type = 'warning';
              let colorClass = '';
              let message = `Project "${alert.title}" is `;
              if (alert.daysLeft < 0) {
                icon = '❌';
                type = 'error';
                colorClass = 'text-danger';
                message += 'overdue!';
              } else if (alert.daysLeft === 0) {
                icon = '⚠️';
                type = 'warning';
                colorClass = 'text-warning';
                message += 'due today!';
              } else if (alert.daysLeft <= 3) {
                icon = '⚡';
                type = 'warning';
                colorClass = 'text-warning';
                message += `due in ${alert.daysLeft} day${alert.daysLeft === 1 ? '' : 's'}`;
              } else {
                icon = '⏳';
                type = 'info';
                colorClass = 'text-info';
                message += `due in ${alert.daysLeft} days`;
              }
              return (
                <Notification
                  key={alert.id}
                  message={<span><span className={colorClass} style={{fontWeight:'bold',fontSize:'1.2em'}}>{icon}</span> {message}</span>}
                  type={type}
                  onClose={() => handleDismissAlert(alert.id)}
                />
              );
            })}
          </div>
        )}
        <div className="d-flex justify-content-end mb-3 gap-2">
          <button className="btn btn-primary" onClick={onAddProject} type="button">+ Add Project</button>
          <button className="btn btn-success" onClick={onAddTask} type="button">+ Add Task</button>
        </div>
        <h5 className="card-title mb-4 dashboard-card-title">📊 Dashboard</h5> {/* Card title */}
        <div className="row mb-3"> {/* Bootstrap Card Row for Project Stats */}
          <div className="col-md-3">
            <DashboardCard
              title="🗂️ Total Projects"
              value={totalProjects}
              badge="All"
              badgeClass="bg-primary"
              onClick={() => onCardClick && onCardClick('all-projects')}
              className="border-primary"
            />
          </div>
          <div className="col-md-3">
            <DashboardCard
              title="✅ Completed"
              value={completedProjects}
              badge="Healthy"
              badgeClass="bg-success"
              onClick={() => onCardClick && onCardClick('completed-projects')}
              className="border-success"
            />
          </div>
          <div className="col-md-3">
            <DashboardCard
              title="🔄 In Progress"
              value={inProgressProjects}
              badge="Active"
              badgeClass="bg-info"
              onClick={() => onCardClick && onCardClick('inprogress-projects')}
              className="border-info"
            />
          </div>
          <div className="col-md-3">
            <DashboardCard
              title="⏳ Pending"
              value={pendingProjects}
              badge="Attention"
              badgeClass="bg-warning text-dark"
              onClick={() => onCardClick && onCardClick('pending-projects')}
              className="border-warning"
            />
          </div>
        </div>
        {/* End Bootstrap Card Row for Project Stats */}
        <div className="row mb-3"> {/* Bootstrap Card Row for Task Stats */}
          <div className="col-md-4">
            <div className="card text-center border-primary">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">📝 Total Tasks</h6>
                <p className="display-6 mb-0 dashboard-stat-number">{totalTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-success">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">✅ Completed</h6>
                <p className="display-6 mb-0 text-success dashboard-stat-number">{completedTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">⏳ Pending</h6>
                <p className="display-6 mb-0 text-warning dashboard-stat-number">{pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Bootstrap Card Row for Task Stats */}
        {/* Upcoming Deadlines Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-danger">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">⏰ Upcoming Deadlines</h6>
                {upcomingProjects.length === 0 ? (
                  <p className="text-muted mb-0">No upcoming project deadlines.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {upcomingProjects.map((p) => {
                      const isOverdue = new Date(p.endDate) < today;
                      const progress = getProjectProgress(p);
                      return (
                        <li
                          key={p.id || p.title}
                          className={`list-group-item d-flex flex-column flex-md-row justify-content-between align-items-md-center ${isOverdue ? 'text-danger fw-bold' : ''}`}
                        >
                          <div className="d-flex flex-column flex-md-row align-items-md-center gap-2">
                            <span>{p.title || 'Untitled'}</span>
                            <span>
                              {p.endDate ? new Date(p.endDate).toLocaleDateString() : 'No end date'}
                              {isOverdue && <span className="ms-2 badge bg-danger">Overdue</span>}
                            </span>
                          </div>
                          <div className="w-100 w-md-50 mt-2 mt-md-0">
                            <div className="progress" style={{ height: '18px' }}>
                              <div
                                className={`progress-bar${progress === 100 ? ' bg-success' : progress >= 50 ? ' bg-info' : ' bg-warning'}`}
                                role="progressbar"
                                style={{ width: `${progress}%` }}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                              >
                                {progress}%
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Recent Activity Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-info">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">🕒 Recent Activity</h6>
                <ul className="list-group list-group-flush">
                  {[...projects]
                    .filter(p => p.endDate)
                    .sort((a, b) => new Date(b.endDate) - new Date(a.endDate))
                    .slice(0, 3)
                    .map((p) => {
                      const progress = getProjectProgress(p);
                      let badge = 'bg-secondary';
                      let badgeText = 'Unknown';
                      if (p.status === 'Completed') { badge = 'bg-success'; badgeText = 'Healthy'; }
                      else if (p.status === 'In Progress') { badge = 'bg-info'; badgeText = 'Active'; }
                      else if (p.status === 'Pending') { badge = 'bg-warning text-dark'; badgeText = 'Attention'; }
                      return (
                        <li key={p.id} className="list-group-item">
                          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                            <span>
                              <strong>Project:</strong> {p.title || 'Untitled'}
                              <span className={`ms-2 badge ${badge}`}>{badgeText}</span>
                            </span>
                            <span className="text-muted">End: {new Date(p.endDate).toLocaleDateString()}</span>
                          </div>
                          <div className="progress mt-2" style={{ height: '12px' }}>
                            <div
                              className={`progress-bar${progress === 100 ? ' bg-success' : progress >= 50 ? ' bg-info' : ' bg-warning'}`}
                              role="progressbar"
                              style={{ width: `${progress}%` }}
                              aria-valuenow={progress}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  {/* ...existing code for recent tasks... */}
                  {Object.entries(tasks)
                    .flatMap(([pid, tlist]) => tlist.map(t => ({ ...t, pid })))
                    .filter(t => t.dueDate)
                    .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
                    .slice(0, 2)
                    .map((t, idx) => (
                      <li key={t.title + t.dueDate + idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                          <strong>Task:</strong> {t.title}
                          <span className="ms-2 badge bg-secondary">{t.status}</span>
                        </span>
                        <span className="text-muted">Due: {new Date(t.dueDate).toLocaleDateString()}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Removed duplicate stat lines, keep only charts and headers */}
        <div className="row g-3 flex-wrap"> {/* Responsive row with gap */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>🗂️ Project Overview</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalProjects > 0 ? <Doughnut data={projectData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Project Status Distribution' } } }} /> : <p className='text-muted'>No project data</p>}
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>📋 Projects List</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalProjects > 0 ? <Doughnut data={projectNamesData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, title: { display: true, text: 'Projects' } } }} /> : <p className='text-muted'>No project names</p>}
            </div>
          </div>
        </div>
        <div className="row g-3 flex-wrap mt-4">
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>📝 Task Overview</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalTasks > 0 ? <Doughnut data={taskStatusData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Task Status Distribution' } } }} /> : <p className='text-muted'>No task data</p>}
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>📑 Task List</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '500px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalTasks > 0 ? (
                <Bar
                  data={taskListBarData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: 'top' },
                      title: { display: true, text: 'Tasks per Project by Status' },
                      tooltip: { enabled: true }
                    },
                    scales: {
                      x: { stacked: true, title: { display: true, text: 'Projects' } },
                      y: {
                        stacked: true,
                        title: { display: true, text: 'Number of Tasks' },
                        beginAtZero: true,
                        ticks: {
                          stepSize: 1,
                          callback: function(value) { return Number.isInteger(value) ? value : null; }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <p className='text-muted'>No task list</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;