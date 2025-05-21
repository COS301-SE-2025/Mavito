import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import Navbar from './components/ui/Navbar';

import './App.css';

function App() {
  return (
    <div>
    <Navbar />
    <div className="MavitoApp">
      <Routes>
        <Route path="/Landing" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
