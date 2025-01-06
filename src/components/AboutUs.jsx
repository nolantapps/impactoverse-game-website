import React from 'react';
import CustomImage from '/pictures/globe.png';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
const AboutUs = () => {
  const { t } = useTranslation(); 
  const { isDarkMode } = useTheme();

  return (
    <section className={`${isDarkMode ? 'bg-[#1E034B] text-gray-100' : 'bg-[#C7DDEA] text-gray-900'}`}>
      {/* Top Section with Title and Image */}
      <div className="relative flex flex-col items-left pt-16 px-6 md:px-16 lg:px-32">
        <h1 className={`text-7xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
        {t('aboutUs.headline')}
        </h1>
        <p className="text-2xl mt-2">{t('aboutUs.subtitle')}</p>
        <img
          src={CustomImage}
          alt="Custom Hand Image"
          className="absolute top-0 right-20 w-32 md:w-48 lg:w-64"
        />
      </div>

      {/* Focus Area Section */}
      <div className="mt-24 px-6 md:px-16 lg:px-32 text-center">
        <h2 className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
        {t('aboutUs.focusArea')}
        </h2>
        {/* <div className="text-2xl flex flex-col md:flex-row justify-start mt-8 space-y-4 md:space-y-0 md:space-x-6">
          {['Engagement', 'Awareness', 'Connection', 'Action'].map((area, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-semibold">{area}</h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          ))}
        </div> */}
        <div className="text-2xl flex flex-col md:flex-row justify-start mt-8 space-y-4 md:space-y-0 md:space-x-6">
  <div className="space-y-2">
    <h3 className="font-semibold">{t('aboutUs.engagement')}</h3>
    <p className="text-sm">
    {t('aboutUs.engagementNote')}
    </p>
  </div>
  <div className="space-y-2">
    <h3 className="font-semibold">{t('aboutUs.awareness')}</h3>
    <p className="text-sm">
    {t('aboutUs.engagementNote')}
    </p>
  </div>
  <div className="space-y-2">
    <h3 className="font-semibold">{t('aboutUs.connection')}</h3>
    <p className="text-sm">
    {t('aboutUs.connectionNote')}
    </p>
  </div>
  <div className="space-y-2">
    <h3 className="font-semibold">{t('aboutUs.action')}</h3>
    <p className="text-sm">
    {t('aboutUs.actionNote')}
    </p>
  </div>
</div>
        <button className={`mt-6 px-8 py-3 rounded-full ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'} hover:bg-indigo-700`}>
        {t('aboutUs.getInvolved')}
        </button>
      </div>

      {/* Mission Section */}
      <div className="mt-24 px-6 md:px-16 lg:px-32">
        <div className="bg-cover bg-center h-96 rounded-lg overflow-hidden" style={{ backgroundImage: `url('/pictures/aboutUs.png')` }}>
          <div className="pt-60 pl-10 bg-gradient-to-b from-transparent text-white">
            <h2 className="text-3xl font-bold">  {t('aboutUs.ourMission')}</h2>
            <p className="mt-2 text-lg">
            {t('aboutUs.ourMissionNote')}
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="mt-24 px-6 md:px-16 lg:px-32 text-center">
        <h2 className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
        {t('aboutUs.ourVision')}
        </h2>
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((num) => (
            <div key={num} className={`${isDarkMode ? 'bg-[#2E2E3E] text-gray-200' : 'bg-gray-100 text-[#333]'} rounded-lg p-6 space-y-4`}>
              <img src={`/pictures/${num}.png`} alt={`Vision ${num}`} className="w-full h-40 object-cover rounded" />
              <h3 className="font-semibold">
                {num === 1
                  ? 'To create a platform at the intersection of profit and purpose where technology and creativity converge to drive real-world positive outcomes for people, the planet, and impact-aligned organizations.'
                  : 'To build a transformative platform that bridges profitability and purpose, merging innovation and creativity to generate impactful, real-world solutions that benefit people, preserve our planet, and empower mission-driven organizations.'}
              </h3>
            </div>
          ))}
        </div> */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className={`${isDarkMode ? 'bg-[#2E2E3E] text-gray-200' : 'bg-gray-100 text-[#333]'} rounded-lg p-6 space-y-4`}>
    <img src="/pictures/1.png" alt="Vision 1" className="w-full h-40 object-cover rounded" />
    <h3 className="font-semibold">
    {t('aboutUs.vision1')}
    </h3>
  </div>
  <div className={`${isDarkMode ? 'bg-[#2E2E3E] text-gray-200' : 'bg-gray-100 text-[#333]'} rounded-lg p-6 space-y-4`}>
    <img src="/pictures/2.png" alt="Vision 2" className="w-full h-40 object-cover rounded" />
    <h3 className="font-semibold">
    {t('aboutUs.vision2')}
    </h3>
  </div>
</div>
      </div>

      {/* Advisors Section */}
      <div className="mt-24 px-6 md:px-16 lg:px-32 text-center">
        <h2 className={`text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
        {t('aboutUs.advisor')}
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {['advisor1', 'advisor2', 'advisor3', 'advisor4', 'advisor5', 'advisor6'].map((advisor, index) => (
            <div key={index} className={`${isDarkMode ? 'bg-[#2E2E3E] text-gray-200' : 'bg-gray-100 text-[#333]'} rounded-lg p-6 space-y-4`}>
              <img src={`/pictures/${advisor}.png`} alt={`Advisor ${index + 1}`} className="w-full h-40 object-cover rounded" />
              <h3 className="font-semibold">{['Priya Guliani', 'Noleen Mariappen', 'Kala Philo', 'Dr. Reginald Parker', 'Karina Murray', 'Mike Johns'][index]}</h3>
              <p className="text-sm">{['EMEA Regional Director, GBA', 'Founder & CEO', 'Editor, TechRenews Newsletter', 'Founder - Optimal Tech', 'Founder & CEO, Aunua Global', 'CEO, Digital Mind State'][index]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-24 flex justify-center pb-16">
        <Link to='/'>
          <button className={`px-8 py-3 rounded-full ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'} hover:bg-indigo-700`}>
          {t('aboutUs.joinOurMission')}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
