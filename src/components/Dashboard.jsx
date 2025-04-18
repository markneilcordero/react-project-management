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

  // Data for task list (Polar Area)
  const taskListLabels = Object.entries(tasks).flatMap(([projectIdx, taskArr]) =>
    (taskArr || []).map((task, i) => `${projects[projectIdx]?.title || 'Project'}: ${task.title || 'Untitled'}`)
  );
  const taskListData = {
    labels: taskListLabels.length > 0 ? taskListLabels : ['No Tasks'],
    datasets: [
      {
        data: taskListLabels.length > 0 ? Array(taskListLabels.length).fill(1) : [1],
        backgroundColor: [
          '#4caf50', '#2196f3', '#f44336', '#ff9800', '#9c27b0', '#00bcd4', '#8bc34a', '#ffc107', '#e91e63', '#795548',
        ],
      },
    ],
  };

  return (
    <div className="card"> {/* Wrap in a card */}
      <div className="card-body"> {/* Card body */}
        <h5 className="card-title mb-4">Dashboard</h5> {/* Card title */}
        <div className="row mb-3"> {/* Bootstrap Card Row for Project Stats */}
          <div className="col-md-3">
            <div className="card text-center border-primary">
              <div className="card-body">
                <h6 className="card-title">Total Projects</h6>
                <p className="display-6 mb-0">{totalProjects}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-success">
              <div className="card-body">
                <h6 className="card-title">Completed</h6>
                <p className="display-6 mb-0 text-success">{completedProjects}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-info">
              <div className="card-body">
                <h6 className="card-title">In Progress</h6>
                <p className="display-6 mb-0 text-info">{inProgressProjects}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title">Pending</h6>
                <p className="display-6 mb-0 text-warning">{pendingProjects}</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Bootstrap Card Row for Project Stats */}
        <div className="row mb-3"> {/* Bootstrap Card Row for Task Stats */}
          <div className="col-md-4">
            <div className="card text-center border-primary">
              <div className="card-body">
                <h6 className="card-title">Total Tasks</h6>
                <p className="display-6 mb-0">{totalTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-success">
              <div className="card-body">
                <h6 className="card-title">Completed</h6>
                <p className="display-6 mb-0 text-success">{completedTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border-warning">
              <div className="card-body">
                <h6 className="card-title">Pending</h6>
                <p className="display-6 mb-0 text-warning">{pendingTasks}</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Bootstrap Card Row for Task Stats */}
        {/* Removed duplicate stat lines, keep only charts and headers */}
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h6>Project Overview</h6>
            {totalProjects > 0 ? <Doughnut data={projectData} options={{ responsive: true }} /> : <p className='text-muted'>No project data</p>}
          </div>
          <div className="col-md-6 mb-4 mb-md-0">
            <h6>Projects List</h6>
            {totalProjects > 0 ? <Doughnut data={projectNamesData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} /> : <p className='text-muted'>No project names</p>}
          </div>
          <div className="col-md-6">
            <h6>Task Overview</h6>
            {totalTasks > 0 ? <Doughnut data={taskStatusData} options={{ responsive: true }} /> : <p className='text-muted'>No task data</p>}
          </div>
          <div className="col-md-6">
            <h6>Task List</h6>
            {totalTasks > 0 ? <Doughnut data={taskListData} options={{ responsive: true, plugins: { legend: { position: 'right' } } }} /> : <p className='text-muted'>No task list</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;