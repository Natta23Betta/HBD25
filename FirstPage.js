// FirstPage.js
import React, { useState } from 'react';

const ChristmasTree = ({ size, opacity, left, bottom }) => (
  <div 
    className="absolute"
    style={{ 
      left: `${left}%`, 
      bottom: `${bottom}%`,
      opacity: opacity,
      transform: `scale(${size})`
    }}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 4L4 28H28L16 4Z" fill="#1a472a"/>
      <rect x="14" y="24" width="4" height="4" fill="#4b3621"/>
    </svg>
  </div>
);

const Snowflake = ({ delay }) => {
  const randomLeft = Math.random() * 100;
  const randomDuration = Math.random() * 3 + 2;
  const randomSize = Math.random() * 0.5 + 0.5;

  return (
    <div
      className="absolute top-0 text-white animate-fall"
      style={{
        left: `${randomLeft}%`,
        fontSize: `${randomSize}rem`,
        animationDuration: `${randomDuration}s`,
        animationDelay: `${delay}s`,
      }}
    >
      ❄
    </div>
  );
};

const FirstPage = ({ onSuccess, windowWidth }) => {
  const [password, setPassword] = useState(['', '', '', '', '', '']);
  const [showError, setShowError] = useState(false);

  const handlePasswordChange = (index, value) => {
    if (value.length <= 1) {
      const newPassword = [...password];
      newPassword[index] = value;
      setPassword(newPassword);
      setShowError(false);

      if (value && index < 5) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const checkPassword = () => {
    const enteredPassword = password.join('');
    if (enteredPassword === '251243') {
      onSuccess();
    } else {
      setShowError(true);
      setPassword(['', '', '', '', '', '']);
      const firstInput = document.querySelector('input[data-index="0"]');
      if (firstInput) firstInput.focus();
    }
  };

  const generateTrees = () => {
    const trees = [];
    const numTrees = windowWidth < 768 ? 8 : 15;
    
    for (let i = 0; i < numTrees; i++) {
      trees.push({
        size: Math.random() * 0.5 + 0.8,
        opacity: Math.random() * 0.4 + 0.3,
        left: (i * (100 / numTrees)) + (Math.random() * 10 - 5),
        bottom: Math.random() * 20
      });
    }
    return trees;
  };

  const generateSnowflakes = () => {
    const snowflakes = [];
    const numSnowflakes = windowWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push({
        delay: Math.random() * 5
      });
    }
    return snowflakes;
  };

  return (
    <>
      {/* Background Trees */}
      {generateTrees().map((tree, i) => (
        <ChristmasTree key={`tree-${i}`} {...tree} />
      ))}

      {/* Snowflakes */}
      {generateSnowflakes().map((snowflake, i) => (
        <Snowflake key={`snow-${i}`} {...snowflake} />
      ))}

      <div className="relative max-w-md mx-auto mt-8 md:mt-16">
        <div className="absolute inset-0 flex items-center justify-center text-white text-4xl md:text-8xl font-bold opacity-10 rotate-[-45deg] pointer-events-none whitespace-nowrap">
          HAPPY BIRTHDAY
        </div>
        <div className="bg-white/90 p-6 md:p-8 rounded-2xl shadow-lg text-center relative backdrop-blur-sm">
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 md:mb-8">ลองเดาดูสิ</h1>
          
          <div className="flex justify-center gap-2 mb-6 md:mb-8">
            {password.map((value, index) => (
              <input
                key={index}
                type="password"
                maxLength={1}
                value={value}
                onChange={(e) => handlePasswordChange(index, e.target.value)}
                data-index={index}
                className="w-10 h-10 md:w-12 md:h-12 text-center border-2 border-green-800 rounded-lg text-xl focus:outline-none focus:border-green-900 focus:ring-2 focus:ring-green-500"
              />
            ))}
          </div>

          <button
            onClick={checkPassword}
            className="bg-green-800 text-white px-6 md:px-8 py-3 rounded-lg text-lg font-medium hover:scale-105 transition-transform"
          >
            UNLOCK
          </button>

          {showError && (
            <p className="text-red-500 mt-4">รหัสไม่ถูกต้อง กรุณาลองใหม่</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FirstPage;
