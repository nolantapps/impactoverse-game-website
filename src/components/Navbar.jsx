import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import datastore from './DataStore';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import './i18n';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!datastore.getToken());
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  useEffect(() => {
    const handleAuthStateChange = (event) => {
      setIsAuthenticated(event.detail.isAuthenticated);
    };

    window.addEventListener('authStateChange', handleAuthStateChange);

    return () => {
      window.removeEventListener('authStateChange', handleAuthStateChange);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!datastore.getToken());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu()
    }
  }, [navigate])

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    datastore.logout()

    setIsAuthenticated(false);
    navigate('/');
  };

  const HamburgerIcon = () => (
    <div className="space-y-1.5">
      <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}></span>
      <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}></span>
      <span className={`block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}></span>
    </div>
  );

  const CloseIcon = () => (
    <div className="relative w-6 h-6">
      <span className={`absolute top-2.5 block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} rotate-45`}></span>
      <span className={`absolute top-2.5 block w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} -rotate-45`}></span>
    </div>
  );

  const navClasses = isDarkMode ? 'bg-[#1E034B]' : 'bg-[#C7DDEA] shadow-md';
  const textClasses = isDarkMode ? 'text-white' : 'text-gray-800';
  const borderClasses = isDarkMode ? 'border-white' : 'border-gray-800';
  const hoverClasses = isDarkMode ? 'hover:text-pink-500' : 'hover:text-pink-600';
  const mobileMenuBg = isDarkMode ? 'bg-[#131740]' : 'bg-gray-100';
  const authNavSize = isAuthenticated ? 'w-[40%]' : 'w-[43%]';

  return (
    <nav className={`${navClasses} p-4 relative transition-colors duration-300`}>
      <div className="flex justify-between items-center max-w-[90rem] mx-auto relative">
        <Link to="/">
          <div className="flex items-center">
            <img
              src="/pictures/logoRm.png"
              alt="Impactoverse Logo"
              className="h-8 mr-2"
            />
          </div>
        </Link>

        <button
          className={`lg:hidden ${textClasses} p-2`}
          onClick={() => toggleMenu()}
        >
          {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 font-bold top-14 z-10">
          <Link to="/">
            <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.home')}</button>
          </Link>
          {
            isAuthenticated && (
              <Link to="/map">
                <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.map')}</button>
              </Link>
            )
          }

          {/* <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.partner')}</button> */}
          <Link to="/aboutUs">
            <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.aboutUs')} </button>
          </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full flex items-center space-x-2`}
            >
              <img src={`/icons/ic-flag-${i18n.language.toLowerCase()}.svg`} className='w-6' />
              <span>{i18n.language.toUpperCase()}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div className={`absolute right-0 mt-2 py-2 w-24 rounded-md shadow-lg z-20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                {['EN', 'FR'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang.toLowerCase())}
                    className="block px-4 justify-center items-center flex py-2 text-sm w-full text-left hover:bg-gray-200"
                  >
                    <img src={`/icons/ic-flag-${lang.toLowerCase()}.svg`} className='w-6 mr-4' />
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => navigate("avatar")}
                className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full flex items-center space-x-2`}
              >
                <span>Avatar</span>
              </button>
            </div>
          )}

          {isAuthenticated ? (
            <div className="relative">
              <button
                className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full flex items-center space-x-2`}
                onClick={() => toggleMenu()}
              >
                <span>Hi </span>
                <span>{datastore.getDisplayName()?.substring(0, 15) + (datastore.getDisplayName()?.length > 15 ? "..." : "")} </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isMenuOpen && (
                <div className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                  <button
                    onClick={() => window.location.href = "/dashboard/"}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                  >
                    {t('navbar.dashboard')}
                  </button>

                  <Link to='/change'>
                    <button
                      onClick={() => navigate('/change')}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                    >
                      {t('navbar.changePassword')}
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                  >
                    {t('navbar.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/age">
              <button className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full`}>
                {t('navbar.login')}
              </button>
            </Link>
          )}

          {/* <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-[#C7DDEA ] text-gray-800'} border ${borderClasses}`}
          >
            {isDarkMode ? '🌞' : '🌚'}
          </button> */}
          <label className="swap swap-rotate">
            {/* This hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller hidden"
              checked={isDarkMode}
              onChange={toggleTheme} // Calls your toggleTheme function
            />



            {/* Moon icon */}
            <svg
              className="swap-off h-10 w-10 fill-current text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>

            {/* Sun icon */}
            <svg
              className="swap-on h-10 w-10 fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

          </label>

        </div>
      </div>

      {isMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 right-0 ${mobileMenuBg} border-t ${borderClasses} z-50`}>
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" onClick={closeMenu} className={`${textClasses} ${hoverClasses}`}>
              {t('navbar.home')}
            </Link>
            {/* <a href="#partner" onClick={closeMenu} className={`${textClasses} ${hoverClasses}`}>{t('navbar.partner')}</a> */}
            <Link to="/aboutUs" onClick={closeMenu}>
              <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.aboutUs')}</button>
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`border ${borderClasses} ${textClasses} px-4 py-2 rounded-full flex items-center justify-between w-full`}
              >
                <span>{i18n.language.toUpperCase()}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              {isLanguageDropdownOpen && (
                <div className={`mt-2 py-2 rounded-md shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                  {['EN', 'FR'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        changeLanguage(lang.toLowerCase());
                        closeMenu();
                      }}
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-200"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {
              isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => navigate("/avatar")}
                    className={`border ${borderClasses} ${textClasses} px-4 py-2 rounded-full flex items-center justify-between w-full`}
                  >
                    <span>Avatar</span>
                  </button>
                </div>
              )
            }

            {isAuthenticated ? (
              <button
                onClick={() => { handleLogout(); closeMenu(); }}
                className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full w-full`}
              >
                {t('navbar.logout')}
              </button>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <button className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full w-full`}>
                  {t('navbar.login')}
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="hidden lg:flex relative w-full mt-6 items-center justify-center">
        <div className={`h-[1px] ${isDarkMode ? 'bg-white' : 'bg-gray-800'} ${authNavSize}`}></div>
        <div className={`w-[20px] h-[1px] ${isDarkMode ? 'bg-white' : 'bg-gray-800'} rotate-45 transform origin-bottom-left -ml-[1px]`}></div>
        <div className={`w-[400px] h-[1px] mt-6 ${isDarkMode ? 'bg-white' : 'bg-gray-800'}`}></div>
        <div className={`w-[20px] h-[1px] ${isDarkMode ? 'bg-white' : 'bg-gray-800'} -rotate-45 transform origin-bottom-right -mr-[1px]`}></div>
        <div className={`h-[1px] ${isDarkMode ? 'bg-white' : 'bg-gray-800'} ${authNavSize}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;
