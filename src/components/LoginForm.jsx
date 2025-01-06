import { useEffect, useState } from "react";
import axios from "axios";
import datastore from "./DataStore";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import './i18n';

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleLogin = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      console.log("API Call Started");
      const response = await axios.post(
        "https://impactoversefunctionapp.azurewebsites.net/api/LoginWithEmail?code=YMMsxkA5pj1enia4i5rBttyD-UmTmwAEPh6CbiMLxM3zAzFuOvzuDw%3D%3D",
        formData
      );

      console.log("API Call Completed");

      const rawJson = JSON.stringify(response.data);
      datastore.setUserInSessionStorage(rawJson);

      console.log("Raw JSON saved in sessionStorage:", rawJson);

      Cookies.set("user", JSON.stringify(response.data), { expires: 1 });
      Cookies.set("isChild", "false", { expires: 1 });

      console.log("Data saved in cookies");

      datastore.setToken(response.data.protectedProfile.sessionToken);
      datastore.setEmail(response.data.id);
      datastore.setDisplayName(response.data.publicProfile.displayName);
      datastore.setPasswordInCookies(formData.password);
      sessionStorage.setItem("isChild", "false");

      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");

      navigate('/');
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const textColor = isDarkMode ? "text-white" : "text-black";

  const modalBg = isDarkMode
    ? "bg-gradient-to-r from-indigo-900 to-purple-900"
    : "bg-white";

  const inputClasses = isDarkMode
    ? "bg-white border-purple-500 text-black placeholder-gray-400 focus:ring-purple-600"
    : "bg-white border-black text-black placeholder-gray-500 focus:ring-pink-500";

  const forgotPasswordClasses = isDarkMode
    ? "text-white hover:text-purple-300"
    : "text-black hover:text-pink-500";

  const submitButtonClasses = isDarkMode
    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
    : "bg-indigo-500 hover:bg-indigo-700 text-white";

  const registerLinkClasses = isDarkMode
    ? "text-white hover:text-purple-300"
    : "text-black hover:text-pink-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        className={`relative w-full max-w-md p-6 md:p-8 ${modalBg} rounded-lg shadow-lg transition-colors duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => navigate('/')} 
          className={`absolute top-4 right-4 ${textColor} hover:${textColor} focus:outline-none`}
        >
          <span className="text-xl font-bold">×</span>
        </button>

        <h2 className={`text-2xl md:text-3xl font-bold mb-2 text-center ${textColor}`}>{t('login.headline')}</h2>
        <p className={`mb-6 md:mb-8 text-center text-sm md:text-base ${textColor}`}>{t('login.subtitle')}</p>

        {successMessage && (
          <p className="text-green-500 mb-4 text-center text-sm md:text-base">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mb-4 text-center text-sm md:text-base">{errorMessage}</p>
        )}

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin({ email, password });
          }} 
          className="space-y-4 md:space-y-6"
        >
          <div>
            <label className={`block mb-1 text-sm font-medium ${textColor}`}>{t('login.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('login.emailPlaceholder')}
              className={`w-full p-2.5 md:p-3 rounded-md border ${inputClasses} text-sm md:text-base transition-colors duration-300`}
            />
          </div>
          <div>
            <label className={`block mb-1 text-sm font-medium ${textColor}`}>{t('login.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t('login.passwordPlaceholder')}
              className={`w-full p-2.5 md:p-3 rounded-md border ${inputClasses} text-sm md:text-base transition-colors duration-300`}
            />
            <div className="text-right mt-2">
              <Link to='/forgot'>
                <span className={`text-xs md:text-sm ${forgotPasswordClasses} cursor-pointer transition-colors duration-300`}>
                {t('login.forgot')}
                </span>
              </Link>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 md:py-3 ${submitButtonClasses} font-semibold transition-colors duration-300 text-sm md:text-base rounded-md`}
          >
            {loading ? t('login.loggingIn') : t('login.login')}
          </button>
        </form>

        <div className="mt-4 text-4xl text-center">
          <Link to='/register'>
            <span className={`text-xl font-bold md:text-sm ${registerLinkClasses} hover:underline cursor-pointer transition-colors duration-300`}>
            {t('login.register')}
            </span>
          </Link>
        </div>

        <div className="flex justify-center mt-4">
          <img 
            src="/pictures/logoRm.png" 
            alt="Custom image" 
            className="ml-10 w-full h-32" 
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
