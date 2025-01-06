import React, { useState } from 'react';
import { FaGoogle, FaFacebook, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { useTheme } from './ThemeContext'; // Import the theme context
import { useNavigate } from 'react-router-dom'; // To handle navigation
import  datastore from './DataStore';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
const Authentication = () => {
  const {t} = useTranslation();
  const [isVisible, setIsVisible] = useState(true);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [mainAccessCode, setMainAccessCode] = useState('');
  const [secondaryAccessCode, setSecondaryAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { isDarkMode } = useTheme(); // Access the dark/light theme state
  const navigate = useNavigate(); // Navigation hook

  const closePopup = () => {
    setIsVisible(false);
  };

  const closeInfoPopup = () => {
    setShowInfoPopup(false);
  };

  const handleAuthentication = async () => {
    try {
      console.log(mainAccessCode),
      console.log(secondaryAccessCode);
      const response = await fetch('https://impactoversefunctionapp.azurewebsites.net/api/GetAccessCode?code=H2CDZZ1lFT_zWfShjHsF9eQ7euYccg138idg5305by57AzFuQ__HDQ%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
      
        body: JSON.stringify({
          MainAccessCode: mainAccessCode,
          SecondaryAccessCode: secondaryAccessCode,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid codes or server error');
      }

     

    
       
        datastore.setToken('213xaskmfdkann44321f');
        datastore.setEmail('lorem@gmail.com');
        datastore.setDisplayName(mainAccessCode);
       
        sessionStorage.setItem('isChild',"true")
        console.log(response.id);
        // setSuccessMessage("Login successful! Redirecting...");
        setErrorMessage("");
        navigate('/');
      
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.'); 
    }
   
  };
  
  return (
    <>
      {isVisible && (
        <div
          className={`fixed inset-0 flex items-center justify-center 
            ${isDarkMode ? 'bg-black bg-opacity-50' : 'bg-gray-900 bg-opacity-30'} 
            backdrop-blur-sm`}
        >
          <div
            className={`relative w-full max-w-md p-8 
              ${isDarkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white' : 'bg-white text-black'} 
              rounded-lg shadow-lg space-y-6 transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closePopup}
              className={`absolute top-2 right-2 ${isDarkMode ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'}`}
            >
              <FaTimes size={20} />
            </button>

            <h1 className="text-4xl font-bold text-center">{t('auth.authentication')}</h1>

            <div className="flex justify-center items-center space-x-2 text-lg">
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{t('auth.accessCode')}</p>
              <FaInfoCircle
                className="cursor-pointer"
                onClick={() => setShowInfoPopup(true)}
              />
            </div>

            <p className="text-md font-semibold mt-4 text-center">{t('auth.thankyou')}</p>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-500'} text-sm text-center`}>
              {t('auth.proceed')}
            </p>

            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder={t('auth.mainAccess')}
                value={mainAccessCode}
                onChange={(e) => setMainAccessCode(e.target.value)}
                className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-500 bg-white text-black' : 'border-gray-300 bg-white text-black'} rounded-lg placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-300`}
              />
              <input
                type="text"
                placeholder={t('auth.secondaryAcces')}
                value={secondaryAccessCode}
                onChange={(e) => setSecondaryAccessCode(e.target.value)}
                className={`w-full px-4 py-3 border ${isDarkMode ? 'border-gray-500 bg-white text-black' : 'border-gray-300 bg-white text-black'} rounded-lg placeholder-gray-500 focus:outline-none focus:border-black transition-colors duration-300`}
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center text-sm mt-2">{errorMessage}</p>
            )}

            <button
              onClick={handleAuthentication}
              className={`w-full mt-6 py-3 rounded-lg font-semibold ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'} transition-colors duration-300`}
            >
              {t('auth.yes')}
            </button>

            {/* <div className="flex items-center space-x-4 mt-8">
              <div className={`flex-1 border-t ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}></div>
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{t('auth.orLogin')}</p>
              <div className={`flex-1 border-t ${isDarkMode ? 'border-gray-500' : 'border-gray-300'}`}></div>
            </div> */}
{/* 
            <div className="flex justify-center mt-4 space-x-8">
              <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-700'}`}>
                <FaGoogle size={32} />
                <p className="text-sm mt-1">Google</p>
              </button>
              <button className={`flex flex-col items-center ${isDarkMode ? 'text-gray-300 hover:text-purple-400' : 'text-gray-600 hover:text-purple-700'}`}>
                <FaFacebook size={32} />
                <p className="text-sm mt-1">Facebook</p>
              </button>
            </div> */}
            <div className="flex justify-center mt-4">
          <img 
            src="/pictures/logoRm.png" 
            alt="Custom image" 
            className="ml-10 w-full h-32" 
          />
        </div>
          </div>
        </div>
      )}

      {showInfoPopup && (
        <div
          className={`fixed inset-0 flex items-center justify-center 
            ${isDarkMode ? 'bg-black bg-opacity-70' : 'bg-gray-900 bg-opacity-50'}`}
        >
          <div
            className={`relative w-full max-w-md p-6 rounded-lg shadow-lg 
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} 
              transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeInfoPopup}
              className={`absolute top-2 right-2 ${isDarkMode ? 'text-white hover:text-gray-400' : 'text-black hover:text-gray-700'}`}
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4">{t('auth.whyAccess')}</h2>
            <p>
              {t('auth.why')}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
