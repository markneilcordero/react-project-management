import React from 'react';
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

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement);

const Dashboard = ({ projects, tasks }) => {
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
  const tasksByProjectAndStatus = statuses.map((status) =>
    projects.map((_, projectIdx) =>
      (tasks[projectIdx] || []).filter((t) => t.status === status).length
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

  return (
    <div className="card"> {/* Wrap in a card */}
      <div className="card-body"> {/* Card body */}
        <h5 className="card-title mb-4 dashboard-card-title">Dashboard</h5> {/* Card title */}
        <div className="row mb-3"> {/* Bootstrap Card Row for Project Stats */}
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">Total Projects</h6>
                <p className="display-6 mb-0 dashboard-stat-number">{totalProjects}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">Completed</h6>
                <p className="display-6 mb-0 text-success dashboard-stat-number">{completedProjects}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">In Progress</h6>
                <p className="display-6 mb-0 text-info dashboard-stat-number">{inProgressProjects}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">Pending</h6>
                <p className="display-6 mb-0 text-warning dashboard-stat-number">{pendingProjects}</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Bootstrap Card Row for Project Stats */}
        <div className="row mb-3"> {/* Bootstrap Card Row for Task Stats */}
          <div className="col-md-4">
            <div className="card text-center border-primary">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">Total Tasks</h6>
                <p className="display-6 mb-0 dashboard-stat-number">{totalTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-success">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">Completed</h6>
                <p className="display-6 mb-0 text-success dashboard-stat-number">{completedTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title dashboard-card-title">Pending</h6>
                <p className="display-6 mb-0 text-warning dashboard-stat-number">{pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Bootstrap Card Row for Task Stats */}
        {/* Removed duplicate stat lines, keep only charts and headers */}
        <div className="row g-3 flex-wrap"> {/* Responsive row with gap */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>Project Overview</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalProjects > 0 ? <Doughnut data={projectData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Project Status Distribution' } } }} /> : <p className='text-muted'>No project data</p>}
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>Projects List</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalProjects > 0 ? <Doughnut data={projectNamesData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, title: { display: true, text: 'Projects' } } }} /> : <p className='text-muted'>No project names</p>}
            </div>
          </div>
        </div>
        <div className="row g-3 flex-wrap mt-4">
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>Task Overview</h6>
            <div className="dashboard-chart-container" style={{ width: '100%', maxWidth: '400px', height: 'auto', aspectRatio: '1', margin: '0 auto' }}>
              {totalTasks > 0 ? <Doughnut data={taskStatusData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' }, title: { display: true, text: 'Task Status Distribution' } } }} /> : <p className='text-muted'>No task data</p>}
            </div>
          </div>
          <div className="col-12 col-md-6 mb-4 mb-md-0 d-flex flex-column align-items-center">
            <h6>Task List</h6>
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
                    },
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