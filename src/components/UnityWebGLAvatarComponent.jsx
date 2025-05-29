import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './i18n'
import DataStore from './DataStore';

const UnityWebGLAvatarComponent = () => {
  const containerRef = useRef(null);

  const navigate = useNavigate();

  const isFirstStatus = async() =>{
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
  
    if(status === 'first'){
      const response = await fetch(`${import.meta.env.VITE_BASEURL}/data/update/avatar`,{
        method:"POST",
        headers: {
          "Authorization":`Bearer ${DataStore.getToken()}`
        }
      });

      if(!response.ok){
        console.error("Failed to post data")
      }
    }
  }


  useEffect(() => {
    if(!DataStore.getToken()){
      navigate("/")
    }
    isFirstStatus()
  })  

  return (
    <div
    ref={containerRef}
    className="flex w-full h-[90vh] bg-black box-border"
  >
    <iframe
      title="Avatar"
      src={`/The Impactoverse Avatar System/index.html?userID=${DataStore.getUserId()}&userName=${DataStore.getUsername()}`}
      className="w-full h-full border-none max-w-full max-h-full"
      allowFullScreen
    ></iframe>
  </div>
  );
};

export default UnityWebGLAvatarComponent;
