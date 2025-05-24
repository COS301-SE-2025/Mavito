import React from 'react';
import '../../styles/DashboardPage.css';

interface LeftPaneProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const LeftPane: React.FC<LeftPaneProps> = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'search', label: 'Search' },
    { id: 'saved', label: 'Saved Terms' },
    { id: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="left-pane">
      {/* Header */}
      <div className="left-pane-header">
        <h2 className="app-title">Mavito</h2>
        <div className="logo-container">
          <img 
            src="/DFSI_Logo.png" 
            alt="DFSI Logo" 
            className="dfsi-logo"
          />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="navigation-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            <span className="menu-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default LeftPane;