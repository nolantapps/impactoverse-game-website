import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';
import './i18n';
const ForgotPassword = () => {
  const { t } = useTranslation(); 
  const { isDarkMode } = useTheme();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        'https://impactoversefunctionapp.azurewebsites.net/api/RecoverPassword?code=9ZF2WOOTx9rwybqHGNWp1j1sTvsY0PPHTqN_6KXV4dJbAzFuwb83YA%3D%3D',
        {
          email,
          password: newPassword,
          otp
        }
      );

      setSuccessMessage('Your password has been reset successfully!');
      setStep(3);
    } catch (error) {
      console.error('Error recovering password:', error);
      setErrorMessage('Invalid OTP or recovery failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axios.post(
        'https://impactoversefunctionapp.azurewebsites.net/api/ForgotPassword?code=A2HeSjf4iRZEtfNr8YKVMkZ49k3mfsPhUjI_5aSByuJiAzFuE6T6NA%3D%3D',
        { email }
      );
      setSuccessMessage('OTP resent successfully! Please check your email.');
    } catch (error) {
      console.error('Error resending OTP:', error);
      setErrorMessage('Failed to resend OTP. Please try again.');
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
    ? 'w-full p-3 border border-gray-600 rounded-full bg-white text-black '
    : 'w-full p-3 border border-gray-300 rounded-full bg-white text-black ';

  const primaryButtonClasses = isDarkMode
    ? 'w-full p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300'
    : 'w-full p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300';

  const secondaryButtonClasses = isDarkMode
    ? 'w-full p-3 text-white hover:text-purple-400 transition-colors duration-300'
    : 'w-full p-3 text-gray-800 hover:text-purple-600 transition-colors duration-300';

  const closeButtonClasses = isDarkMode
    ? 'absolute top-3 right-3 text-gray-200 hover:text-gray-400 transition-colors duration-300'
    : 'absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-colors duration-300';

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm">
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

        <h2 className="text-3xl font-semibold text-center mb-4">  {t('forgotPassword.heading')}</h2>
        <p className="text-center mb-6">{t('forgotPassword.subtitle')}</p>

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
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">{t('forgotPassword.email')}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
            <button type="submit" className={primaryButtonClasses}>
            {t('forgotPassword.sendOtp')}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePasswordRecovery} className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium">{t('forgotPassword.otp')}</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium">{t('forgotPassword.newPassword')}</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className={inputClasses}
              />
            </div>
            <button type="submit" className={primaryButtonClasses}>
            {t('forgotPassword.reset')}
            </button>
            <button type="button" onClick={handleResendOtp} className={secondaryButtonClasses}>
            {t('forgotPassword.resendOtp')}
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="text-center">
            <h3 className="text-lg font-semibold">{t('forgotPassword.success')}</h3>
            <p>{t('forgotPassword.successSubtitle')}</p>
            <button onClick={() => navigate('/login')} className={`mt-4 ${primaryButtonClasses}`}>
            {t('forgotPassword.login')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;