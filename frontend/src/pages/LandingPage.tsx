// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom'; 
import AnimatedGreeting from '../components/auth/AnimatedGreeting'; 
import '../styles/LandingPage.css'; 

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page-container">
      
      <AnimatedGreeting />
     
      <main className="landing-actions">
        <div className="landing-buttons-stack">
          {/* Register Button */}
          <Link to="/register" className="btn-landing btn-register-custom">
            Register
          </Link>

          {/* Login Button */}
          <Link to="/login" className="btn-landing btn-login-custom">
            Login
          </Link>
        </div>
      </main>
      <footer className="landing-footer">
        {/* Optional footer content */}
        <p>&copy; {new Date().getFullYear()} Mavito Project</p>
      </footer>
    </div>
  );
};

export default LandingPage;
