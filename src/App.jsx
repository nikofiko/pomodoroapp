import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './components/Menu'
import Clock from './components/Clock'
import Settings from './components/Settings'

function App() {
  const [settings, setSettings] = useState(false)
  const [clicked, setClicked] = useState('25:00')
  const [pomodoro, setPomodoro] = useState('25:00');
  const [shortbreak, setShortbreak] = useState('5:00');
  const [longbreak, setLongbreak] = useState('15:00')
  const [activeMode, setActiveMode] = useState('pomodoro');
  const [font, setFont] = useState(1);
  const [color, setColor] = useState(1)

  useEffect(() => {
    const root = document.getElementById('root');
    
    root.classList.forEach((className) => {
      if (className.startsWith('font-') || className === 'red' || className === 'blue' || className === 'pink') {
        root.classList.remove(className);
      }
    });

    root.classList.add(`font-${font}`);
    if(color != ''){
      root.classList.add(`${color}`); 
    }
    
  }, [font, color]); 

  return (
    <>
      <Menu clicked={clicked} setClicked={setClicked} pomodoro={pomodoro} shortbreak={shortbreak} longbreak={longbreak} setActiveMode={setActiveMode} activeMode={activeMode}/>
      <Clock settings={settings} setSettings={setSettings} clicked={clicked} setClicked={setClicked} font={font}/>
      <Settings setColor={setColor} setFont={setFont} settings={settings} setSettings={setSettings} pomodoro={pomodoro} shortbreak={shortbreak} longbreak={longbreak} setLongbreak={setLongbreak} setShortbreak={setShortbreak} setPomodoro={setPomodoro} activeMode={activeMode} setClicked={setClicked}/>
    </>
  )
}

export default App
