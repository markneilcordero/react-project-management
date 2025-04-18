import React from 'react';

const DashboardCard = ({ title, value, badge, badgeClass, onClick, className = '', children }) => (
  <div className={`card text-center ${className} clickable-card`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <div className="card-body">
      <h6 className="card-title dashboard-card-title">{title}</h6>
      <p className="display-6 mb-0 dashboard-stat-number">{value}</p>
      {badge && <span className={`badge mt-2 ${badgeClass}`}>{badge}</span>}
      {children}
    </div>
  </div>
);

export default DashboardCard;
