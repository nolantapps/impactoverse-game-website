// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import datastore from './DataStore';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import { FaHeart, FaImages, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie'
import moment from 'moment';

const GoSponsorMe = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('why');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/sponsor/project/${id}`,{
          headers:{
            'Content-type':'application/json',
            'Authorization':`Bearer ${Cookies.get('token')}`
          }
        });
        const result = await response.json();
        setProject(result.data);
        console.log(result)
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      }
    };

    fetchProject();
  }, [id]);





  const backgroundStyle = isDarkMode
    ? 'bg-dark-gradient-img'
    : 'bg-light-gradient-img'

  const glassEffect =
    isDarkMode
      ? "bg-dark-primary backdrop-blur-xl"
      : "bg-light-primary backdrop-blur-xl";

  const textColor = isDarkMode ? "text-white" : "text-black";

  if (loading) {
    return <div className={`min-h-screen ${backgroundStyle} bg-cover bg-no-repeat flex items-center justify-center`}>
      <Spinner size={50} color="white" />
    </div>;
  }

  const ContentCard = ({ title, subtitle, body }) => (
    <div className="bg-white/10 rounded-xl p-6 shadow-md border border-white/20">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm opacity-70">{subtitle}</p>
      </div>
      <div className="text-base leading-relaxed">{body}</div>
    </div>
  );

  return (
    <div className={`min-h-screen h-auto ${backgroundStyle} bg-cover bg-no-repeat py-[8rem] px-4 flex flex-col items-center transition-none`}>
      {/* Profile Header */}
      <div className="text-center mb-12">
        <img
          src={project.avatar || 'https://placehold.co/400'}
          alt={project.title}
          className="w-40 h-40 mx-auto rounded-full border-4 border-white/30 mb-4 object-cover"
        />
        <h1 className={`text-4xl font-bold font-calSans text-gray-900 dark:text-white text-center mb-2`}>
          {project.title}
        </h1>
        <p className="text-lg text-center text-gray-600 dark:text-gray-300 max-w-6xl mx-auto mb-4">
          {project.description}
        </p>
      </div>

      {/* Glass Card with Tabs */}
      <div className={`w-full max-w-7xl ${glassEffect} p-6 md:p-10 rounded-2xl shadow-xl transition`}>
        {/* Tab Buttons */}
        <div className="flex justify-center gap-6 mb-8">
          {[
            { id: 'why', label: 'Who We Are', icon: <FaHeart /> },
            { id: 'gallery', label: 'Project Gallery', icon: <FaImages /> },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm
                transition
                ${activeTab === id
                  ? 'bg-purple-700 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-black/10 text-black hover:bg-black/20'
                }
              `}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'why' ? (
          <div className={`space-y-10 ${textColor}`}>
            <ContentCard
              title="Project Overview"
              subtitle={`Created: ${moment(project.createdAt).format("DD MMM YYYY")}`}
              body={
                <>
                  {project.description}
                  <p className="mt-2 text-sm opacity-80">
                    {project.closingRemarks}
                  </p>
                </>
              }
            />
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {project.gallery?.map((img, i) => (
              <div key={i} className="relative w-full overflow-hidden rounded-xl group break-inside-avoid">
                <img
                  src={img.url}
                  alt={`Gallery ${i}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-sm text-center">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full transition">
            Sponsor Now ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoSponsorMe;
