import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useRoutes, useNavigate } from 'react-router-dom';
import Register from './components/Register2';
import LoginForm from './components/LoginForm2';
import ForgotPassword from './components/ForgotPassword';
import UnityWebGLComponent from './components/UnityWebGLComponent';
import UnityWebGLDogParkComponent from './components/UnityWebGLDogParkComponent';
import UnityWebGLAvatarComponent from './components/UnityWebGLAvatarComponent';
import UnityWebGLTurtleGameComponent from './components/UnityWebGLTurtleGameComponent';
import Navbar from './components/Navbar2';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import AgeVerification from './components/AgeVerification';
import Authentication from './components/Authentication';
import AboutUs from './components/AboutUs';
import Terms from './components/Terms';
import Pricing from './components/Pricing'
import { ThemeProvider } from './components/ThemeContext';
import ChangePassword from './components/ChangePassword';
import DataStore from './components/DataStore';
import NotFound from './components/NotFound';
import Map from './components/Map';
import i18n from './components/i18n';
import CheckoutPage from './components/Checkout';

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
  const router = useNavigate();
  useEffect(() => {
    if (!DataStore.getToken() && location.pathname.includes('/game') && location.pathname === '/avatar' && location.pathname === '/map') {
      router("/");
    }
    
  }, [router]);

  return (
    <>
      {/* Render HomePage only if not on /aboutUs or /terms routes */}
      {location.pathname !== '/aboutUs' && location.pathname !== '/Terms' && !location.pathname.includes("/game") && location.pathname !== '/map' && 
       location.pathname !== '/avatar' && location.pathname !== "/pricing" && location.pathname !== "/checkout" && <HomePage />}

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/age" element={<AgeVerification />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/terms' element={<Terms />} />
        <Route path="/game1" element={<UnityWebGLComponent />} />
        <Route path="/game2" element={<UnityWebGLDogParkComponent />} />
        <Route path="/game3" element={<UnityWebGLTurtleGameComponent />} />
        <Route path="/avatar" element={<UnityWebGLAvatarComponent />} />
        <Route path="/change" element={<ChangePassword />} />
        <Route path="/map" element={<Map />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
}

export default App;
