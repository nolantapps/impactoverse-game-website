import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import OtpVerification from './OtpVerification';
import { XIcon } from '@heroicons/react/solid';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
const Register = () => {
  const {t} = useTranslation();
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [platformType, setPlatformType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  async function sendRequest(address, formData, token) {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token.trim()}`;
      }
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
    setError('');
    setSuccess('');
    try {
      const formData = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        platformType: platformType.trim() || 'WEB',
      };
      const registrationResponse = await sendRequest(
        'https://impactoversefunctionapp.azurewebsites.net/api/RegisterWithEmail?code=L6craJtPOpITvx2XVaHKnZ0oxOl3aj4KfexV5cKsZDSBAzFuKnQ8XA%3D%3D',
        formData
      );
      if (registrationResponse?.protectedProfile?.sessionToken) {
        const newToken = registrationResponse.protectedProfile.sessionToken;
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
        setIsOtpSent(true);
        setSuccess(t('register.pleaseEnterOtp'));
      } else {
        setError(t('register.registerationFailed'));
      }
    } catch (err) {
      console.error('Registration Error:', err);
      setError(`Registration failed: ${err.message}`);
    }
  };

  const handleOtpSuccess = () => {
    setSuccess(t('register.emailVerified'));
    localStorage.removeItem('authToken');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleOtpError = (errorMsg) => {
    setError(errorMsg);
  };

  const closeOtpPopup = () => {
    setIsOtpSent(false);
  };

  const closePopup = () => {
    navigate('/');
  };

  const handleResendOtp = async () => {
    setError('');
    setSuccess('');
    try {
      const formData = {
        email: email.trim().toLowerCase(),
      };
      const resendResponse = await sendRequest(
        'https://impactoversefunctionapp.azurewebsites.net/api/ForgotPassword?code=A2HeSjf4iRZEtfNr8YKVMkZ49k3mfsPhUjI_5aSByuJiAzFuE6T6NA%3D%3D',
        formData
      );
      if (resendResponse?.success) {
        setSuccess(t('register.otpResent'));
      } else {
        setError(t('register.otpFailed'));
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      setError(`Resend OTP failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={closePopup}>
      <div 
        className={`w-full max-w-md p-8 rounded-lg shadow-lg relative transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-indigo-900 to-purple-900 text-white' 
            : 'bg-white text-gray-800'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <XIcon 
          className={`w-6 h-6 absolute top-4 right-4 cursor-pointer transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300 hover:text-gray-400' : 'text-gray-600 hover:text-gray-700'
          }`}
          onClick={closePopup} 
        />

        <h2 className={`text-3xl font-bold mb-4 text-center transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>{t('register.headline')}</h2>
        
        <p className={`text-sm text-center mb-6 transition-colors duration-300 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>{t('register.subtitle')}</p>
        
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}

        {!isOtpSent ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>{t('register.uName')}</label>
              <input
                id="username"
                type="text"
                placeholder={t('register.uNamePlaceholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full px-4 py-2 mt-1 rounded-lg  focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-300 ${
                  isDarkMode ? 'bg-white text-black' : 'bg-white text-gray-900 border border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>{t('register.email')}</label>
              <input
                id="email"
                type="email"
                placeholder={t('register.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-300 ${
                  isDarkMode ? 'bg-white text-black' : 'bg-white text-gray-900 border border-gray-300'
                }`}
              />
            </div>
            <div>
              <label htmlFor="password" className={`block text-sm font-medium transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>{t('register.password')}</label>
              <input
                id="password"
                type="password"
                placeholder={t('register.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full px-4 py-2 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-colors duration-300 ${
                  isDarkMode ? 'bg-white text-black' : 'bg-white text-gray-900 border border-gray-300'
                }`}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-[#7E11D1] transition-colors mt-4"
            >
              {t('register.register')}
            </button>
            <button 
              type="button"
              onClick={() => navigate('/login')}
              className={`w-full py-3 mt-2 text-center rounded-lg font-semibold transition-colors duration-300 ${
                isDarkMode 
                  ? 'text-white border border-[#6A0DAD] hover:bg-[#6A0DAD]' 
                  : 'text-indigo-600 border border-[#6A0DAD] hover:bg-indigo-600 hover:text-white'
              }`}
            >
               {t('register.login')}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <OtpVerification email={email} onSuccess={handleOtpSuccess} onError={handleOtpError} />
          </div>
        )}

        {/* <div className={`flex justify-center mt-6 text-sm transition-colors duration-300 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <p>{t('register.loginWith')}</p>
        </div> */}
        
        {/* <div className="flex justify-center space-x-4 mt-4">
          <button className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'
          }`}>
            <span className="sr-only">Log in with Google</span>
            <img src="/icons/googleBlack.svg" alt="Google" className="h-6 w-6" />
          </button>
          <button className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md'
          }`}>
            <span className="sr-only">Log in with Facebook</span>
            <img src="/icons/fbBlack.svg" alt="Facebook" className="h-6 w-6" />
          </button>
        </div> */}

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

export default Register;