import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import './i18n'
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';
import { X } from 'lucide-react';
import DataStore from './DataStore';
import { Spinner } from 'react-activity';
import Cookies from 'js-cookie';
import ScreenTimeTracker from '../ScreenTracker';

const UnityWebGLDogParkComponent = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef(null);
  const [screenLoading,setScreenLoading] = useState(false);
  const [redirectAvatar,setRedirectAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [checkboxPopup, setCheckBoxPopUp] = useState(false);
  const [checkboxPopup2, setCheckBoxPopUp2] = useState(false);
  const [mainAccessCode, setMainAccessCode] = useState('');
  const [secondaryAccessCode, setSecondaryAccessCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const loadingMessages = [
      "Syncing brush strokes...",
      "Warming up colors...",
      "Loading inspiration...",
      "Mixing paints and pixels...",
      "Summoning art spirits..."
    ];
    const [currentMessage, setCurrentMessage] = useState(loadingMessages[0]);


  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  useEffect(() => {
    if (!DataStore.getToken()) {
      navigate("/")
    }
  })

  useEffect(() => {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 10000);
  
      return () => clearTimeout(timer);
    }, []);
  
    
  
    useEffect(() => {
      let messageIndex = 0;
    
      const interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setCurrentMessage(loadingMessages[messageIndex]);
      }, 2000); // change message every 2s
    
      return () => clearInterval(interval);
    }, []);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);

    if (!isChecked === true) {
      setTimeout(() => {
        setCheckBoxPopUp(false);
      }, 1500);

    }
  }

  const handleFetchPlayerData = async()=>{
    const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/unity`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DataStore.getToken()}`
      },
      body:JSON.stringify({
        userId:DataStore.getUserId()
      })
    });

    if(!response.ok){
      //setScreenLoading(false)
        console.log("Something went wrong")
    }
    const data = await response.json();
    if(data.data){
      setScreenLoading(false);
    }else{
      setScreenLoading(false);
      setRedirectAvatar(true);
    }

  }

  useEffect(() => {
    if (DataStore.getIsChild()) {
      setCheckBoxPopUp(false)
    }
    // handleFetchPlayerData()
  })

  const handleAuthentication = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/auth/loginWithCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primary: mainAccessCode,
          secondary: secondaryAccessCode,
        }),
      });

      if (!response.ok) {
        setLoading(false)
        throw new Error('Invalid codes');
      }

      const data = await response.json();

      Cookies.set("access-token", data.token, { domain: '.ourworldofimpact.com' })
      DataStore.setToken(data.token);

      DataStore.setDisplayName(mainAccessCode);
      DataStore.setGameId(data.gameId);
      DataStore.setPrimaryCode(mainAccessCode);
      DataStore.setSecondaryCode(secondaryAccessCode);

      // setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");
      navigate('/');

    } catch (error) {
      setLoading(false)
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
  }

  useEffect(()=>{
    if(redirectAvatar){
      setTimeout(()=>{
        navigate("/avatar");
      },5000)
    }
  },[redirectAvatar])

  const backgroundStyle = isDarkMode
  ? {
      backgroundImage: "radial-gradient(circle, #9762b3 0%, #1E034B 70%)"
    }
  : {
      backgroundImage: "radial-gradient(circle, #F8F8FA 0%, #C7DDEA 70%)"
    };

  const checkboxClasses = isDarkMode
    ? "text-black rounded bg-white border-purple-500 accent-white w-5 h-5 appearance-none checked:bg-purple-500 checked:border-0"
    : "text-black rounded bg-gray-200 border-pink-500 accent-white w-5 h-5 appearance-none checked:bg-pink-500 checked:border-0";

  const infoIconClasses = isDarkMode
    ? "text-indigo-600"
    : "text-indigo-600";

  const mainModalBg = isDarkMode
    ? "bg-gradient-to-r from-indigo-900 to-purple-900 text-white"
    : "bg-white text-black";

  const linkClasses = isDarkMode
    ? "text-purple-400 hover:underline"
    : "text-indigo-600 hover:underline";


  const infoPopupBg = isDarkMode
    ? "bg-white text-black"
    : "bg-gradient-to-r from-indigo-900 to-purple-900 text-white";

  const infoPopupCloseButton = isDarkMode
    ? "text-black hover:text-black"
    : "text-white hover:text-white";

  const textClasses = isDarkMode
    ? "text-white"
    : "text-gray-800";

  if(screenLoading){
    return (
      <div className="flex items-center justify-center w-full h-screen bg-white"
      style={backgroundStyle}>
        <Spinner size={50} color='#1e034b' />
      </div>
    );
  }

  if (redirectAvatar) {
    return (
      <div className={`flex items-center justify-center w-full h-screen text-white flex-col`}
      style={backgroundStyle}>
        <p className={`mb-4 text-lg font-bold ${textClasses}`}>You don't have an avatar yet. Redirecting...</p>
        <Spinner size={50} color='#1e034b' />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '99vw',  // Full viewport width
        height: '100vh',  // 3/4 of viewport height
        boxSizing: 'border-box',
        justifyContent:"center",
        flexWrap:"wrap"
      }}
    >
      <ScreenTimeTracker gameId="68096f9615547a91e1c140a1" />
      <iframe
        title="Unity WebGL Game"
        src={`/The Dog Park/index.html?userID=${DataStore.getUserId()}&userName=${DataStore.getUsername()}`}
        style={{
          width: '90vw',
          height: '100vh',
          border: 'none',
          background:"black",
        }}
        allowFullScreen={true}
      ></iframe>

      {
        checkboxPopup2 && (
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

              <h1 className="text-4xl font-bold text-center">{t('age.verification')}</h1>

              <div className="flex justify-center items-center space-x-2 text-lg">
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{t('auth.accessCode')}</p>

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
                {
                  loading ?
                    <Spinner size={20} color='white' style={{ justifySelf: "center" }} /> :
                    t('auth.yes')
                }
              </button>

              <div className="flex justify-center mt-4">
                <img
                  src="/pictures/logoRm.png"
                  alt="Custom image"
                  className="w-full h-30 mt-10"
                />
              </div>
            </div>
          </div>

        )
      }

      {
        checkboxPopup && (
          <>
            <div className={`w-full h-full absolute flex bg-gray-${isDarkMode ? "950" : "100"} opacity-75`} />
            <div className='w-full h-full absolute flex items-center justify-center'>

              <div
                className={`absolute w-full max-w-lg p-8 ${mainModalBg} rounded-lg shadow-lg transition-colors duration-300 item-center`}
                onClick={(e) => e.stopPropagation()}
              >
                <h1 className={`text-3xl font-bold mb-2 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('age.verification')}</h1>
                <div className='flex justify-center'>
                  <p className={`text-lg mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>{t('age.subtitle')}</p>
                  <FaInfoCircle
                    className={`ml-2 text-xl ${infoIconClasses} cursor-pointer transition-colors duration-300`}
                    onClick={() => setShowInfo(!showInfo)}
                  />
                </div>

                <div className="flex items-center mb-4">
                  <div class="inline-flex items-center">
                    <label class="flex items-center cursor-pointer relative" for="ageCheck">
                      <input type="checkbox"
                        checked={isChecked}
                        onChange={toggleCheckbox}
                        class={`peer cursor-pointer rounded shadow hover:shadow-md ${checkboxClasses}`}
                        id="ageCheck" />
                      <span class={`absolute text-${(isDarkMode ? "white" : "black")} opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                          stroke="currentColor" stroke-width="1">
                          <path fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"></path>
                        </svg>
                      </span>
                    </label>
                  </div>
                  <label htmlFor="ageCheck" className={`ml-3 text-xl flex items-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {t('age.checkbox2')}{' '}
                  </label>
                </div>
                <div>
                  <p className={`text-sm text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {t('age.agelimit2')}
                  </p>


                  <p className={`text-sm mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {t('age.subtitle3')}{' '}
                    <a className={linkClasses + " mx-2"} onClick={() => {
                      setCheckBoxPopUp(false)
                      setCheckBoxPopUp2(true)
                    }}>
                      {t('age.access')}
                    </a>

                  </p>
                </div>


                {/* <div className="flex items-center space-x-4 mt-4">
          <div className={`flex-1 border-t ${dividerLineClasses}`}></div>
          <p className={`${dividerTextClasses} text-sm`}>{t('age.login')}</p>
          <div className={`flex-1 border-t ${dividerLineClasses}`}></div>
        </div> */}

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
      {showInfo && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setShowInfo(false)}
        >
          <div
            className={`relative w-full max-w-md p-6 ${infoPopupBg} rounded-lg shadow-lg transition-colors duration-300`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-3 right-3 ${infoPopupCloseButton} transition-colors duration-300`}
              onClick={() => setShowInfo(false)}
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            <h2 className={`text-2xl font-semibold mb-4 ${isDarkMode ? 'text-black' : 'text-white'}`}>{t('age.whyAge')}</h2>
            <p className={isDarkMode ? 'text-black' : 'text-white'}>
              {t('auth.why2')}
            </p>
          </div>
        </div>
      )}
      {
              showWelcome && (
                <div
                  className="flex items-center justify-center flex-col w-full h-screen absolute"
                  style={backgroundStyle}
                >
                  <p className={`text-2xl font-bold mb-4 ${textClasses}`}>
                    Welcome back, explorer!
                  </p>
                  <p className={`text-md mb-2 ${textClasses}`}>
                    {currentMessage}
                  </p>
                  <Spinner size={40} color="#8a2be2" />
                </div>
              )
            }

    </div>
  );
};

export default UnityWebGLDogParkComponent;
