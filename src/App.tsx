import { useState } from 'react'
import Intro from './components/Intro/Intro'
import ProjectList from './components/ProjectList/ProjectList'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id='app'> 
      <Intro />
      <ProjectList />
    </div>
  )
}

export default App
