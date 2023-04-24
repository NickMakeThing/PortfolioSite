import { useState } from 'react'
import Intro from './components/Intro/Intro'
import ProjectList from './components/ProjectList/ProjectList'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
      <div id='app'> 
        <Intro />
        <ProjectList />
        <div id='triangle-container'>
          <div id='triangle'></div>
        </div>
      </div>
  )
}

export default App
