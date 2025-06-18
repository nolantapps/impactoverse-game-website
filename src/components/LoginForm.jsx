import { useEffect, useState } from "react";
import axios from "axios";
import datastore from "./DataStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "./ThemeContext";
import Cookies from "js-cookie";
import { useTranslation } from 'react-i18next';
import './i18n';
import { Spinner } from "react-activity";

const LoginForm = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleLogin = async (formData) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {

      const response = await fetch(`${import.meta.env.VITE_PARTNER_BASEURL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error)
      }

      const result = await response.json();

      const rawJson = JSON.stringify(result);

      console.log("Raw JSON saved in sessionStorage:", rawJson);
      Cookies.set("isChild", "false", { expires: 3 });
      console.log("Data saved in cookies");


      const response1 = await fetch(`${import.meta.env.VITE_BASEURL}/data/profile`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${result.data.session.access_token}`
        },
        body: JSON.stringify({ email,userId: result.data.user.id.substring(0, 19) })
      });

      if (!response1.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse)
        setErrorMessage(errorResponse.message);
      }

      const result2 = await response1.json()

      datastore.setEmail(email);
      datastore.setUserId(result.data.user.id.substring(0, 19));
      datastore.setToken(result.data.session.access_token);

      datastore.setDisplayName((!result.data.user.user_metadata.full_name? email.split("@")[0] : result.data.user.user_metadata.full_name));
      datastore.setUsername(result2.data.username);
      sessionStorage.setItem("isChild", "false");

      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage("");

      navigate('/');
    } catch (err) {
      if (err?.error.includes("login credentials")) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else if (err?.error.includes("not confirmed")) {
        setErrorMessage("Please confirm email first before loggin in.");
      } else {
        setErrorMessage("Something went wrong, Contact Support.");
      }

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
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
              autoComplete=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t('login.emailPlaceholder')}
              className={`w-full p-2.5 md:p-3 rounded-md border ${inputClasses} text-sm md:text-base transition-colors duration-300`}
            />
          </div>
          <div className="relative">
            <label className={`block mb-1 text-sm font-medium ${textColor}`}>
              {t('login.password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder={t('login.passwordPlaceholder')}
                className={`w-full p-2.5 md:p-3 rounded-md border ${inputClasses} text-sm md:text-base transition-colors duration-300 pr-10`}
              />

              {/* Show/Hide Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          <div>
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
            {loading ? <Spinner size={20} color='white' style={{ justifySelf: "center" }} /> : t('login.login')}
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
            className=" w-full h-30 mt-10"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
