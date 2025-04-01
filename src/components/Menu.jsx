import React, { useState } from 'react'
import logo from '../assets/images/logo.svg'

const Menu = ({clicked, setClicked, pomodoro, shortbreak, longbreak, setActiveMode, activeMode}) => {

  return (
    <div className='flex flex-col justify-center pt-[48px]'>
      <div className='flex justify-center'>
        <img src={logo} alt="" />
      </div>
      <div className='flex justify-center'>
        <div className='flex bg-darkblue max-w-[387px] rounded-full mt-[47px] py-[8px] px-[7px] z-10'>
            <div>
                <button onClick={() => {setClicked(pomodoro); setActiveMode('pomodoro');}} className={`cursor-pointer text-[14px] font-bold ${(activeMode == 'pomodoro') ? 'bg-red blue:bg-cyan pink:bg-pink text-black' : 'bg-darkblue text-[#6c738e] hover:text-dirtywhite'} px-[26px] pt-[13px] pb-[14px] rounded-full`}>pomodoro</button>
            </div>
            <div>
                <button onClick={() => {setClicked(shortbreak); setActiveMode('shortbreak');}} className={`cursor-pointer font-bold text-[14px] ${(activeMode == 'shortbreak') ? 'bg-red blue:bg-cyan pink:bg-pink text-black' : 'bg-darkblue text-[#6c738e] hover:text-dirtywhite'} px-[10px] pt-[13px] pb-[14px] rounded-full`}>short break</button>
            </div>
            <div>
                <button onClick={() => {setClicked(longbreak); setActiveMode('longbreak');}} className={`cursor-pointer text-[14px] ${(activeMode == 'longbreak') ? 'bg-red blue:bg-cyan pink:bg-pink text-black' : 'bg-darkblue text-[#6c738e] hover:text-dirtywhite'} font-bold px-[26px] pt-[13px] pb-[14px] rounded-full`}>long break</button>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Menu
