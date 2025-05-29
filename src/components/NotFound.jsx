import React from "react";
import { useTheme } from './ThemeContext';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
  return (
    <section className={`${isDarkMode ? 'bg-[#1E034B] text-gray-100' : 'bg-[#C7DDEA] text-gray-900'}`}>
      
      <div style={{ padding: "50px",justifySelf:"center",justifyItems:'center' }}>
      <img 
          src="https://img.icons8.com/?size=100&id=WH7R5bFjNRRp&format=png&color=000000" 
          alt="404 Not Found" 
          style={{ maxWidth: "100%", height: "auto",justifySelf:"center",marginBottom:"2rem"}} 
        />
        <div style={{ fontSize: "1.5em",color:(isDarkMode?"#cecece":"black") }}>Oops! The page you're looking for doesn't exist.</div>
        <button className={`mt-6 px-8 py-3 rounded-full ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white'} hover:bg-indigo-700`}
        onClick={()=>navigate("/")}>
          Go Back Home
        </button>
      </div>
    </section>
  );
};

export default NotFound;
