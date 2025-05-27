import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LeftPane from '../components/dashboard/LeftPane.tsx';
import LanguageSwitcher from '../components/LanguageSwitcher.tsx';
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
  const { t } = useTranslation();
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
  const [recentTerms, setRecentTerms] = useState<RecentTerm[]>([]);
  const [communityActivities, setCommunityActivities] = useState<
    CommunityActivity[]
  >([]);
  const [showRecentTerms, setShowRecentTerms] = useState(false);
  const [showCommunityActivity, setShowCommunityActivity] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load recent terms
        const recentTermsResponse = await fetch(
          '../../../Mock_Data/recentTerms.json',
        );
        console.log('Recent terms response:', recentTermsResponse.status);

        if (!recentTermsResponse.ok) {
          throw new Error(
            `Failed to fetch recent terms: ${String(recentTermsResponse.status)}`,
          );
        }

        const recentTermsData =
          (await recentTermsResponse.json()) as RecentTerm[];
        console.log('Recent terms data:', recentTermsData);
        setRecentTerms(recentTermsData);

        // Load community activities
        const communityActivitiesResponse = await fetch(
          '../../../Mock_Data/communityActivity.json',
        );
        console.log(
          'Community activities response:',
          communityActivitiesResponse.status,
        );

        if (!communityActivitiesResponse.ok) {
          throw new Error(
            `Failed to fetch community activities: ${String(communityActivitiesResponse.status)}`,
          );
        }

        const communityActivitiesData =
          (await communityActivitiesResponse.json()) as CommunityActivity[];
        console.log('Community activities data:', communityActivitiesData);
        setCommunityActivities(communityActivitiesData);
      } catch (error) {
        console.error('Error loading data:', error);

        // Fallback data in case fetch fails
        setRecentTerms([
          {
            id: '1',
            term: 'Agroforestry',
            language: 'Zulu',
            definition:
              'Land use management system that combines trees with crops or livestock on the same land.',
            lastViewed: '2 hours ago',
            translation: 'Izolimo zamahlathi',
          },
          {
            id: '2',
            term: 'Aquaculture',
            language: 'Xhosa',
            definition:
              'Cultivation of aquatic organisms under controlled conditions.',
            lastViewed: '5 hours ago',
            translation: 'Ukukhulisa izilwanyana zasemanzini',
          },
          {
            id: '3',
            term: 'Biodynamic farming',
            language: 'Sesotho',
            definition:
              'Ecological farming approach that treats farms as unified organisms.',
            lastViewed: '1 day ago',
            translation: 'Temo ea tlhaho',
          },
          {
            id: '4',
            term: 'Cover crop',
            language: 'Northern Sotho',
            definition:
              'Crop planted to manage soil erosion, fertility, quality, and biodiversity.',
            lastViewed: '2 days ago',
            translation: 'Peo ya go sireletsa',
          },
        ]);

        setCommunityActivities([
          {
            id: '1',
            user: 'LinguistMara',
            action: 'added new term',
            term: 'Indaba',
            language: 'Zulu',
            timestamp: '30 minutes ago',
          },
          {
            id: '2',
            user: 'SALanguageExpert',
            action: 'updated definition for',
            term: 'Braai',
            language: 'Afrikaans',
            timestamp: '2 hours ago',
          },
          {
            id: '3',
            user: 'TsongaScribe',
            action: 'contributed translation for',
            term: 'Vutomi',
            language: 'Tsonga',
            timestamp: '5 hours ago',
          },
          {
            id: '4',
            user: 'XhosaWords',
            action: 'verified term',
            term: 'Enkosi',
            language: 'Xhosa',
            timestamp: '1 day ago',
          },
        ]);
      }
    };

    void loadData();
  }, []);

  const handleMenuItemClick = (item: string) => {
    setActiveMenuItem(item);
    if (window.innerWidth <= 768) {
      // Assuming 768px is the mobile breakpoint
      setIsMobileMenuOpen(false);
    }
  };

  const handleQuickAction = (action: string) => {
    console.log(`Quick action clicked: ${action}`);
  };

  const handleViewAllRecentTerms = () => {
    setShowRecentTerms(!showRecentTerms);
  };

  const handleViewAllActivity = () => {
    setShowCommunityActivity(!showCommunityActivity);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`dashboard-container ${
        isMobileMenuOpen ? 'mobile-menu-is-open' : ''
      }`}
    >
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={toggleMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              toggleMobileMenu();
              return;
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Close menu"
        />
      )}
      <LeftPane activeItem={activeMenuItem} onItemClick={handleMenuItemClick} />

      <div className="main-content">
        <div className="top-bar">
          <button
            className="hamburger-icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <div className="welcome-section">
            {' '}
            <h1 className="welcome-title">{t('dashboard.welcome')}</h1>
          </div>
          <div className="profile-section">
            <div className="profile-info">
              <div className="profile-avatar">U</div>
              <div className="profile-details">
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {' '}
                  <LanguageSwitcher />
                  <h3>{t('dashboard.userName')}</h3>
                </div>
                <p>{t('dashboard.userId')}: 21540838</p>
              </div>
            </div>
          </div>
        </div>

        <div className="three-column-layout">
          <div className="middle-column">
            <div className="quick-actions-section">
              {' '}
              <h2 className="section-title">{t('dashboard.quickActions')}</h2>
              <div className="quick-actions-grid">
                <div
                  className="action-card primary"
                  onClick={() => {
                    handleQuickAction('search');
                  }}
                >
                  <div className="action-icon">🔍</div>
                  <h3>{t('dashboard.searchNow')}</h3>
                  <p>{t('dashboard.searchDescription')}</p>
                </div>
                <div
                  className="action-card secondary"
                  onClick={() => {
                    handleQuickAction('download');
                  }}
                >
                  <div className="action-icon">📥</div>
                  <h3>{t('dashboard.downloadResources')}</h3>
                  <p>{t('dashboard.downloadDescription')}</p>
                </div>
                <div
                  className="action-card tertiary"
                  onClick={() => {
                    handleQuickAction('contribute');
                  }}
                >
                  <div className="action-icon">✍️</div>
                  <h3>{t('dashboard.contributeTerm')}</h3>
                  <p>{t('dashboard.contributeDescription')}</p>
                </div>
              </div>
            </div>

            <div className="recent-terms-section">
              <div className="section-card">
                {' '}
                <h2 className="section-title">{t('dashboard.recentTerms')}</h2>
                {showRecentTerms && (
                  <div className="recent-terms-list">
                    {recentTerms.map((term) => (
                      <div key={term.id} className="term-item">
                        <div className="term-header">
                          <h4 className="term-name">{term.term}</h4>
                          <span className="term-language">{term.language}</span>
                        </div>
                        <p className="term-definition">{term.definition}</p>
                        <span className="term-timestamp">
                          {term.lastViewed}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  type="button"
                  className="view-all-btn"
                  onClick={handleViewAllRecentTerms}
                >
                  {showRecentTerms
                    ? t('dashboard.hideTerms')
                    : t('dashboard.viewAll')}
                </button>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="section-card">
              {' '}
              <h2 className="section-title">
                {t('dashboard.communityActivity')}
              </h2>
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
                          <span className="activity-term">
                            "{activity.term}"
                          </span>
                          in{' '}
                          <span className="activity-language">
                            {activity.language}
                          </span>
                        </p>
                        <span className="activity-timestamp">
                          {activity.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                className="view-all-activity-btn"
                onClick={handleViewAllActivity}
              >
                {showCommunityActivity
                  ? t('dashboard.hideActivity')
                  : t('dashboard.viewAllActivity')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
