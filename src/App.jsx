import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Register from './components/Register';
import LoginForm from './components/LoginForm';
import ForgotPassword from './components/ForgotPassword';
import UnityWebGLComponent from './components/UnityWebGLComponent'; 
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import AgeVerification from './components/AgeVerification';
import Authentication from './components/Authentication';
import DataStore from './components/DataStore';
import AboutUs from './components/AboutUs';
import Terms from './components/Terms';
import { ThemeProvider } from './components/ThemeContext';
import ChangePassword from './components/ChangePassword';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <Navbar />
        <MainContent />
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  return (
    <>
      {/* Render HomePage only if not on /aboutUs or /terms routes */}
      {location.pathname !== '/aboutUs' && location.pathname !== '/Terms' && location.pathname !== '/game' && <HomePage />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/age" element={<AgeVerification />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/terms' element={<Terms />} />
        <Route path="/game" element={<UnityWebGLComponent />} />
        <Route path ="/change" element={<ChangePassword />}/>
      </Routes>
    </>
  );
}

export default App;
