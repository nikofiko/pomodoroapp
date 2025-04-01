import React, { useState } from 'react'
import arrowup from '../assets/images/icon-arrow-up.svg'
import arrowdown from '../assets/images/icon-arrow-down.svg'

const Settings = ({settings, setSettings, pomodoro, shortbreak, longbreak, setPomodoro, setLongbreak, setShortbreak, activeMode, setClicked, setFont, setColor}) => {
  const [color, setLocalColor] = useState('red'); // Lokalny stan dla color
  const [font, setLocalFont] = useState('kum'); // Lokalny stan dla font

  // Funkcja pomocnicza do wyciągania minut z formatu "mm:ss"
  const getMinutes = (time) => {
    const [minutes] = time.split(':');
    return parseInt(minutes);
  };

  // Funkcja formatująca wartość do "mm:ss"
  const formatTime = (minutes) => {
    return `${minutes}:00`; // Zawsze ustawiamy sekundy na 00
  };

  // Handlery dla inputów
  const handlePomodoroChange = (e) => {
    const minutes = parseInt(e.target.value) || 0; // Zapobiegamy NaN
    setPomodoro(formatTime(minutes));
  };

  const handleShortbreakChange = (e) => {
    const minutes = parseInt(e.target.value) || 0;
    setShortbreak(formatTime(minutes));
  };

  const handleLongbreakChange = (e) => {
    const minutes = parseInt(e.target.value) || 0;
    setLongbreak(formatTime(minutes));
  };

  // Handlery dla strzałek
  const adjustPomodoro = (delta) => {
    const currentMinutes = getMinutes(pomodoro);
    const newMinutes = Math.max(0, currentMinutes + delta); 
    setPomodoro(formatTime(newMinutes));
  };

  const adjustShortbreak = (delta) => {
    const currentMinutes = getMinutes(shortbreak);
    const newMinutes = Math.max(0, currentMinutes + delta);
    setShortbreak(formatTime(newMinutes));
  };

  const adjustLongbreak = (delta) => {
    const currentMinutes = getMinutes(longbreak);
    const newMinutes = Math.max(0, currentMinutes + delta);
    setLongbreak(formatTime(newMinutes));
  };

  const handleApply = () => {
    // Aktualizuj clicked na podstawie aktywnego trybu
    if (activeMode === 'pomodoro') {
      setClicked(pomodoro);
    } else if (activeMode === 'shortbreak') {
      setClicked(shortbreak);
    } else if (activeMode === 'longbreak') {
      setClicked(longbreak);
    }
    
    setFont(font);
    setColor(color);

    setSettings(false); // Zamknij ustawienia

    
  };


  return (
    <div className={`flex justify-center absolute z-50 left-0 right-0 top-45 ${settings ? 'block' : 'hidden'}`}>
        <div className='bg-dirtywhite min-w-[540px] pt-[34px] rounded-4xl relative'>
            <div className='flex items-center justify-between px-[40px] pb-[24px]'>
                <h3 className='text-[28px] font-bold text-darkblue'>Settings</h3>
                <div className='pt-2'>
                    <button className='cursor-pointer' onClick={() => setSettings(false)}><svg className='fill-current text-black' xmlns="http://www.w3.org/2000/svg" width="14" height="14" ><path d="M11.95.636l1.414 1.414L8.414 7l4.95 4.95-1.414 1.414L7 8.414l-4.95 4.95L.636 11.95 5.586 7 .636 2.05 2.05.636 7 5.586l4.95-4.95z"/></svg></button>
                </div>
            </div>
            <hr className='text-gray max-w-[535px] ml-0.5'/>
            <h4 className='pt-[24px] pb-[22px] text-[13px] text-darkblue font-bold tracking-[5px] text-start px-[40px]'>TIME (MINUTES)</h4>
            <div className='flex px-[40px] justify-between pb-[24px]'>
                <div className='relative'>
                    <p className='text-start text-[12px] text-[#6c738e] font-bold pb-[5px]'>pomodoro</p>
                    <input onChange={handlePomodoroChange} value={getMinutes(pomodoro)} className='rounded-[8px] max-w-[140px] bg-gray min-h-[48px] font-bold text-[15px] pl-3' type="number" />
                    
                    <div className='flex flex-col gap-[6px] bg-gray absolute top-[37px] right-[15px]'>
                        <button onClick={() => adjustPomodoro(1)} className='cursor-pointer'><img src={arrowup} alt="" /></button>
                        <button onClick={() => adjustPomodoro(-1)} className='cursor-pointer'><img src={arrowdown} alt="" /></button>
                    </div>
                </div>
                <div className='relative'>
                    <p className='text-start  text-[12px] text-[#6c738e] font-bold pb-[5px]'>short break</p>
                    <input onChange={handleShortbreakChange} value={getMinutes(shortbreak)} className='rounded-[8px] max-w-[140px] bg-gray min-h-[48px] font-bold text-[15px] pl-3' type="number"/>

                    <div className='flex flex-col gap-[6px] bg-gray absolute top-[37px] right-[15px]'>
                        <button onClick={() => adjustShortbreak(1)} className='cursor-pointer'><img src={arrowup} alt="" /></button>
                        <button onClick={() => adjustShortbreak(-1)} className='cursor-pointer'><img src={arrowdown} alt="" /></button>
                    </div>
                </div>
                <div className='relative'>
                    <p className='text-start  text-[12px] text-[#6c738e] font-bold pb-[5px]'>long break</p>
                    <input onChange={handleLongbreakChange} value={getMinutes(longbreak)} className='rounded-[8px] max-w-[140px] bg-gray min-h-[48px] font-bold text-[15px] pl-3' type="number"/>

                    <div className='flex flex-col gap-[6px] bg-gray absolute top-[37px] right-[15px]'>
                        <button onClick={() => adjustLongbreak(1)} className='cursor-pointer'><img src={arrowup} alt="" /></button>
                        <button onClick={() => adjustLongbreak(-1)} className='cursor-pointer'><img src={arrowdown} alt="" /></button>
                    </div>
                </div>
            </div>
            <hr className='text-gray max-w-[535px] mx-[40px]'/>
            <div className='px-[40px] flex pt-[24px] justify-between pb-[24px]'>
                <p className='text-[13px] text-darkblue font-bold tracking-[5px] text-start pt-3'>FONT</p>
                <div className='flex gap-[16px]'>
                    <button onClick={() => setLocalFont('kum')} className={`${font === 'kum' ? 'bg-black text-white' : 'text-black bg-gray'} rounded-full min-w-[40px] min-h-[40px] font-bold font-kum cursor-pointer`}>Aa</button>
                    <button onClick={() => setLocalFont('rob')} className={`${font === 'rob' ? 'bg-black text-white' : 'text-black bg-gray'} rounded-full min-w-[40px] min-h-[40px] font-rob cursor-pointer`}>Aa</button>
                    <button onClick={() => setLocalFont('mono')} className={`${font === 'mono' ? 'bg-black text-white' : 'text-black bg-gray'} rounded-full min-w-[40px] min-h-[40px] font-mono cursor-pointer`}>Aa</button>
                </div>
            </div>
            <hr className='text-gray max-w-[535px] mx-[40px]'/>
            <div className='flex justify-between px-[40px] pt-[26px] pb-[50px]'>
                <p className='pb-[22px] text-[13px] text-darkblue font-bold tracking-[5px] text-start pt-4'>COLOR</p>
                <div className='flex items-center gap-[11px]'>
                    <button onClick={() => setLocalColor('red')} className='min-w-[40px] min-h-[40px] bg-red rounded-full cursor-pointer'>{color === 'red' ? '✓': ''}</button>
                    <div className='min-w-[50px] min-h-[50px] border-1 border-gray rounded-full flex items-center justify-center'>
                        <button onClick={() => setLocalColor('blue')} className='min-w-[40px] min-h-[40px] bg-cyan rounded-full cursor-pointer'>{color === 'blue' ? '✓': ''}</button>
                    </div>
                    <button onClick={() => setLocalColor('pink')} className='min-w-[40px] min-h-[40px] bg-pink rounded-full cursor-pointer'>{color === 'pink' ? '✓': ''}</button>
                </div>
            </div>
            <button onClick={handleApply} className='bg-red text-white font-semibold px-[47px] pt-[18px] pb-[18px] absolute -bottom-7 left-[200px] rounded-full cursor-pointer'>Apply</button>
        </div>
    </div>
    
  )
}

export default Settings
