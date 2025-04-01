import React, { useEffect, useState } from 'react';
import settingicon from '../assets/images/icon-settings.svg';

const Clock = ({ settings, setSettings, clicked, pomodoro, shortbreak, longbreak, timer, setClicked, font }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [displayTime, setDisplayTime] = useState(clicked);
  const [initialSeconds, setInitialSeconds] = useState(0);

  const initializeTimer = (time) => {
    const [minutes, seconds] = time.split(':');
    const secondsTotal = parseInt(minutes) * 60 + parseInt(seconds || 0);
    setTotalSeconds(secondsTotal);
    setInitialSeconds(secondsTotal);
    setIsActive(false)
    setDisplayTime(time);
  };

  useEffect(() => {
    initializeTimer(clicked);
    setIsActive(false);
  }, [clicked]);

  useEffect(() => {
    let timerId = null;
    if (isActive && totalSeconds > 0) {
      timerId = setInterval(() => {
        setTotalSeconds((prev) => {
          const newSeconds = prev - 1;
          const minutes = Math.floor(newSeconds / 60);
          const seconds = newSeconds % 60;
          setDisplayTime(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
          
          // Gdy timer dojdzie do 0, zatrzymaj odliczanie
          if (newSeconds <= 0) {
            setIsActive(false); // Zatrzymaj timer
            setDisplayTime('00:00'); // Upewnij się, że wyświetla 00:00
            clearInterval(timerId); // Wyczyść interwał
          }
          
          return newSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isActive]);

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsActive(true);
    }
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const progressPercentage = initialSeconds > 0 ? (totalSeconds / initialSeconds) * 100 : 100;

  // Obwód koła SVG (promień 169.5, obwód = 2 * π * r)
  const strokeWidth = 11;
  const radius = 169.5; // Promień koła (339px / 2)
  const adjustedRadius = radius - strokeWidth / 2; // Dostosowany promień, aby obwódka była wewnątrz
  const circumference = 2 * Math.PI * adjustedRadius; // Obwód koła
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div>
      <div className="flex items-center justify-center pt-[45px]">
        <div className="shadows bg-linear-to-tl from-[#292d56] to-[#101223] tra rounded-full max-w-[410px] min-w-[410px] min-h-[410px] flex items-center justify-center">
          <div className="flex items-center justify-center bg-darkblue border-darkblue border-15 rounded-full min-w-[366px] min-h-[366px] max-w-[366px] max-h-[366px]">
            <div className="relative bg-darkblue flex-col min-w-[339px] min-h-[339px] rounded-full flex items-center justify-center">
              {/* SVG dla obwódki */}
              <svg
                className="absolute"
                width={339 + strokeWidth} // Zwiększamy rozmiar SVG o grubość obwódki
                height={339 + strokeWidth}
                style={{
                  top: `-${strokeWidth / 2}px`, // Przesunięcie, aby obwódka była wyśrodkowana
                  left: `-${strokeWidth / 2}px`,
                  transform: 'rotate(-90deg)', // Obrót SVG, aby zacząć od góry
                }}
              >
                <circle
                  cx={(339 + strokeWidth) / 2} // Środek dostosowany do nowego rozmiaru
                  cy={(339 + strokeWidth) / 2}
                  r={adjustedRadius}
                  fill="none"
                  className="stroke-red blue:stroke-cyan pink:stroke-pink"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
              </svg>
              {/* Zawartość */}
              <div className="relative z-10 flex flex-col">
                <h1 className={`text-[100px] ${font === 'mono' ? 'font-normal tracking-tighter' : 'font-bold'} text-gray cursor-default`}>{displayTime}</h1>
                <button
                  onClick={handleStart}
                  className={`text-gray tracking-[15px] font-bold cursor-pointer hover:text-red ${!isActive ? 'block' : 'hidden'}`}
                >
                  START
                </button>
                <button
                  onClick={handlePause}
                  className={`text-gray tracking-[15px] font-bold cursor-pointer hover:text-red ${isActive ? 'block' : 'hidden'}`}
                >
                  PAUSE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-[63px]">
        <button onClick={() => setSettings(true)} className="cursor-pointer">
          <img src={settingicon} alt="" />
        </button>
      </div>
      <div className={`${settings ? 'overlay' : ''}`}></div>
    </div>
  );
};

export default Clock;