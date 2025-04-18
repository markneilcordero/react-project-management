import React from 'react';

const DashboardCard = ({ title, value, badge, badgeClass, onClick, className = '', children }) => (
  <div
    className={`card dashboard-summary-card text-center ${className} clickable-card shadow-sm border-0`}
    onClick={onClick}
    style={{
      cursor: onClick ? 'pointer' : 'default',
      borderRadius: '16px',
      transition: 'box-shadow 0.2s',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      border: className.includes('border-primary') ? '3px solid #0d6efd'
        : className.includes('border-success') ? '3px solid #198754'
        : className.includes('border-warning') ? '3px solid #ffc107'
        : className.includes('border-info') ? '3px solid #0dcaf0'
        : '3px solid #dee2e6'
    }}
  >
    <div className="card-body d-flex flex-column align-items-center justify-content-center p-4 gap-2">
      <h6 className="card-title dashboard-card-title mb-2" style={{ fontWeight: 700, fontSize: '1.1em', letterSpacing: '0.01em' }}>{title}</h6>
      <p className="display-6 mb-0 dashboard-stat-number" style={{ fontSize: '2.2rem', color: '#0d6efd', fontWeight: 800 }}>{value}</p>
      {badge && <span className={`badge mt-2 px-3 py-2 ${badgeClass}`} style={{ fontSize: '1em', borderRadius: '12px' }}>{badge}</span>}
      {children}
    </div>
  </div>
);

export default DashboardCard;
