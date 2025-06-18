import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTheme } from './ThemeContext';
import DataStore from './DataStore';
import { useTranslation } from 'react-i18next';
import './i18n';
import { Spinner } from 'react-activity';

const ChangePassword = () => {
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // Retrieve email from session storage 
    const storedEmail = DataStore.getEmail();
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post(
        'https://impactoversefunctionapp.azurewebsites.net/api/ForgotPassword?code=A2HeSjf4iRZEtfNr8YKVMkZ49k3mfsPhUjI_5aSByuJiAzFuE6T6NA%3D%3D',
        { email }
      );

      setSuccessMessage('An OTP has been sent to your email.');
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post(
        `${import.meta.env.VITE_PARTNER_BASEURL}/api/auth/reset-password`,
        {
          new_password: newPassword
        },
        {
          headers:{
            "Authorization":`Bearer ${DataStore.getToken()}`
          }
        }
      );

      setSuccessMessage('Your password has been reset successfully!');
      setStep(2);
    } catch (error) {
      console.error('Error recovering password:', error);
      setErrorMessage(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };



  const handleBackgroundClick = () => {
    navigate('/');
  };

  // Theme-specific classes
  const modalClasses = isDarkMode
    ? 'bg-opacity-20 backdrop-blur-lg bg-gradient-to-r from-indigo-900 to-purple-900 text-white'
    : 'bg-opacity-90 backdrop-blur-lg bg-gradient-to-r from-gray-100 to-white text-gray-800';

  const inputClasses = isDarkMode
    ? 'w-full p-3 border border-gray-600 rounded-md bg-white text-black cursor-not-allowed'
    : 'w-full p-3 border border-gray-300 rounded-md bg-white text-black cursor-not-allowed';

  const primaryButtonClasses = isDarkMode
    ? 'w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300'
    : 'w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300';

  const secondaryButtonClasses = isDarkMode
    ? 'w-full p-3 text-white hover:text-purple-400 transition-colors duration-300'
    : 'w-full p-3 text-gray-800 hover:text-purple-600 transition-colors duration-300';

  const closeButtonClasses = isDarkMode
    ? 'absolute top-3 right-3 text-gray-200 hover:text-gray-400 transition-colors duration-300'
    : 'absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-colors duration-300';

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-20">
      <div 
        className={`relative max-w-md w-full ${modalClasses} rounded-lg shadow-lg rounded-2xl p-8 transition-colors duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={closeButtonClasses}
          onClick={handleBackgroundClick}
          aria-label="Close forgot password popup"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-semibold text-center mb-4">Change Password</h2>

        {errorMessage && (
          <p className="text-red-400 text-center bg-red-900 bg-opacity-20 p-2 rounded-md mb-4">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-400 text-center bg-green-900 bg-opacity-20 p-2 rounded-md mb-4">
            {successMessage}
          </p>
        )}

        {step === 1 && (
          <form onSubmit={handlePasswordRecovery} className="space-y-6">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={inputClasses.replace('cursor-not-allowed', '')}
              />
            </div>
            <button type="submit" className={primaryButtonClasses}>
              {
                loading?
                <Spinner size={20} color='white' style={{ justifySelf: "center" }} />:
                t('forgotPassword.reset')
              }
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold">Success!</h3>
            <p>Your password has been reset. You can now log in with your new password.</p>
            {/* <button onClick={() => navigate('/login')} className={`mt-4 ${primaryButtonClasses}`}>
              Go to Login
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;