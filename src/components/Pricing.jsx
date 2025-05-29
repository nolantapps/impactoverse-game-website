import React, { useEffect, useState } from 'react';
import { CheckIcon, XIcon } from '@heroicons/react/solid';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';  // Import useTranslation
import './i18n';
import { useNavigate } from 'react-router-dom';
const Pricing = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [plans,setPlans] = useState([]);

  const fetchPlans = async()=>{
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/plans`, {
        method: 'GET',
        headers: headers,
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${JSON.stringify(responseData)}`);
      }
      console.log(responseData?.data.plans)
      setPlans(responseData?.data.plans);
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  }

  useEffect(()=>{
    fetchPlans()
  },[])

  async function sendRequest(address, formData,method) {
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


  const handleSubscription = async (planId) => {
    console.log(planId)
    navigate(`/checkout?plan=${planId}`)
    // try {
    //   const formData = {
    //     planId: planId.trim().toLowerCase(),
    //   };
    //   const registrationResponse = await sendRequest(
    //     `${import.meta.env.VITE_PARTNER_BASEURL}/users/update/plan`,
    //     formData
    //   );
    //   if (registrationResponse?.success) {
    //     // Supposed to send you to the payment page
    //   } else {
        
    //   }
    // } catch (err) {
    //   console.error(err?.message);
    // } 
  };

  const getPrice = (price,sponsored,custom,isFree)=>{
    if(price){
      return `€${price}/mo`;
    }else if(sponsored){
      return "Free w/ Verification"
    }else if(custom){
      return "Custom"
    }else if(isFree){
      return `€0/mo`
    }
  }

  const backgroundStyle = isDarkMode
    ? 'bg-dark-gradient'
    : 'bg-light-gradient'


  return (
    <div className={`${backgroundStyle} py-16 px-4`} >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold font-calSans text-gray-900 dark:text-white mb-4">
          Pricing Plans
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Find the perfect fit for your journey—from getting started to making a real impact.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {plans.map(({ _id, title, price, note, features, sponsored = false,custom= false,isFree=false, border = '' }) => (
          <div
            key={title}
            className={`flex flex-col min-w-60  justify-between rounded-2xl shadow-lg p-8 bg-white dark:bg-gray-900 text-gray-800 dark:text-white
               ${title ==="Collaborator" && 'border-2 border-indigo-500'}`}
          >
            <div className='py-4'>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{note}</p>
              <p className="text-3xl font-extrabold mb-6">
                {
                  getPrice(price,sponsored,custom,isFree)
                }
                </p>
              <ul className="space-y-4 text-sm">
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

            <div className="pt-6">
              <button
                onClick={() => handleSubscription(_id)}
                disabled={(title === selectedPlan ? true : false)}
                className={`w-full py-2 rounded-lg font-medium transition ${title === selectedPlan
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
              >
                {title === selectedPlan ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>



  );
};

export default Pricing;
