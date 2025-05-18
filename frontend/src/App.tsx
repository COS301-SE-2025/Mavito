import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css'

function App() {
    return (
    <div className="MavitoApp">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegistrationPage />} /> */}
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* Default route could redirect to login or a landing page */}
        <Route path="/" element={<LoginPage />} /> {/* For now, default to login */}
      </Routes>
    </div>
  );
}

export default App
