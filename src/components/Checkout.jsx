import React, { useEffect, useState } from 'react';
import { FaPaypal, FaStripe, FaCreditCard, FaUser, FaCalendarAlt, FaLock } from "react-icons/fa";
import { CheckIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
import datastore from "./DataStore";

const CheckoutPage = () => {
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(!!datastore.getToken());
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const queryParams = new URLSearchParams(window.location.search);
  const [selectedPlan, setSelectedPlan] = useState(
    {
      title: "Explorer",
      note: "THis it the notes",
      price: 10,
      features: [
        { label: "dasnjkans", included: true }
      ]
    }
  )
  const [showCardForm, setShowCardForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal') // 'paypal' or 'card'

  const getPrice = () => {
    if (selectedPlan.price) {
      return `€${selectedPlan.price}/mo`;
    } else if (selectedPlan.sponsored) {
      return "Free w/ Verification"
    } else if (selectedPlan.custom) {
      return "Custom"
    } else if (selectedPlan.isFree) {
      return `€0/mo`
    }
  }

  const fetchData = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/plans?planId=${queryParams.get('plan')}`, {
        method: 'GET',
        headers: headers,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(responseData)}`);
      }
      setSelectedPlan(responseData?.data.plan);
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!datastore.getToken());
    }, 1000);

    return () => {
      clearInterval(interval);
      setLoading(false);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add logic for payment method integration
    if (paymentMethod === 'paypal') {
      // redirect to PayPal
    } else {
      // process Stripe card payment
    }
  }


  const glassEffect =
    isDarkMode
      ? "bg-dark-primary"
      : "bg-light-primary";
  const backgroundStyle = isDarkMode
    ? {
      backgroundImage: "radial-gradient(circle, #9762b3 0%, #1E034B 70%)"
    }
    : {
      backgroundImage: "radial-gradient(circle, #F8F8FA 0%, #C7DDEA 70%)"
    };

  const inputBase = "w-full pl-12 py-3 rounded-xl placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent focus:border-purple-700 transition";
  const darkInputStyle = "bg-[rgba(69,37,99,0.6)] text-white";
  const lightInputStyle = "bg-[rgba(240,235,255,0.6)] text-purple-900";
  const inputStyle = isDarkMode ? darkInputStyle : lightInputStyle;


  const btnBase = "w-full py-3 rounded-xl font-semibold text-center transition focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent";
  const darkBtnStyle = "bg-purple-800 text-white hover:bg-[rgba(69,37,99,1)]";
  const lightBtnStyle = "bg-[rgba(150,130,255,0.2)] text-purple-900 hover:bg-[rgba(150,130,255,0.3)]";

  const btnStyle = isDarkMode ? darkBtnStyle : lightBtnStyle;
  const textColor = isDarkMode ? "text-white" : "text-black";

  return (
    <div className="min-h-screen bg-[#0F172A] flex justify-center items-center px-4" style={backgroundStyle}>
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-0">
  
        {/* Left - Plan Summary */}
        <div className={`flex flex-col justify-center px-8 py-12 ${textColor}`}>
          <div className="w-full max-w-md mx-auto">
            <p className={`uppercase text-sm font-semibold tracking-widest mb-2 text-gray-400 ${textColor}`}>
              You're subscribing to
            </p>
            <h2 className={`text-3xl font-bold mb-4 ${textColor}`}>{selectedPlan.title} Plan</h2>
            <p className={`text-4xl font-extrabold mb-6 ${textColor}`}>{getPrice()}</p>
            <ul className="space-y-4 text-sm">
              {selectedPlan.features.map((feature, idx) => (
                feature.included && (
                  <li key={idx} className={`flex items-start gap-3 ${textColor}`}>
                    <CheckIcon className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>{feature.label}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </div>
  
        {/* Right - Payment Form (Card Style) */}
        <div className="flex justify-center items-center px-8 py-12">
          <div className={`w-full max-w-md ${glassEffect} shadow-2xl rounded-2xl p-8 ${textColor}`}>
            <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-6 ${textColor}`}>Checkout</h3>
  
            {
              selectedPlan.isFree && !isAuthenticated  ?
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => navigate(`/login`)}
                    className={`pl-0 rounded-xl ${btnBase} ${btnStyle} w-full flex items-center justify-center gap-3 hover:bg-purple-800 text-white font-medium transition`}
                  >
                    Continue to Sign In/Up
                  </button>
                </div> :

                <div className="space-y-4 mb-6">
                  {
                    isAuthenticated?
                    <>
                    <button
                    onClick={() => alert('Redirecting to PayPal...')}
                    className={`pl-0 rounded-xl ${btnBase} ${btnStyle} w-full flex items-center justify-center gap-3 hover:bg-purple-800 ${textColor} font-medium transition`}
                  >
                    <FaStripe className="w-10 h-6" />
                    Pay with Stripe
                  </button>
  
                  <button
                    onClick={() => setShowCardForm(!showCardForm)}
                    className={`pl-0 rounded-xl ${btnBase} ${btnStyle} w-full flex items-center justify-center gap-3 hover:bg-purple-800 ${textColor} font-medium transition`}
                  >
                    <FaCreditCard className="w-6 h-6" />
                    Pay with Credit/Debit Card
                  </button>
                    </>:
                    <button
                    onClick={() => navigate(`/login?return_url=${window.location.pathname}${window.location.search}`)}
                    className={`pl-0 rounded-xl ${btnBase} ${btnStyle} w-full flex items-center justify-center gap-3 hover:bg-purple-800 text-white font-medium transition`}
                  >
                    Continue to Sign In/Up
                  </button>
                  }
                </div>
            }
  
            {showCardForm && (
              <form className="space-y-4 mt-6">
                {/* Cardholder Name */}
                <div className="relative">
                  <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    required
                    className={`pl-12 ${inputBase} ${inputStyle} ${textColor}`}
                  />
                </div>
  
                {/* Card Number */}
                <div className="relative">
                  <FaCreditCard className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Card Number"
                    required
                    className={`pl-12 ${inputBase} ${inputStyle} ${textColor}`}
                  />
                </div>
  
                {/* Expiry & CVC */}
                <div className="flex gap-4">
                  <div className="relative w-1/2">
                    <FaCalendarAlt className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                    <input
                      type="text"
                      placeholder="MM/YY"
                      required
                      className={`pl-12 ${inputBase} ${inputStyle} ${textColor}`}
                    />
                  </div>
                  <div className="relative w-1/2">
                    <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-purple-400" />
                    <input
                      type="text"
                      placeholder="CVC"
                      required
                      className={`pl-12 ${inputBase} ${inputStyle} ${textColor}`}
                    />
                  </div>
                </div>
  
                {/* Submit Button */}
                <button type="submit" className={`${btnBase} ${btnStyle}`}>
                  Complete Payment
                </button>
              </form>
            )}
  
            <p className={`text-xs text-center text-gray-500 dark:text-gray-400 mt-8 ${textColor}`}>
              By continuing, you agree to our{' '}
              <a href="/terms" className={`underline text-gray-600 dark:text-gray-300 ${textColor}`}>Terms</a> &{' '}
              <a href="/privacy" className={`underline text-gray-600 dark:text-gray-300 ${textColor}`}>Privacy Policy</a>.
            </p>
          </div>
        </div>
  
      </div>
    </div>
  );
  
};

export default CheckoutPage;
