import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import './i18n';

const AgeVerification = () => {
  const { t } = useTranslation(); 
  const [isChecked, setIsChecked] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const toggleCheckbox = () => setIsChecked(prev => !prev);

  const handleInfoClick = () => {
    toggleCheckbox();
    setShowInfoPopup(true);
  };

  const handleCloseClick = () => {
    navigate(-1);
  };

  const mainModalBg = isDarkMode
    ? "bg-gradient-to-r from-indigo-900 to-purple-900 text-white"
    : "bg-white text-black";

  const closeButtonClasses = isDarkMode
    ? "text-white hover:text-white"
    : "text-black hover:text-black";

  const checkboxClasses = isDarkMode
    ? "text-black bg-white border-purple-500 accent-white"
    : "text-black bg-white border-pink-500 accent-white";

  const infoIconClasses = isDarkMode
    ? "text-indigo-600"
    : "text-indigo-600";

  const proceedButtonClasses = isDarkMode
    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
    : "bg-indigo-500 hover:bg-indigo-700 text-white";

  const linkClasses = isDarkMode
    ? "text-purple-400 hover:underline"
    : "text-indigo-600 hover:underline";

  const dividerTextClasses = isDarkMode
    ? "text-white"
    : "text-black";

  const dividerLineClasses = isDarkMode
    ? "border-gray-500"
    : "border-gray-300";

  const infoPopupBg = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-black";

  const infoPopupCloseButton = isDarkMode
    ? "text-white hover:text-white"
    : "text-black hover:text-black";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-md p-8 ${mainModalBg} rounded-lg shadow-lg transition-colors duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={`absolute top-3 right-3 ${closeButtonClasses} transition-colors duration-300`}
          onClick={handleCloseClick}
          aria-label="Close age verification screen"
        >
          <X size={24} />
        </button>

        <h1 className={`text-3xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('age.authentication')}</h1>
        <p className={`text-lg mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('age.subtitle')}</p>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="ageCheck"
            checked={isChecked}
            onChange={toggleCheckbox}
            className={`w-6 h-6 ${checkboxClasses} rounded-lg focus:ring-0 transition-colors duration-300`}
            style={{ backgroundColor: 'white', accentColor: 'black' }}
            aria-label="Age verification checkbox"
          />
          <label htmlFor="ageCheck" className={`ml-3 text-xl flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {t('age.checkbox')}{' '}
            <FaInfoCircle 
              className={`ml-2 ${infoIconClasses} cursor-pointer transition-colors duration-300`}
              onClick={handleInfoClick}
              aria-label="Information about age restriction"
            />
          </label>
        </div>

        {isChecked && (
          <Link to="/login">
            <button className={`w-full ${proceedButtonClasses} font-semibold py-2 px-4 rounded-lg mb-8 transition-colors duration-300`}>
              {t('age.proceedToLogin')}
            </button>
          </Link>
        )}

        <p className={`text-sm mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
          {t('age.subtitle2')}{' '}
          <Link to="/auth" className={linkClasses}>
            {t('age.access')}
          </Link>
        </p>

        {/* <div className="flex items-center space-x-4 mt-4">
          <div className={`flex-1 border-t ${dividerLineClasses}`}></div>
          <p className={`${dividerTextClasses} text-sm`}>{t('age.login')}</p>
          <div className={`flex-1 border-t ${dividerLineClasses}`}></div>
        </div> */}

        <div className="flex justify-center mt-4">
          <img 
            src="/pictures/logoRm.png" 
            alt="Custom image" 
            className="ml-10 w-full h-32" 
          />
        </div>
      </div>

      {/* Info Popup */}
      {showInfoPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setShowInfoPopup(false)}
        >
          <div 
            className={`relative w-full max-w-md p-6 ${infoPopupBg} rounded-lg shadow-lg transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className={`absolute top-3 right-3 ${infoPopupCloseButton} transition-colors duration-300`}
              onClick={() => setShowInfoPopup(false)}
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('age.whyAge')}</h2>
            <p className={isDarkMode ? 'text-white' : 'text-black'}>
              {t('age.agelimit')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeVerification;