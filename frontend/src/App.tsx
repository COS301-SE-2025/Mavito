import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css'

function App() {
    return (
    <div className="MavitoApp">
      <Routes>
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* Default route could redirect to login or a landing page */}
        <Route path="/" element={<LandingPage />} /> {/* For now, default to login */}
      </Routes>
    </div>
  );
}

export default App
