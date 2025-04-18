import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = ({ projects, tasks }) => {
  // Calculate project statistics
  const totalProjects = projects.length;
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const ongoingProjects = projects.filter((p) => p.status === 'Ongoing').length;
  const pendingProjects = totalProjects - completedProjects - ongoingProjects;

  // Calculate task statistics
  const totalTasks = Object.values(tasks).flat().length;
  const completedTasks = Object.values(tasks).flat().filter((t) => t.status === 'Completed').length;
  const pendingTasks = totalTasks - completedTasks;

  // Data for charts
  const projectData = {
    labels: ['Completed', 'Ongoing', 'Pending'],
    datasets: [
      {
        data: [completedProjects, ongoingProjects, pendingProjects],
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

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Project Overview</h2>
        <p>Total Projects: {totalProjects}</p>
        <p>Completed: {completedProjects}</p>
        <p>Ongoing: {ongoingProjects}</p>
        <p>Pending: {pendingProjects}</p>
        <Pie data={projectData} />
      </div>
      <div>
        <h2>Task Overview</h2>
        <p>Total Tasks: {totalTasks}</p>
        <p>Completed: {completedTasks}</p>
        <p>Pending: {pendingTasks}</p>
        <Bar data={taskData} />
      </div>
    </div>
  );
};

export default Dashboard;