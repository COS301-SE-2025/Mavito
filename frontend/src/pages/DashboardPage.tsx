import React, { useState, useEffect } from 'react';
import LeftPane from '../components/dashboard/LeftPane.tsx';
import '../styles/DashboardPage.css';

interface RecentTerm {
  id: string;
  term: string;
  language: string;
  definition: string;
  lastViewed: string;
  translation: string;
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
  const [recentTerms, setRecentTerms] = useState<RecentTerm[]>([]);
  const [communityActivities, setCommunityActivities] = useState<CommunityActivity[]>([]);
  const [showRecentTerms, setShowRecentTerms] = useState(false);
  const [showCommunityActivity, setShowCommunityActivity] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load recent terms
        const recentTermsResponse = await fetch('../Mock_Data/recentTerms.json');
        console.log('Recent terms response:', recentTermsResponse.status);
        
        if (!recentTermsResponse.ok) {
          throw new Error(`Failed to fetch recent terms: ${recentTermsResponse.status}`);
        }
        
        const recentTermsData = await recentTermsResponse.json();
        console.log('Recent terms data:', recentTermsData);
        setRecentTerms(recentTermsData);

        // Load community activities
        const communityActivitiesResponse = await fetch('../Mock_Data/communityActivity.json');
        console.log('Community activities response:', communityActivitiesResponse.status);
        
        if (!communityActivitiesResponse.ok) {
          throw new Error(`Failed to fetch community activities: ${communityActivitiesResponse.status}`);
        }
        
        const communityActivitiesData = await communityActivitiesResponse.json();
        console.log('Community activities data:', communityActivitiesData);
        setCommunityActivities(communityActivitiesData);
      } catch (error) {
        console.error('Error loading data:', error);
        
        // Fallback data in case fetch fails
        setRecentTerms([
          {
            id: "1",
            term: "Agroforestry",
            language: "Zulu",
            definition: "Land use management system that combines trees with crops or livestock on the same land.",
            lastViewed: "2 hours ago",
            translation: "Izolimo zamahlathi"
          },
          {
            id: "2",
            term: "Aquaculture",
            language: "Xhosa",
            definition: "Cultivation of aquatic organisms under controlled conditions.",
            lastViewed: "5 hours ago",
            translation: "Ukukhulisa izilwanyana zasemanzini"
          },
          {
            id: "3",
            term: "Biodynamic farming",
            language: "Sesotho",
            definition: "Ecological farming approach that treats farms as unified organisms.",
            lastViewed: "1 day ago",
            translation: "Temo ea tlhaho"
          },
          {
            id: "4",
            term: "Cover crop",
            language: "Northern Sotho",
            definition: "Crop planted to manage soil erosion, fertility, quality, and biodiversity.",
            lastViewed: "2 days ago",
            translation: "Peo ya go sireletsa"
          }
        ]);

        setCommunityActivities([
          {
            id: "1",
            user: "LinguistMara",
            action: "added new term",
            term: "Indaba",
            language: "Zulu",
            timestamp: "30 minutes ago"
          },
          {
            id: "2",
            user: "SALanguageExpert",
            action: "updated definition for",
            term: "Braai",
            language: "Afrikaans",
            timestamp: "2 hours ago"
          },
          {
            id: "3",
            user: "TsongaScribe",
            action: "contributed translation for",
            term: "Vutomi",
            language: "Tsonga",
            timestamp: "5 hours ago"
          },
          {
            id: "4",
            user: "XhosaWords",
            action: "verified term",
            term: "Enkosi",
            language: "Xhosa",
            timestamp: "1 day ago"
          }
        ]);
      }
    };

    loadData();
  }, []);

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

  const handleViewAllRecentTerms = () => {
    setShowRecentTerms(!showRecentTerms);
  };

  const handleViewAllActivity = () => {
    setShowCommunityActivity(!showCommunityActivity);
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
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: currentLanguage === 'Afrikaans' ? '#f3f4f6' : 'transparent'
                          }}
                          onClick={() => handleLanguageChange('Afrikaans')}
                        >
                          Afrikaans
                        </div>
                        <div 
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: currentLanguage === 'Sesotho' ? '#f3f4f6' : 'transparent'
                          }}
                          onClick={() => handleLanguageChange('Sesotho')}
                        >
                          Sesotho
                        </div>
                        <div 
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #f3f4f6',
                            backgroundColor: currentLanguage === 'Xhosa' ? '#f3f4f6' : 'transparent'
                          }}
                          onClick={() => handleLanguageChange('Xhosa')}
                        >
                          Xhosa
                        </div>
                        <div 
                          style={{
                            padding: '8px 12px',
                            cursor: 'pointer',
                            backgroundColor: currentLanguage === 'Zulu' ? '#f3f4f6' : 'transparent'
                          }}
                          onClick={() => handleLanguageChange('Zulu')}
                        >
                          Zulu
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
                {showRecentTerms && (
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
                )}
                <button className="view-all-btn" onClick={handleViewAllRecentTerms}>
                  {showRecentTerms ? 'Hide Recent Terms' : 'View All Recent Terms'}
                </button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="section-card">
              <h2 className="section-title">Community Activity</h2>
              {showCommunityActivity && (
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
              )}
              <button className="view-all-activity-btn" onClick={handleViewAllActivity}>
                {showCommunityActivity ? 'Hide Activity' : 'View All Activity'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;