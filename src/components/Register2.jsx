import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import OtpVerification from './OtpVerification';
import { XIcon, CheckIcon, } from '@heroicons/react/solid';
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Spinner } from 'react-activity';
import "react-activity/dist/Spinner.css"
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
const Register = () => {
  const { t, i18n } = useTranslation();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();
  

  async function sendRequest(address, formData) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await fetch(address, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(responseData)}`);
      }
      return responseData;
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  }


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const formData = {
        email: email.trim().toLowerCase(),
        password: password.trim(),
        emailRedirectTo: "https://ourworldofimpact.com/",
        metadata: {
          user_name: username.trim(),
          language: i18n.language
        }
      };
      const registrationResponse = await sendRequest(
        `${import.meta.env.VITE_PARTNER_BASEURL}/api/auth/register`,
        formData
      );
      if (registrationResponse?.message.includes("Registration successful")) {
        const registrationResponse2 = await sendRequest(
          `${import.meta.env.VITE_BASEURL}/auth/register`,
          {
            username: username.trim(),
            email: email.trim().toLowerCase(),
            userId: registrationResponse.data.user.id.substring(0, 19).trim()
          }
        );
        if (registrationResponse2?.message.toLowerCase().includes("succesfully")) {
          setSuccess("Successfully registered. Please check your email for verification.")
        } else {
          setError(registrationResponse2?.message);
        }
      } else {
        setError(t('register.registerationFailed'));
      }
    } catch (err) {
      // console.error(err?.message);
      if (err?.message.includes("account already exists")) {
        setError("Account already exists, please verify your email or login.")
      } else {
        setError(`Registration failed`);
      }

    } finally {
      setLoading(false);
    }
  };


  const closePopup = () => {
    navigate('/');
  };

  const glassEffect =
    isDarkMode
      ? "bg-dark-background"
      : "bg-light-background";

  const inputBase = "w-full pl-12 py-3 rounded-xl placeholder-btn-color focus:outline-none focus:ring-2 focus:ring-btn-color border border-transparent focus:border-purple-700 transition";
  const darkInputStyle = "bg-[rgba(69,37,99,0.6)] text-white";
  const lightInputStyle = "bg-[rgba(240,235,255,0.6)] text-purple-900";
  const inputStyle = isDarkMode ? darkInputStyle : lightInputStyle;

  const textColor = isDarkMode ? "text-white" : "text-black";

  return (
    <div
      className={`${isDarkMode?'bg-dark-gradient-img':'bg-light-gradient-img'} bg-cover bg-no-repeat fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-0 py-12 md:px-6`}
      
    >
      {/* Close button */}
      <button
        onClick={closePopup}
        className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-purple-400 focus:outline-none"
        aria-label="Close"
      >
        <XIcon className="w-6 h-6" />
      </button>

      {/* Logo */}
      <img
        src="/pictures/logoRm.png"
        alt="Impactoverse Logo"
        className="absolute top-4 sm:top-6 left-4 sm:left-6 h-6 sm:h-8"
      />


      {/* Main content */}

      {
        hasRegistered ?
          <div
            className={`fixed inset-0 z-50 flex  justify-center overflow-y-auto px-0 py-12 md:px-6`}
            style={backgroundStyle}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-purple-400 focus:outline-none"
              aria-label="Close"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* Logo */}
            <img
              src="/pictures/logoRm.png"
              alt="Impactoverse Logo"
              className="absolute top-4 sm:top-6 left-4 sm:left-6 h-6 sm:h-8"
            />

            {/* Pricing Section Only */}
            <div className={` rounded-2xl py-12 px-6 w-full max-w-6xl`}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Pricing Plans</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Find the perfect fit for your journey—from getting started to making a real impact.
                </p>
              </div>

              <div className="grid grid-cols-1 py-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map(({ title, price, note, features, border = '' }) => (
                  <div
                    key={title}
                    className={`flex flex-col justify-between rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-white ${border}`}
                  >
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{note}</p>
                      <p className="text-3xl font-extrabold mb-6">{price}</p>
                      <ul className="space-y-3 text-sm">
                        {features.map(({ label, included }, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            {included ? (
                              <CheckIcon className="h-5 w-5 text-green-500 mt-0.5" />
                            ) : (
                              <XIcon className="h-5 w-5 text-red-400 mt-0.5" />
                            )}
                            <span className={included ? '' : 'line-through text-gray-400 dark:text-gray-500'}>
                              {label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      onClick={() => setSelectedPlan(title)}
                      className={`w-full mt-6 py-2 rounded-lg font-medium transition bg-indigo-600 text-white hover:bg-indigo-700 ${
                        title === 'Explorer'
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {title==='Explorer'? 'Selected':'Select'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          :
          <div className="relative z-10 w-full max-w-5xl bg-transparent grid grid-cols-1 md:grid-cols-2  gap-16 rounded-xl p-12 sm:p-4 gap-4">

            {/* Left marketing column */}
            <div className={`hidden sm:flex flex-col justify-center space-y-6 sm:space-y-8 md:space-y-10 px-4 sm:px-6 md:px-12 ${textColor}`}>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Explore.<br /> Play.<br /> Impact.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed max-w-lg">
                Join a global community driving real-world solutions through immersive technology and creative collaboration.
              </p>
            </div>

            {/* Right form column */}
            <div className={`${glassEffect} rounded-2xl  p-10 mx-16 shadow-lg flex flex-col justify-center ${textColor} md:p-6 mx-0 mt-20 max-w-[25rem]`}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
                {t('register.headline')}
              </h2>

              <form className="space-y-5 sm:space-y-6" onSubmit={handleRegister} noValidate>

                {/* Username */}
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-btn-color" />
                  <input
                    type="text"
                    placeholder={t('register.uName')}
                    minLength={3}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={`${inputBase} ${inputStyle}`}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-btn-color" />
                  <input
                    type="email"
                    placeholder={t('register.emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`${inputBase} ${inputStyle}`}
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-btn-color" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t('register.passwordPlaceholder')}
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

                {/* Error/Success Message */}
                {(success || error) && (
                  <div className={`text-sm uppercase font-medium mt-2 ${success ? 'text-green-400' : 'text-red-400'}`}>
                    {error || success}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-btn-color hover:bg-purple-600 text-white font-extrabold rounded-xl transition"
                >
                  {loading ? <Spinner size={20} color='white' style={{ justifySelf: "center" }} /> : t('register.register')}
                </button>
              </form>

              {/* Terms and Login */}
              <p className={`mt-6 text-xs text-center ${textColor}`}>
                By signing up, you agree to our{' '}
                <a href="/Terms" className="underline text-purple-400 hover:text-purple-300">
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
      }

    </div>

  );

};

export default Register;