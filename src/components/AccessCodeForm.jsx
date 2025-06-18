import { useEffect, useState } from "react";
import axios from "axios";
import datastore from "./DataStore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, SquareAsterisk, KeySquare } from "lucide-react";
import { XIcon, } from "@heroicons/react/solid";
import { useTheme } from "./ThemeContext";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import './i18n';
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css"
import DataStore from "./DataStore";

const AccessCodeForm = () => {
  const { t } = useTranslation();
  const [mainCode, setMainCode] = useState("");
  const [secondaryCode, setSecondary] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const queryParams = new URLSearchParams(window.location.search);
  const returnURL = queryParams.get("return_url");

  const handleAuthentication = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/auth/loginWithCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          primary: mainCode,
          secondary: secondaryCode,
        }),
      });

      if (!response.ok) {
        setLoading(false)
        throw new Error('Invalid codes');
      }

      const data = await response.json();
      datastore.setToken(data.token);

      datastore.setDisplayName(mainAccessCode);
      datastore.setIsChild(true);
      datastore.setPrimaryCode(mainCode);
      datastore.setSecondaryCode(secondaryCode);
      datastore.setUsername(data.username);
      datastore.setUserId(mainAccessCode);
      setErrorMessage("");
      navigate('/');
      
    } catch (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    } finally{
      setLoading(false)
    }

  };

  const closePopup = () => {
    navigate('/');
  };

  const textColor = isDarkMode ? "text-white" : "text-black";

  const glassEffect =
    isDarkMode
      ? "bg-dark-background backdrop-blur-xl"
      : "bg-light-background backdrop-blur-xl";

  const inputBase = "w-full pl-12 py-3 rounded-xl placeholder-btn-color focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent focus:border-btn-color transition";
  const darkInputStyle = "bg-[rgba(69,37,99,0.6)] text-white";
  const lightInputStyle = "bg-[rgba(240,235,255,0.6)] text-btn-color";
  const inputStyle = isDarkMode ? darkInputStyle : lightInputStyle;


  return (
    <div className={`${isDarkMode?'bg-dark-gradient-img':'bg-light-gradient-img'} bg-cover bg-no-repeat fixed inset-0 z-50 flex items-center justify-center  px-0 py-12 md:px-6 overflow-y-auto`} >
      <button
        onClick={closePopup}
        className={`absolute top-6 right-6 ${isDarkMode?'text-white hover:text-btn-color':'text-btn-color hover:text-dark-primary'}  focus:outline-none`}
        aria-label="Close"
      >
        <XIcon className="w-6 h-6" />
      </button>
      <img
        src="/pictures/logoRm.png"
        alt="Impactoverse Logo"
        className="absolute top-6 left-6 text-white h-8"
      />

      <div className="relative z-10 w-full max-w-5xl bg-transparent grid grid-cols-1 md:grid-cols-2  gap-16 rounded-xl p-12 sm:p-4 gap-4">
        {/* Left marketing column */}
        <div className={`hidden sm:flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10 px-4 sm:px-6 md:px-12 ${textColor}`}>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Explore.<br /> Play.<br /> Impact.
          </h1>
          <p className="text-lg leading-relaxed max-w-lg">
            Continue your journey of making a difference with cutting-edge tools and a network of changemakers.
          </p>
        </div>

        {/* Right form column */}
        <div className={`${glassEffect} rounded-2xl  p-10 mx-16 shadow-lg flex flex-col justify-center ${textColor} md:p-6 mx-0 mt-20 max-w-[24rem]`}>
          <h2 className="text-3xl font-bold mb-8 text-center">
            {t('login.headline')}
          </h2>


          <form className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleAuthentication();
            }}
            noValidate>

            <div className="relative">
              <KeySquare className="absolute left-4 top-1/2 transform -translate-y-1/2 text-btn-color" />
              <input
                type="text"
                value={mainCode}
                placeholder={t('auth.mainAccess')}
                onChange={(e)=>setMainCode(e.target.value)}
                required
                className={`${inputBase} ${inputStyle}`}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-btn-color" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t('auth.secondaryAcces')}
                value={secondaryCode}
                onChange={(e) => setSecondary(e.target.value)}
                required
                className={`${inputBase} ${inputStyle}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {(successMessage || errorMessage) && (
              <div className={`mb-4 text-left text-sm uppercase font-medium mt-6 font-semibold  ${successMessage ? 'text-green-400 ' : 'text-red-400'}`}>
                {errorMessage}{successMessage}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-btn-color hover:bg-purple-600 text-white font-extrabold rounded-xl transition"
            >
              {loading ? <Spinner size={20} color='white' style={{ justifySelf: "center" }} /> : t('login.login')}
            </button>
          </form>

          {/* Terms and login */}
          <p className={`mt-6 text-xs text-center ${textColor}`}>
            By signing in, you agree to our{' '}
            <a href="/Terms" className="underline text-btn-color hover:text-purple-300">
              Terms of Service
            </a>
          </p>
          <p className={`mt-4 text-center ${textColor}`}>
            Already have an account?{' '}
            <a href="/login" className="underline font-semibold hover:text-purple-300">
              {t('login.login')}
            </a>
          </p>
        </div>
      </div>
    </div>

  );
};

export default AccessCodeForm;
