// page.js
import React, { useState, useEffect } from 'react';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

const BirthdayWebsiteDemo = () => {
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-900 to-green-700 p-4 relative overflow-hidden">
      <style>
        {`
          @keyframes fall {
            from {
              transform: translateY(-100vh) rotate(0deg);
            }
            to {
              transform: translateY(100vh) rotate(360deg);
            }
          }
          .animate-fall {
            animation: fall linear infinite;
          }
        `}
      </style>

      {showFirstPage ? (
        <FirstPage 
          onSuccess={() => setShowFirstPage(false)}
          windowWidth={windowWidth}
        />
      ) : (
        <SecondPage 
          onBack={() => setShowFirstPage(true)}
        />
      )}
    </div>
  );
};

export default BirthdayWebsiteDemo;
