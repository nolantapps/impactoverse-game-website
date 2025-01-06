import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const UnityWebGLComponent = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        navigate('/'); // Navigate to home when exiting full screen
      }
    };

    // Listen for full-screen changes
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [navigate]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',  // Full viewport width
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Prevent overflow
        backgroundColor: '#000', // Optional: Background color for better visibility
        // padding: 0, // Remove padding
        // margin: 0, // Remove margin
        // boxSizing: 'border-box', // Ensure no extra spacing
      }}
    >
      <iframe
        title="Unity WebGL Game"
        src="/Impactoverse/index.html" // Link to the hosted Unity WebGL build
        width="100%"  // Use full width of the container
        height="100%" // Use full height of the container
        style={{ border: 'none',
          
         }} // Optional: Remove border
        allowFullScreen={true} // Allow full-screen mode
      ></iframe>
    </div>
  );
};

export default UnityWebGLComponent;
