import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
export default function Footer() {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation(); 
  const footerClasses = isDarkMode 
    ? "bg-[#1E034B]" 
    : "bg-[#C7DDEA]";  // Light mode background set to white

  const linkClasses = isDarkMode
    ? "text-gray-300 hover:text-white"
    : "text-black hover:text-pink-700";  // Light mode text set to black

  const socialIconClasses = isDarkMode
    ? "text-white hover:text-gray-300"
    : "text-black hover:text-pink-700";  // Light mode text set to black

  const inputClasses = isDarkMode
    ? "border-white text-white placeholder-gray-400 focus:ring-white"
    : "border-indigo-600 text-gray-700 placeholder-gray-500 focus:ring-pink-400";  // Light mode text color set to black

  const buttonClasses = isDarkMode
    ? "bg-white text-purple-700 hover:bg-gray-100"
    : "bg-indigo-600 text-white hover:bg-pink-600";  // Button stays the same

  const copyrightClasses = isDarkMode
    ? "text-gray-300"
    : "text-black";  // Light mode copyright text set to black

  return (
    <footer className={`${footerClasses} px-4 py-8 md:p-6 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex flex-col space-y-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center space-y-8 md:space-y-4 
                        lg:flex-row lg:items-start lg:justify-between">
          
          {/* Links and Social Section */}
          <div className="flex flex-col items-center space-y-6 
                          lg:items-start">
            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm
                          sm:space-x-8">
              <Link to='/'>
                <button className={`${linkClasses} transition-colors`}>{t('footer.home')}</button>
              </Link>
              <a href="#" className={`${linkClasses} transition-colors`}>{t('footer.partner')}</a>
              <Link to ='/aboutUs'>
              <a href="#" className={`${linkClasses} transition-colors`}>{t('footer.aboutUs')}</a>
              </Link>
              <Link to='Terms'>
                <span className={`${linkClasses} transition-colors`}>{t('footer.terms')}</span>
              </Link>
            </div>
            
            {/* Social Icons */}
            <div className="flex flex-wrap justify-center gap-6">
              {/* Instagram */}
              <a href="#" className={`${socialIconClasses} transition-colors`}>
                <img 
                  src="/icons/instagram.svg" 
                  alt="Instagram" 
                  className={`w-6 h-6 ${isDarkMode ? '' : 'filter brightness-50'}`} 
                />
              </a>
              {/* Facebook */}
              <a href="#" className={`${socialIconClasses} transition-colors`}>
                <img 
                  src="/icons/facebook.svg" 
                  alt="Facebook" 
                  className={`w-6 h-6 ${isDarkMode ? '' : 'filter brightness-50'}`} 
                />
              </a>
              {/* TikTok */}
              <a href="#" className={`${socialIconClasses} transition-colors`}>
                <img 
                  src="/icons/tiktok.svg" 
                  alt="TikTok" 
                  className={`w-6 h-6 ${isDarkMode ? '' : 'filter brightness-50'}`} 
                />
              </a>
              {/* Discord */}
              <a href="#" className={`${socialIconClasses} transition-colors`}>
                <img 
                  src="/icons/discord.svg" 
                  alt="Discord" 
                  className={`w-6 h-6 ${isDarkMode ? '' : 'filter brightness-50'}`} 
                />
              </a>
              {/* Twitter */}
              <a href="#" className={`${socialIconClasses} transition-colors`}>
                <img 
                  src="/icons/twitter.svg" 
                  alt="Twitter" 
                  className={`w-6 h-6 ${isDarkMode ? '' : 'filter brightness-50'}`} 
                />
              </a>
            </div>
          </div>

          {/* Subscribe Section */}
          <div className="w-full max-w-md px-4 md:px-0 lg:w-auto">
            <div className="flex flex-col space-y-4 
                          sm:flex-row sm:space-y-0 sm:space-x-2">
              <input
                type="email"
                placeholder={t('footer.email')}
                className={`flex-1 px-4 py-2 rounded-full bg-transparent 
                          border ${inputClasses}
                          text-sm outline-none
                          focus:ring-2 focus:ring-opacity-50
                          transition-colors duration-300`}
              />
              <button className={`${buttonClasses} px-6 py-2 
                               rounded-full font-medium text-sm
                               transition-colors duration-300
                               whitespace-nowrap`}>
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={`text-center lg:text-right ${copyrightClasses} text-sm 
                        transition-colors duration-300`}>
       {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
