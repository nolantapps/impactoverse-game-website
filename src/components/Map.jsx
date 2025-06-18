import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DataStore from './DataStore';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import './i18n';

const Map = () => {
  const points = [
    {
      id: 2,
      name: "Point A",
      x: "37%", y: "43%",
      img: "/pictures/pointer.png",
      url: "game1",
      title: "Berthe's Brush at Bougival Game",
      description: ""
    },
    {
      id: 3,
      name: "Point ",
      x: "65%", y: "30%",
      img: "/pictures/dogpark_pointer.png",
      url: "game2",
      title: "The Dog Park",
      description: ""
    },
    {
      id: 4,
      name: "Turtle Game",
      x: "60%", y: "43%",
      img: "/pictures/TurtleGamePointer.png",
      url: "game3",
      title: "Turtle Game",
      description: ""
    }
  ];



  const { t, i18n } = useTranslation();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [avatar, setAvatar] = useState(false);
  const [modal, setModal] = useState(false);
  const [counter,setCounter] = useState(5);

  const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/config`, {
      headers: {
        "Authorization": `Bearer ${DataStore.getToken()}`
      }
    });

    if (!response.ok) {
      console.error("Failed to fetch data")
    }

    const data = await response.json();
    if (data.hasAvatar) {
      setAvatar(data.hasAvatar);
    }
  }

  useEffect(() => {
    fetchData();

    if (!DataStore.getToken()) {
      navigate("/");
    }
  });

  useEffect(() => {
    if (modal) {
      setCounter(5); // reset counter whenever modal opens
      const timer = setInterval(() => {
        setCounter(prev => {
          if (prev === 1) {
            clearInterval(timer);
            navigate('/avatar?status=first');
          }
          return prev - 1;
        });
      }, 1000); // 1-second countdown

      return () => clearInterval(timer); // cleanup on modal close
    }
  }, [modal]);

  const textClasses = isDarkMode ? 'text-white' : 'text-gray-800';

  const mainModalBg = isDarkMode
    ? "bg-gradient-to-r from-indigo-900 to-purple-900 text-white"
    : "bg-white text-black";


  return (
    <div className="flex min-h-screen">
      
      {/* Map Image */}

      <div className='relative'>
        {
          modal && (
            <>
              <div className="fixed inset-0 z-10 flex items-center justify-center">
                {/* Background Overlay */}
                <div className={`absolute inset-0 bg-gray-${isDarkMode ? "950" : "100"} opacity-75`} />

                {/* Modal */}
                <div
                  className={`relative w-full max-w-lg p-8 ${mainModalBg} rounded-lg shadow-lg transition-colors duration-300`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h1 className={`text-3xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('modal.redirect')}...</h1>
                  <div className='flex justify-center'>
                    <p className={`text-lg mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('modal.redirect_warning')}</p>

                  </div>

                  
                  <div>
                    <p className={`text-sm text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {t('modal.redirect_message')}{' '} <b>{counter}</b>
                    </p>
                  </div>

                  <div className="flex justify-center mt-2">
                    <img
                      src="/pictures/logoRm.png"
                      alt="Custom image"
                      className="mt-10 w-full h-30"
                    />
                  </div>
                </div>
              </div>
            </>
          )
        }
        <img
          src="/pictures/map.png" // Replace with your map image
          alt="Map"
          className="w-screen h-full object-cover z-[0]"
        />

        {points.map((point) => (
          <div
            key={point.id}
            className="absolute z-[10]"
            style={{ top: point.y, left: point.x }}
            onMouseEnter={() => setHoveredPoint(point.id)}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <button onClick={() => (avatar ? navigate(`/${point.url}`) : setModal(true))}>
              <img
                src={point.img}
                alt={point.name}
                className="w-18 h-20 transform transition-transform duration-300 scale-100 hover:scale-110"
              />
            </button>

            {/* Tooltip Info Box */}
            {hoveredPoint === point.id && (
              <div
                className={`absolute -top-12 left-1/2 transform -translate-x-1/2
             text-black text-xs px-3 py-2 shadow-lg z-10 whitespace-normal w-[180px] overflow-hidden
            rounded-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
              >
                <span className={`text-sm font-bold block truncate ${textClasses}`}>{point.title}</span>
                {point.description && (
                  <p className="mt-1 text-sm line-clamp-2">{point.description}</p>
                )}
              </div>

            )}
          </div>
        ))}
      </div>

    </div>
  );
}

export default Map;