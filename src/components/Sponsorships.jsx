// src/components/HomePage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import datastore from './DataStore';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
import Cookies from 'js-cookie';

const Sponsorships = () => {
  const [projects,setProjects] = useState([]);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const fetchPlans = async()=>{
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${Cookies.get('token')}`
      };
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/sponsor/projects`, {
        method: 'GET',
        headers: headers,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(responseData)}`);
      }
      setProjects(responseData?.data.projects);
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  }

  useEffect(()=>{
    fetchPlans()
  },[])




  const backgroundStyle = isDarkMode
    ? 'bg-dark-gradient-img'
    : 'bg-light-gradient-img'

  const glassEffect =
    isDarkMode
      ? "bg-dark-primary backdrop-blur-xl"
      : "bg-light-primary backdrop-blur-xl";

  const textColor = isDarkMode ? "text-white" : "text-black";



  return (
    <div className={`min-h-screen ${backgroundStyle} bg-cover bg-no-repeat py-[8rem] `}>
      {/* Top Introduction Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
  {/* Text Section */}
  <div>
    <h2 className="text-3xl sm:text-4xl font-bold font-calSans text-gray-900 dark:text-white mb-6">
      Why Sponsor a Project?
    </h2>
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
      Every project in the World of Impact is a launchpad for change. When you sponsor a project, you're not just funding a platform — you're unlocking the imagination of young changemakers and funding their real-world ideas.
    </p>
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
      From climate clean-ups to youth-led enterprises, your support fuels action that ripples out into homes, schools, and communities. You empower learners to apply their creativity, lead change, and build solutions that matter.
    </p>
    <p className="text-lg text-gray-700 dark:text-gray-300">
      Sponsorship makes innovation accessible — removing financial barriers and opening doors to learning, leadership, and lifelong impact.
    </p>
  </div>

  {/* Image */}
  <div className="w-full h-full">
    <img
      src="/pictures/globex2.png"
      alt="Why Sponsor a Project"
      className="w-full h-3/4  object-cover"
    />
  </div>
</section>
<section className="bg-light-background dark:bg-dark-background py-24 px-6">
  <div className="max-w-7xl mx-auto text-center mb-16">
    <h2 className="text-3xl sm:text-4xl font-bold font-calSans text-gray-900 dark:text-white mb-4">
      What Does the Platform Give Access To?
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
      The World of Impact platform is more than a learning tool — it’s a collaborative launchpad for meaningful action, real-world skills, and empowered communities.
    </p>
  </div>

  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-left">
    {[
      {
        title: "Gamified Learning Quests",
        desc: "Interactive missions tied to real-world issues like clean energy, biodiversity, and social equity.",
      },
      {
        title: "Multiplayer & Collaboration Tools",
        desc: "Work together on challenges, co-create solutions, and build teamwork through play.",
      },
      {
        title: "Peer Learning & Safe Social Space",
        desc: "Moderated environments with chat and messaging to learn from peers worldwide.",
      },
      {
        title: "Project Design Tools",
        desc: "Create, pitch, and lead community impact ideas through a guided process.",
      },
      {
        title: "Presentation & Portfolio Features",
        desc: "Showcase your progress and impact with presentations and digital storytelling.",
      },
      {
        title: "Global & Local Opportunity Feed",
        desc: "Access change-making opportunities — from global campaigns to neighborhood projects.",
      },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-[#f5f8fa] dark:bg-[#0f1435] p-6 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{item.title}</h3>
        <p className="text-base text-gray-700 dark:text-gray-300">{item.desc}</p>
      </div>
    ))}
  </div>
</section>

      {/* Project Grid */}
      <div className='py-10'>
        <h2 className={`text-3xl font-semibold text-center text-gray-900 dark:text-white mb-4`}>
          Sponsor Projects
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((offer) => (
          <div
            key={offer._id}
            className={`rounded-2xl p-6 bg-[#f5f8fa] dark:bg-[#0f1435] text-gray-800 dark:text-white transition cursor-pointer ${glassEffect}`}
            onClick={() => navigate(`/go-sponsor/${offer._id}`)}
          >
            {/* Image Container with Relative Positioning */}
            <div className="relative mb-10">
              <img
                src={offer.gallery[0].url}
                alt={offer.title}
                className="w-full h-36 object-cover rounded-xl"
              />

              {/* Overlapping Avatar */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <img
                  src={offer.avatar}
                  alt={`${offer.title} avatar`}
                  className="w-24 h-24 rounded-full border-2 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <h2 className={`text-xl font-bold mb-2 text-center mt-4 ${textColor}`}>{offer.title}</h2>
            <p className={`text-sm opacity-80 text-center ${textColor}`}>
              {offer.description.substring(0, 70).concat("...")}
            </p>

            {/* CTA */}
            <div className="flex justify-center mt-4">
              <button className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-semibold px-4 py-2 rounded-full transition">
                View Project
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>


  );
};

export default Sponsorships;