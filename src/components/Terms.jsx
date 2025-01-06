import React from 'react';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';

function Terms() {
  const {t} = useTranslation();
  const { isDarkMode } = useTheme();

  return (
    <div className={`${isDarkMode ? 'bg-[#1E034B] text-white' : 'bg-[#C7DDEA] text-black'} py-12 px-6 md:px-24 lg:px-48`}>
      {/* Main Title */}
      <h1 className={`text-5xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-[#333]'}`}>
       {t('terms.privacyPolicy.title')}
      </h1>
      
      {/* Privacy Policy Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4"> {t('terms.privacyPolicy.mainTitle')}</h2>
        <p className="text-base leading-relaxed">
        {t('terms.privacyPolicy.content')}
        </p>
      </section>

      {/* Collection of Data Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('terms.dataCollection.title')}</h2>
        <p className="text-base leading-relaxed">
        {t('terms.dataCollection.content')}
        </p>
      </section>

      {/* Users' Information Collection */}
      <section id="user-information-collection">
        <h2>2.1 {t('terms.userInformationCollection.title')}</h2>
        <p>
        {t('terms.userInformationCollection.content')}
        </p>
        <ul>
        {t('terms.userInformationCollection.list', {returnObjects: true})}
        </ul>
      </section>

      {/* Automatic Information Collection */}
      <section id="automatic-information-collection">
        <h2>{t('terms.automaticInformationCollection.title')}</h2>
        <p>
          {t('terms.automaticInformationCollection.content')}
        </p>
        <p>
        {t('terms.automaticInformationCollection.note')}
        </p>
      </section>

      {/* Cookies Policy */}
      <section id="cookie-policy">
        <h2>3. {t('terms.cookiePolicy.title')}</h2>
        <p>
         {t('terms.cookiePolicy.content')}
        </p>
        <h3>{t('terms.cookiePolicy.typesOfCookies')}</h3>
        <p>
          {t('terms.cookiePolicy.types.session')}
        </p>
        <p>
        {t('terms.cookiePolicy.types.permanent')}
        </p>
        <p>{t('terms.cookiePolicy.title2')}</p>
        <ul>
          {t('terms.cookiePolicy.uses', {returnObjects: true})}
        </ul>
        <p>
         {t('terms.cookiePolicy.disclaimer')}
        </p>
      </section>

      {/* Privacy Policy Sections */}
      {/* Additional privacy-related sections here */}
      <section id="privacy-policy">
        <h2>4. {t('terms.thirdPartyLinks.title')}</h2>
        <p>
        {t('terms.thirdPartyLinks.content')}
        </p>
        <p>
        {t('terms.cookiePolicy.disclaimer2')}
        </p>
        <h3>    {t('terms.cookiePolicy.thirdParty')}</h3> 
        <ul>
          {t('terms.thirdPartyLinks.services', {returnObjects: true})}
        </ul>
        <p>
         {t('terms.thirdPartyLinks.note')}
        </p>
        {/* Add more sections as needed for additional privacy details */}
      </section>
    </div>
  );
}

export default Terms;
