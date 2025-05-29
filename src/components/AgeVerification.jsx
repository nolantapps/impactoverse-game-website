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
    ? "text-black rounded bg-white border-purple-500 accent-white w-5 h-5 appearance-none checked:bg-purple-500 checked:border-0"
    : "text-black rounded bg-gray-200 border-pink-500 accent-white w-5 h-5 appearance-none checked:bg-pink-500 checked:border-0";

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
    ? "bg-white text-black"
    : "bg-gradient-to-r from-indigo-900 to-purple-900 text-white";

  const infoPopupCloseButton = isDarkMode
    ? "text-black hover:text-black"
    : "text-white hover:text-white";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
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
          <div class="inline-flex items-center">
            <label class="flex items-center cursor-pointer relative" for="ageCheck">
              <input type="checkbox"
                checked={isChecked}
                onChange={toggleCheckbox}
                class={`peer cursor-pointer rounded shadow hover:shadow-md ${checkboxClasses}`}
                id="ageCheck" />
              <span class={`absolute text-${(isDarkMode ? "white" : "black")} opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                  stroke="currentColor" stroke-width="1">
                  <path fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </label>
          </div>

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
            className="mt-10 w-full h-30"
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

            <h2 className={`text-2xl font-semibold mb-4 ${!isDarkMode ? 'text-white' : 'text-black'}`}>{t('age.whyAge')}</h2>
            <p className={!isDarkMode ? 'text-white' : 'text-black'}>
              {t('age.agelimit')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeVerification;