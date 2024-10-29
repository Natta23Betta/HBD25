// SecondPage.js
import React, { useState, useEffect, useRef } from 'react';

const SecondPage = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Auto play music when component mounts
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Audio autoplay failed:", error);
      });
      setIsPlaying(true);
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-xl md:max-w-2xl mx-auto mt-8 md:mt-16">
      <div className="bg-white/95 p-6 md:p-8 rounded-2xl shadow-lg text-center backdrop-blur-sm">
        <div className="flex justify-end mb-4">
          <button
            onClick={togglePlay}
            className="bg-green-800 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
          >
            {isPlaying ? '🔇' : '🔊'}
          </button>
        </div>

        <audio
          ref={audioRef}
          loop
          src="/birthday-song.mp3"  // Make sure to add your audio file in the public folder
          className="hidden"
        />

        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
          🎉 HAPPY BIRTHDAY 🎉
        </h1>
        
        <div className="text-base md:text-lg text-gray-700 space-y-4 mb-6 md:mb-8">
          <p className="text-xl md:text-2xl font-medium">สุขสันต์วันเกิด</p>
          <p>
            ขอให้มีความสุขมากๆ ใช้ชีวิตอย่างที่ตัวเองเชื่อ<br />
            สุขภาพแข็งแรง ร่ำรวยเงินทองและสุขภาพ<br />
            อย่าเจ็บอย่าป่วย<br />
            รักที่สุดในโลกจากคนขายปลา ❤️
          </p>
        </div>

        <div className="mb-6 md:mb-8">
          <div className="relative w-full h-48 md:h-64 bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src="/api/placeholder/400/320"
              alt="Birthday"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button className="bg-white/80 p-2 rounded-full hover:bg-white">
                ◀
              </button>
              <button className="bg-white/80 p-2 rounded-full hover:bg-white">
                ▶
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-800"></div>
            <div className="w-2 h-2 rounded-full bg-green-300"></div>
            <div className="w-2 h-2 rounded-full bg-green-300"></div>
          </div>
        </div>

        <button
          onClick={onBack}
          className="bg-green-800 text-white px-5 md:px-6 py-2 md:py-3 rounded-lg text-base md:text-lg font-medium hover:scale-105 transition-transform"
        >
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
};

export default SecondPage;
