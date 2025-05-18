// src/pages/LoginPage.tsx
import React from 'react';
import '../styles/LoginPage.css';
import AnimatedGreeting from '../components/auth/AnimatedGreeting';

const LoginPage: React.FC = () => {
  return (
    <div className="login-page-container">
      <AnimatedGreeting />
    </div>
  );
};

export default LoginPage;