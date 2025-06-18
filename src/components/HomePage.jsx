// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import datastore from './DataStore';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!datastore.getToken());
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation(); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!datastore.getToken());
    }, 1000);

    return () => {
      clearInterval(interval);
      setLoading(false);
    };
  }, []);

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setLoading(true);
      navigate('/map');
    } else {
      navigate('/age');
    }
  };

  const backgroundStyle = isDarkMode
    ? 'bg-dark-gradient-img'
    : 'bg-light-gradient-img'

  const buttonClasses = isDarkMode
    ? "bg-btn-color hover:bg-btn-hover-color"
    : "bg-btn-color hover:bg-btn-hover-color";

  const textClasses = isDarkMode
    ? "text-white"
    : "text-gray-800";

  const textClasses2 = isDarkMode
    ? "text-white"
    : "text-white";

  const subtitleClasses = isDarkMode
    ? "text-slate-200"
    : "text-gray-600";

    return (
      <div className={`min-h-screen ${backgroundStyle} bg-no-repeat bg-cover text-white flex flex-col items-center justify-center text-center px-6`}>
        
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/pictures/globe.png"
            alt="Impact Logo"
            className="w-56 md:w-64 lg:w-72 drop-shadow-xl"
          />
        </div>
  
        {/* Main Title */}
        <h1 className={`${textClasses} text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4`}>
          {t('homepage.mainline')}
        </h1>
  
        {/* Subtitle */}
        <p className={`${textClasses} text-lg md:text-xl text-slate-300 max-w-2xl mb-8`}>
          {t('homepage.mainline2')}
        </p>
  
        {/* Call to Action */}
        {loading ? (
          <div className="text-2xl">{t('homepage.loading')}</div>
        ) : (
          <button
            onClick={handleButtonClick}
            className="bg-[#5d5bff] hover:bg-[#7e7bff] text-white font-semibold text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            {isAuthenticated ? t('homepage.enterbutton') : t('homepage.accessbutton')}
          </button>
        )}
      </div>
    );
};

export default HomePage;