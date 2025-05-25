import React, { useState } from 'react';
import LeftPane from '../components/dashboard/LeftPane.tsx';
import '../styles/DashboardPage.css';

interface RecentTerm {
  id: string;
  term: string;
  language: string;
  definition: string;
  lastViewed: string;
}

interface CommunityActivity {
  id: string;
  user: string;
  action: string;
  term: string;
  language: string;
  timestamp: string;
}

const DashboardPage: React.FC = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [isOffline] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const recentTerms: RecentTerm[] = [
    {
      id: '1',
      term: 'Ubuntu',
      language: 'Zulu',
      definition: 'Humanity; the interconnectedness of all people',
      lastViewed: '2 hours ago'
    },
    {
      id: '2',
      term: 'Sawubona',
      language: 'Zulu',
      definition: 'Hello; I see you',
      lastViewed: '5 hours ago'
    },
    {
      id: '3',
      term: 'Dumela',
      language: 'Sesotho',
      definition: 'Hello; greeting',
      lastViewed: '1 day ago'
    },
    {
      id: '4',
      term: 'Thobela',
      language: 'Northern Sotho',
      definition: 'Hello; greeting',
      lastViewed: '2 days ago'
    }
  ];

  const communityActivities: CommunityActivity[] = [
    {
      id: '1',
      user: 'LinguistMara',
      action: 'added new term',
      term: 'Indaba',
      language: 'Zulu',
      timestamp: '30 minutes ago'
    },
    {
      id: '2',
      user: 'SALanguageExpert',
      action: 'updated definition for',
      term: 'Braai',
      language: 'Afrikaans',
      timestamp: '2 hours ago'
    },
    {
      id: '3',
      user: 'TsongaScribe',
      action: 'contributed translation for',
      term: 'Vutomi',
      language: 'Tsonga',
      timestamp: '5 hours ago'
    },
    {
      id: '4',
      user: 'XhosaWords',
      action: 'verified term',
      term: 'Enkosi',
      language: 'Xhosa',
      timestamp: '1 day ago'
    }
  ];

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
  };

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    setShowLanguageDropdown(false);
    // Add language change logic here if needed
  };

  return (
    <div className="dashboard-container">
      <LeftPane 
        activeItem={activeMenuItem} 
        onItemClick={handleMenuItemClick} 
      />
      
      <div className="main-content">
        <div className="top-bar">
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome back, Contributor!</h1>
          </div>
          <div className="profile-section">
            <div className="profile-info">
              <div className="profile-avatar">U</div>
              <div className="profile-details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ position: 'relative' }}>
                    <button 
                      onClick={toggleLanguageDropdown}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#1f2937',
                        padding: '4px'
                      }}
                    >
                      🌐
                    </button>
                    {showLanguageDropdown && (
                      <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        zIndex: 100,
                        minWidth: '120px'
                      }}>
                        <div 
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: currentLanguage === 'English' ? '#f3f4f6' : 'transparent'
                          }}
                          onClick={() => handleLanguageChange('English')}
                        >
                          English
                        </div>
                        <div 
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            backgroundColor: currentLanguage === 'Afrikaans' ? '#f3f4f6' : 'transparent'
                          }}
                          onClick={() => handleLanguageChange('Afrikaans')}
                        >
                          Afrikaans
                        </div>
                      </div>
                    )}
                  </div>
                  <h3>User Name</h3>
                </div>
                <p>ID: 21540838</p>
              </div>
            </div>
          </div>
        </div>

        <div className="three-column-layout">
          <div className="middle-column">
            <div className="quick-actions-section">
              <h2 className="section-title">Quick Actions</h2>
              <div className="quick-actions-grid">
                <div className="action-card primary" onClick={() => handleQuickAction('search')}>
                  <div className="action-icon">🔍</div>
                  <h3>Search Now</h3>
                  <p>Explore our multilingual database</p>
                </div>
                <div className="action-card secondary" onClick={() => handleQuickAction('download')}>
                  <div className="action-icon">📥</div>
                  <h3>Download Resources</h3>
                  <p>Access content offline</p>
                </div>
                <div className="action-card tertiary" onClick={() => handleQuickAction('contribute')}>
                  <div className="action-icon">✍️</div>
                  <h3>Contribute a Term</h3>
                  <p>Help grow our database</p>
                </div>
              </div>
            </div>

            <div className="recent-terms-section">
              <div className="section-card">
                <h2 className="section-title">Recently Viewed Terms</h2>
                <div className="recent-terms-list">
                  {recentTerms.map((term) => (
                    <div key={term.id} className="term-item">
                      <div className="term-header">
                        <h4 className="term-name">{term.term}</h4>
                        <span className="term-language">{term.language}</span>
                      </div>
                      <p className="term-definition">{term.definition}</p>
                      <span className="term-timestamp">{term.lastViewed}</span>
                    </div>
                  ))}
                </div>
                <button className="view-all-btn">View All Recent Terms</button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="section-card">
              <h2 className="section-title">Community Activity</h2>
              <div className="activity-feed">
                {communityActivities.map((activity) => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-avatar">
                      {activity.user.charAt(0).toUpperCase()}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">
                        <strong>{activity.user}</strong> {activity.action} 
                        <span className="activity-term">"{activity.term}"</span> 
                        in <span className="activity-language">{activity.language}</span>
                      </p>
                      <span className="activity-timestamp">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="view-all-activity-btn">View All Activity</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;