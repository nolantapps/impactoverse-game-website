import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import datastore from './DataStore';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import './i18n';

const Navbar2 = () => {
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

  const navClasses = isDarkMode ? 'bg-white/8 backdrop-blur-md' : 'bg-black/8 backdrop-blur-md';
  const textClasses = isDarkMode ? 'text-white' : 'text-gray-800';
  const borderClasses = isDarkMode ? 'border-dark-gradient' : 'border-black';
  const hoverClasses = isDarkMode ? 'hover:text-white' : 'hover:text-black';
  const mobileMenuBg = isDarkMode ? 'bg-dark-background' : 'bg-light-background';

  return (
    <nav className={`${navClasses} p-0 w-screen fixed z-20 transition-colors duration-300`}>
      <div className="mx-auto w-full px-10 lg:px-2">
        <div className="flex justify-between items-center py-4">
          {/* Left side: Logo and Primary Menu */}
          {/* Logo */}
          <Link to="/" class="w-1/4 lg:pl-20">
            <div className="flex items-center xl:ml-20">
              <img
                src={(isDarkMode?"/pictures/logoDm.png":"/pictures/logoRm.png")}
                alt="Impactoverse Logo"
                className="h-8 mr-2"
              />
            </div>
          </Link>

          {/* Primary Menu */}
          <div className="hidden lg:flex w-1/2 justify-center gap-8 ">
            <Link to="/">
              <button className={`${textClasses} ${hoverClasses} font-calSans font-semibold`}>{t('navbar.home')}</button>
            </Link>
            <Link to="/pricing">
              <button className={`${textClasses} ${hoverClasses} font-calSans font-semibold`}>{t('navbar.pricing')}</button>
            </Link>
            <Link to="/sponsorships">
              <button className={`${textClasses} ${hoverClasses} font-calSans font-semibold`}>{t('navbar.sponsorships')}</button>
            </Link>
            {
              isAuthenticated && (
                <Link to="/map">
                  <button className={`${textClasses} ${hoverClasses} font-calSans font-semibold`}>{t('navbar.map')}</button>
                </Link>
              )
            }

            {/* <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.partner')}</button> */}
            <Link to="/aboutUs">
              <button className={`${textClasses} ${hoverClasses} font-calSans font-semibold`}>{t('navbar.aboutUs')} </button>
            </Link>
          </div>


          {/* Right side: Theme Toggle, Free Trial, and Mobile Toggle */}
          <div className="flex items-center gap-6 w-1/4">
            {/* Theme Toggle */}

            <div className="hidden lg:flex items-center space-x-2">

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    className={`border ${borderClasses} ${textClasses} px-3 py-2 rounded-full flex items-center space-x-2 font-calSans `}
                    onClick={() => toggleMenu()}
                  >
                    <span>Hi </span>
                    <span>{datastore.getDisplayName()?.substring(0, 15) + (datastore.getDisplayName()?.length > 15 ? "..." : "")} </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg z-20 ${isDarkMode ? 'bg-dark-background text-white' : 'bg-white text-gray-800'}`}>
                      <button
                        onClick={() => navigate("avatar")}
                        className="block px-4 py-2 text-sm w-full hover:bg-[#1A1C30FF] font-calSans font-bold"
                      >
                        <div class="justify-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10" viewBox="0 0 32 32">
                          <path fill="#fff" d="M18.003 5.559a.67.67 0 0 0 .441.572l1.684.546a3.47 3.47 0 0 1 2.197 2.205l.548 1.683a.664.664 0 0 0 1.011.321a.66.66 0 0 0 .227-.28l.001-.003l.005-.01q.009-.013.01-.028l.12-.37l-.001-.003l.429-1.318a3.47 3.47 0 0 1 2.197-2.196l1.684-.547a.665.665 0 0 0 0-1.254l-.034-.008l-1.683-.547a3.47 3.47 0 0 1-2.198-2.196L24.094.444a.665.665 0 0 0-1.255 0l-.547 1.682l-.014.042a3.47 3.47 0 0 1-2.15 2.154l-1.684.547a.665.665 0 0 0-.441.69m9.928 6.294l.004-.001a1.9 1.9 0 0 0 .406-.692l.299-.918a.363.363 0 0 1 .684 0l.298.918a1.89 1.89 0 0 0 1.199 1.197l.918.299l.019.004a.362.362 0 0 1 0 .684l-.919.299a1.9 1.9 0 0 0-.937.688v.004q-.168.234-.26.509l-.3.918a.363.363 0 0 1-.684 0l-.3-.918a1.89 1.89 0 0 0-1.2-1.2l-.919-.3a.36.36 0 0 1-.225-.452a.4.4 0 0 1 .048-.097l.005-.007a.36.36 0 0 1 .175-.132l.919-.299a1.9 1.9 0 0 0 .77-.504M16 30C8.268 30 2 23.732 2 16S8.268 2 16 2c1.449 0 2.846.22 4.16.628a2 2 0 0 1-.52.272l-1.659.538a2.163 2.163 0 0 0-.036 4.092l1.72.559A1.97 1.97 0 0 1 20.9 9.336l.545 1.677c.146.436.426.816.8 1.083a2.16 2.16 0 0 0 2.466.023a1.86 1.86 0 0 0 1.027 2.628l.954.311q.082.029.143.091a.4.4 0 0 1 .095.154l.3.912a1.863 1.863 0 0 0 2.715 1.02C29.321 24.39 23.316 30 16 30m-4-15a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10-2a2 2 0 1 0-4 0a2 2 0 0 0 4 0M9.553 19.106a1 1 0 0 0-.447 1.341v.003l.002.002l.003.006l.008.015a3 3 0 0 0 .1.175c.065.107.16.252.286.42a6.8 6.8 0 0 0 1.183 1.213C11.79 23.163 13.508 24 16 24s4.21-.837 5.312-1.72a6.8 6.8 0 0 0 1.183-1.211a5 5 0 0 0 .363-.553l.012-.021l.011-.022l.008-.015l.003-.006l.002-.003v-.002a1 1 0 0 0-1.784-.902l-.004.007l-.034.058a3 3 0 0 1-.177.259c-.168.225-.44.536-.832.85C19.29 21.337 18.007 22 16 22s-3.29-.663-4.063-1.28a4.8 4.8 0 0 1-.832-.851a3 3 0 0 1-.21-.317l-.004-.007a1 1 0 0 0-1.338-.44" />
                        </svg>
                        <span class="text-lg">Avatar</span>
                        </div>
                        
                      </button>
                      <button
                        onClick={() => window.location.href = "/dashboard/"}
                        className="block px-4 py-2 text-sm w-full text-left hover:bg-[#1A1C30FF] font-calSans font-bold"
                      >
                        {t('navbar.dashboard')}
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm w-full text-left hover:bg-[#1A1C30FF] font-calSans font-bold"
                      >
                        {t('navbar.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/age" >
                  <button className={`border ${borderClasses} ${textClasses} px-6 py-2 rounded-full font-calSans font-bold`}>
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
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className={`${textClasses} px-4 py-2 rounded-full flex items-center space-x-2`}
                >
                  <img src={`/icons/ic-flag-${i18n.language.toLowerCase()}.svg`} className='w-7' />
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
            </div>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="items-end lg:hidden">
              <button onClick={() => toggleMenu(!isMenuOpen)}>
                {isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden absolute top-full left-0 right-0 ${mobileMenuBg} border-t ${borderClasses} z-100`}>
          <div className="flex flex-col space-y-4 p-4">
            <Link to="/" onClick={closeMenu} className={`${textClasses} ${hoverClasses}`}>
              {t('navbar.home')}
            </Link>
            <Link to="/pricing">
              <button className={`${textClasses} ${hoverClasses} font-calSans font-semibold`}>{t('navbar.pricing')}</button>
            </Link>
            <Link to="/map" onClick={closeMenu}>
              <button className={`${textClasses} ${hoverClasses}`}>{t('navbar.map')}</button>
            </Link>
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
    </nav>

  );
};

export default Navbar2;
