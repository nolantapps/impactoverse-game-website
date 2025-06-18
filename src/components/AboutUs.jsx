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
    <section className={`${isDarkMode ? 'bg-dark-gradient-img text-white' : 'bg-light-gradient-img text-gray-900'} bg-cover bg-no-repeat py-[8rem]`}>
      <div className={`max-w-7xl  mx-auto px-6 md:px-12 lg:px-20 space-y-32`}>

        {/* Hero Section */}
        <div className={`relative z-[0] rounded-xl ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'} flex flex-col md:flex-row items-center md:items-start pt-16 px-6 md:px-16 lg:px-32 gap-10`}>
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-left">
            <h1 className={`text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
              {t('aboutUs.headline')}
            </h1>
            <p className="text-xl md:text-2xl mt-4">
              {t('aboutUs.subtitle')}
            </p>
          </div>

          {/* Image Content */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src={CustomImage}
              alt="Custom Hand Image"
              className="w-48 xl:w-80 object-contain"
            />
          </div>
        </div>


        {/* Focus Areas */}
        <div className="text-center space-y-12">
          <h2 className="text-4xl font-bold">{t('aboutUs.focusArea')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { title: t('aboutUs.engagement'), note: t('aboutUs.engagementNote') },
              { title: t('aboutUs.awareness'), note: t('aboutUs.engagementNote') },
              { title: t('aboutUs.connection'), note: t('aboutUs.connectionNote') },
              { title: t('aboutUs.action'), note: t('aboutUs.actionNote') }
            ].map((item, i) => (
              <div
                key={i}
                className={`${isDarkMode ? 'bg-[#2E2E3E]' : 'bg-white'} rounded-2xl p-6 shadow-md`}
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm">{item.note}</p>
              </div>
            ))}
          </div>
          <button className="mt-10 px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
            {t('aboutUs.getInvolved')}
          </button>
        </div>

        {/* Mission Section */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <div
            className="h-96 bg-cover bg-center flex items-end p-10"
            style={{ backgroundImage: `url('/pictures/aboutUs.png')` }}
          >
            <div className="bg-black bg-opacity-60 p-6 rounded-xl text-white max-w-xl">
              <h2 className="text-3xl font-bold">{t('aboutUs.ourMission')}</h2>
              <p className="mt-2 text-lg">{t('aboutUs.ourMissionNote')}</p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-24 px-6 md:px-16 lg:px-32 text-center">
          <h2 className={`text-5xl md:text-6xl font-bold mb-16 ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
            {t('aboutUs.ourVision')}
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {['aboutUs.vision1', 'aboutUs.vision2'].map((item, index) => (
              <div key={index} className="rounded-2xl overflow-hidden shadow-lg">
                <div
                  className="h-96 bg-cover bg-center flex items-end p-10"
                  style={{ backgroundImage: `url('/pictures/${index + 1}.png')` }}
                >
                  <div className="bg-black bg-opacity-60 p-6 rounded-xl text-white max-w-xl">
                    <p className="mt-2 text-lg">{t(item)}</p>
                  </div>
                </div>
              </div>

            ))}
          </div>
        </div>




        {/* Advisors Section */}
        <div className="text-center space-y-12">
          <h2 className="text-4xl font-bold">{t('aboutUs.advisor')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ['Priya Guliani', 'EMEA Regional Director, GBA'],
              ['Noleen Mariappen', 'Founder & CEO'],
              ['Kala Philo', 'Editor, TechRenews Newsletter'],
              ['Dr. Reginald Parker', 'Founder - Optimal Tech'],
              ['Karina Murray', 'Founder & CEO, Aunua Global'],
              ['Mike Johns', 'CEO, Digital Mind State']
            ].map(([name, role], index) => (
              <div
                key={index}
                className={`${isDarkMode ? 'bg-[#2E2E3E]' : 'bg-white'} rounded-xl p-6 shadow-md flex flex-col items-center`}
              >
                <img
                  src={`/pictures/advisor${index + 1}.png`}
                  alt={name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-center">{role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link to="/">
            <button className="px-8 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
              {t('aboutUs.joinOurMission')}
            </button>
          </Link>
        </div>
      </div>
    </section>



  );
};

export default AboutUs;
