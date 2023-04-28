import { useState } from 'react'
import Intro from './components/Intro/Intro'
import ProjectList from './components/ProjectList/ProjectList'
import './App.css'

function App() {
  const system = navigator.userAgent
  const triangleStyle : React.CSSProperties = {}
  const mobileBrowser = false
  if (system.includes('Mobile') && !system.includes('DuckDuckGo')){
    triangleStyle.clipPath = 'polygon( 0 0, 102vw 0, 102vw 82%, 0 86% )'
  } else if (system.includes('DuckDuckGo')) {
    triangleStyle.clipPath = 'polygon( 0 0, 102vw 0, 102vw 73%, 0 77% )'
  }
  return (
      <div id='app'> 
        <div id='main-container'>
          <Intro />
          <ProjectList />
        </div>
        <div id='triangle-container'>
          <div id='triangle' style={triangleStyle}></div>
        </div>
      </div>
  )
}

export default App
