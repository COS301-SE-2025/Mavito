// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AnimatedGreeting from '../components/auth/AnimatedGreeting';
import LanguageSwitcher from '../components/LanguageSwitcher'; // Import only once
import '../styles/LandingPage.css';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="landing-page-container">
      <div className="landing-header-controls">
        <LanguageSwitcher />
      </div>

      <AnimatedGreeting />

      <main className="landing-actions">
        <div className="landing-buttons-stack">
          <Link to="/register" className="btn-landing btn-register-custom">
            {t('landingPage.registerButton')}
          </Link>
          <Link to="/login" className="btn-landing btn-login-custom">
            {t('landingPage.loginButton')}
          </Link>
        </div>
      </main>
      <footer className="landing-footer">
        <p>
          &copy; {new Date().getFullYear()} {t('appTitle', 'Mavito Project')}
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
