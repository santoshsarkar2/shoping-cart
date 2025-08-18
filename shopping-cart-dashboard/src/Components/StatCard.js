import React from 'react'
function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrapper">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

export default StatCard
