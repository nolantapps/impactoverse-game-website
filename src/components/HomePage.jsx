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
    ? 'bg-dark-gradient'
    : 'bg-light-gradient'

  const buttonClasses = isDarkMode
    ? "bg-btn-color hover:bg-indigo-700"
    : "bg-indigo-600 hover:bg-btn-color";

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
    <div 
      className={`min-h-screen ${backgroundStyle} flex flex-col items-center justify-center text-center transition-all duration-300`}
      
    >
      <div className="mb-8">
        <img 
          src="/pictures/globe.png"
          alt="Logo"
          className={`w-80 h-80 transition-all duration-300 ${
            !isDarkMode ? 'filter brightness-75' : ''
          }`}
        />
      </div>
      
      <h1 className={`${textClasses} text-4xl md:text-6xl font-bold mb-4 transition-colors duration-300`}>
      {t('homepage.mainline')}<br/>
      </h1>
      
      <p className={`${subtitleClasses} text-lg md:text-xl mb-8 transition-colors duration-300`}>
        {t('homepage.mainline2')}
      </p>
      
      {loading ? (
        <div className={`${textClasses} text-2xl transition-colors duration-300`}>
          {t('homepage.loading')}
        </div>
      ) : (
        <button 
          onClick={handleButtonClick}
          className={`${buttonClasses} ${textClasses} ${textClasses2} font-medium py-3 px-6 rounded-full flex items-center transition-all duration-300`}
        >
          {isAuthenticated ? t('homepage.enterbutton') : t('homepage.accessbutton')}
          <span className="ml-2">➡️</span>
        </button>
      )}
    </div>
  );
};

export default HomePage;