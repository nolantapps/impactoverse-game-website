// OtpVerification.js
import React, { useState } from 'react';

const OtpVerification = ({ email, onSuccess, onError }) => {
  const [otp, setOtp] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleOtpChange = (e) => {
    // Only allow numeric values in the OTP input
    const value = e.target.value;
    if (/^\d*$/.test(value)) { // Regex to check if input is numeric
      setOtp(value);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim()) {
      onError('OTP cannot be empty.');
      return;
    }

    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      onError('Authentication token not found. Please try registering again.');
      return;
    }

    try {
      const formData = { verificationCode: otp.trim() };
      const verificationResponse = await fetch(
        'https://impactoversefunctionapp.azurewebsites.net/api/VerifyEmail?code=P8nSgrdOVSE7Fl-4kjqBBy1B8dO0WuKNE3aWJh-7HXGeAzFu56g4wQ%3D%3D',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken.trim()}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const responseData = await verificationResponse.json();
      if (verificationResponse.ok && responseData?.protectedProfile?.emailVerified) {
        onSuccess();
      } else {
        onError('Invalid OTP or verification failed. Please check and try again.');
      }
    } catch (err) {
      console.error('Verification Error:', err);
      onError(err.message || 'Verification failed. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      onError('Authentication token not found. Please try registering again.');
      setIsResending(false);
      return;
    }

    try {
      const resendResponse = await fetch(
        'https://impactoversefunctionapp.azurewebsites.net/api/ForgotPassword?code=A2HeSjf4iRZEtfNr8YKVMkZ49k3mfsPhUjI_5aSByuJiAzFuE6T6NA%3D%3D', // Replace with actual resend OTP API code
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedToken.trim()}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (resendResponse.ok) {
        onError('A new OTP has been sent to your email.');
      } else {
        onError('Failed to resend OTP. Please try again later.');
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      onError(err.message || 'Failed to resend OTP. Please try again later.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <p className="mb-4">
        An OTP has been sent to {email}. Please enter it below to complete your registration.
      </p>
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-white">OTP</label>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            required
            inputMode="numeric" // Helps with mobile numeric input
            maxLength="6" // Set max length if OTP is 6 digits
            className="w-full p-2 border rounded mt-1 text-black"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          Verify Email
        </button>
      </form>
      <button 
        onClick={handleResendOtp}
        className="mt-4 text-white hover:text-blue-700 transition-colors"
        disabled={isResending}
      >
        {isResending ? 'Resending OTP...' : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OtpVerification;
