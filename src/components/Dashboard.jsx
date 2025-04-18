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
    <div className="card"> {/* Wrap in a card */}
      <div className="card-body"> {/* Card body */}
        <h5 className="card-title mb-4">Dashboard</h5> {/* Card title */}
        <div className="row"> {/* Use row for layout */}
          <div className="col-md-6 mb-4 mb-md-0"> {/* Project Overview Column */}
            <h6>Project Overview</h6> {/* Use h6 */}
            <p className="card-text">Total Projects: {totalProjects}</p> {/* Use card-text */}
            <p className="card-text">Completed: {completedProjects}</p>
            <p className="card-text">Ongoing: {ongoingProjects}</p>
            <p className="card-text">Pending: {pendingProjects}</p>
            {totalProjects > 0 ? <Pie data={projectData} options={{ responsive: true }} /> : <p className='text-muted'>No project data</p>} {/* Responsive chart or message */}
          </div>
          <div className="col-md-6"> {/* Task Overview Column */}
            <h6>Task Overview</h6> {/* Use h6 */}
            <p className="card-text">Total Tasks: {totalTasks}</p> {/* Use card-text */}
            <p className="card-text">Completed: {completedTasks}</p>
            <p className="card-text">Pending: {pendingTasks}</p>
            {totalTasks > 0 ? <Bar data={taskData} options={{ responsive: true }} /> : <p className='text-muted'>No task data</p>} {/* Responsive chart or message */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;