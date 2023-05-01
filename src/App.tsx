import { useState,useEffect,useRef } from 'react'
import Intro from './components/Intro/Intro'
import ProjectList from './components/ProjectList/ProjectList'
import { adjustContainerPosition, adjustBackground } from './responsiveFunctions'
import './App.css'

  /*
  todo: 
    fix: desktop: when squash window/scroll down, color slash goes wonky
    make so can click anywhere to minimize project items
  */

  // above 1090 wide
  // below 1090 narrow
  // below 640 slim

export type windowForm = {
  width : number,
  height : number
}

function App() {
  const system = navigator.userAgent
  const containerRef = useRef<HTMLDivElement>(null!)
  const separatorRef = useRef<HTMLDivElement>(null!)
  const separatorDimensionsRef = useRef<DOMRect>(null!)
  const [containerPosition, setContainerPosition] = useState<React.CSSProperties>({})
  const [appHeight, setAppHeight] = useState<React.CSSProperties>(
    system.includes('Mobile') ? {height: window.innerHeight} : {}
  )
  const [windowState, setWindowState] = useState<windowForm>({
    width : window.innerWidth,
    height : window.innerHeight 
  })
  
  useEffect(()=>{
    if (system.includes('Mobile')){
      adjustContainerPosition(windowState, containerRef, setContainerPosition)
    }
    window.addEventListener('resize',()=>setWindowState({
      width : window.innerWidth,
      height : window.innerHeight 
    }))
    return () => {
      window.removeEventListener('resize',()=>setWindowState({
        width : window.innerWidth,
        height : window.innerHeight 
      }))
    }
  },[])

  useEffect(()=>{
    adjustBackground(system, containerPosition, separatorDimensionsRef, separatorRef, windowState)
  },[windowState,containerPosition])
  
  //putting the shadow inline fixes an obscure graphical glitch
  const backgroundShadow = {
    filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.6)',
  }
  return (
      <div id='app' style={appHeight}> 
        <div id='main-container' style={containerPosition} ref={containerRef}> 
          <Intro windowWidth={windowState.width}/>
          <div id='separator' ref={separatorRef}></div> 
          <ProjectList/>
        </div>
        <div id='triangle-container' style={backgroundShadow}>
          <div id='triangle'></div>
        </div>
      </div>
  )
}

export default App
