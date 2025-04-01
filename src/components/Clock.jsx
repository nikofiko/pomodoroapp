import React, { useEffect, useState } from 'react';
import settingicon from '../assets/images/icon-settings.svg';

const Clock = ({ settings, setSettings, clicked, pomodoro, shortbreak, longbreak, timer, setClicked, font }) => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [displayTime, setDisplayTime] = useState(clicked);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [containerSize, setContainerSize] = useState(250);
  const strokeWidth = 11;

  const initializeTimer = (time) => {
    const [minutes, seconds] = time.split(':');
    const secondsTotal = parseInt(minutes) * 60 + parseInt(seconds || 0);
    setTotalSeconds(secondsTotal);
    setInitialSeconds(secondsTotal);
    setIsActive(false);
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
          
          if (newSeconds <= 0) {
            setIsActive(false);
            setDisplayTime('00:00');
            clearInterval(timerId);
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

  const updateSize = () => {
    const isLargeScreen = window.innerWidth >= 1024; 
    setContainerSize(isLargeScreen ? 339 : 250);
  };

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);


  const progressPercentage = initialSeconds > 0 ? (totalSeconds / initialSeconds) * 100 : 100; 
  const radius = containerSize / 2;
  const adjustedRadius = radius - strokeWidth / 2; 
  const circumference = 2 * Math.PI * adjustedRadius;
  const strokeDashoffset = ((100 - progressPercentage) / 100) * circumference;

  return (
    <div>
      <div className="flex items-center justify-center pt-[45px]">
        <div className="shadows bg-linear-to-tl from-[#292d56] to-[#101223] tra rounded-full lg:max-w-[410px] min-w-[300px] max-w-[300px] lg:min-w-[410px] lg:min-h-[410px] min-h-[300px] flex items-center justify-center">
          <div className="flex items-center justify-center bg-darkblue border-darkblue border-15 rounded-full lg:min-w-[366px] lg:min-h-[366px] lg:max-w-[366px] lg:max-h-[366px] min-w-[267px] min-h-[267px] max-w-[267px] max-h-[267px]">
            <div className="relative bg-darkblue flex-col lg:min-w-[339px] lg:min-h-[339px] min-w-[255px] min-h-[255px] rounded-full flex items-center justify-center">
              {/* SVG dla obwódki */}
              <svg
                className="absolute"
                width={containerSize} 
                height={containerSize}
                style={{
                  transform: 'rotate(-90deg)', 
                }}
              >
                <circle
                  cx={containerSize / 2} 
                  cy={containerSize / 2}
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
              <div className="relative z-10 flex flex-col items-center">
                <h1 className={`text-[70px] lg:text-[100px] ${font === 'mono' ? 'font-normal tracking-tighter' : 'font-bold'} text-gray cursor-default`}>{displayTime}</h1>
                <button
                  onClick={handleStart}
                  className={`text-gray tracking-[15px] font-bold cursor-pointer hover:text-red hover:blue:text-cyan hover:pink:text-pink ${!isActive ? 'block' : 'hidden'}`}
                >
                  START
                </button>
                <button
                  onClick={handlePause}
                  className={`text-gray tracking-[15px] font-bold cursor-pointer hover:text-red hover:blue:text-cyan hover:pink:text-pink ${isActive ? 'block' : 'hidden'}`}
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