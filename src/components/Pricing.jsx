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
  const [plans,setPlans] = useState(
    [
      {
          "_id": "683455bff79840ceb4c1315a",
          "title": "Explorer",
          "price": null,
          "note": "General User - Get started for free",
          "features": [
              {
                  "_id": "68502d11714067ab4201e881",
                  "label": "Single-player access only",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e882",
                  "label": "Explore all public spaces",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e883",
                  "label": "Basic avatars and badges",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e884",
                  "label": "Profile and leaderboard",
                  "included": true
              }
          ],
          "isFree": true
      },
      {
          "_id": "683455f9f79840ceb4c1315b",
          "title": "Collaborator",
          "price": 10,
          "note": "Includes everything in Explorer and adds:",
          "features": [
              {
                  "_id": "68502d11714067ab4201e885",
                  "label": "Multiplayer support (when available)",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e886",
                  "label": "Up to 20 access codes/month",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e887",
                  "label": "Max 10 concurrent users",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e888",
                  "label": "Text, voice, presentation tools (limited)",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e889",
                  "label": "Customisation of 1 dedicated area",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e88a",
                  "label": "Upload cap: 1GB/month (50MB max file size, MP4 supported)",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e88b",
                  "label": "Support with onboarding",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e88c",
                  "label": "Analytics",
                  "included": true
              }
          ]
      },
      {
          "_id": "683456bdf79840ceb4c1315c",
          "title": "Connector",
          "price": 39,
          "note": "Includes everything in Collaborator and adds:",
          "features": [
              {
                  "_id": "68502d11714067ab4201e88d",
                  "label": "Up to 100 access codes/month",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e88e",
                  "label": "Max 50 concurrent users",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e88f",
                  "label": "Text, voice, presentation tools (limited)",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e890",
                  "label": "Customisation of 4 dedicated areas",
                  "included": true
              },
              {
                  "_id": "68502d11714067ab4201e891",
                  "label": "Upload cap: 10GB/month (50MB max file size, MP4 supported)",
                  "included": true
              }
          ]
      }
  ]
  );

  
  

  const handleSubscription = async (planId) => {
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
    ? 'bg-dark-gradient-img'
    : 'bg-light-gradient-img'


  return (
    <div className={`${backgroundStyle} pt-[10rem] pb-[5rem] px-4 bg-no-repeat bg-cover min-h-screen`} >
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
