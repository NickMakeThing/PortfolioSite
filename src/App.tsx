import { useState,useEffect, useRef } from 'react'
import Intro from './components/Intro/Intro'
import ProjectList from './components/ProjectList/ProjectList'
import './App.css'

  /*
  todo: 
    clean up components by putting abstracting in functions/files eg IFs below
    background disappears on this sequence of events: make narrow, then maximize window, then make narrow again
    fix: desktop: when squash window/scroll down, color slash goes wonky
      its not due to padding, seems like due to using % and
      likely related to problem where cant see title 
    make so can click anywhere to minimize project items
  */

type windowForm = {
  width : number,
  height : number
}
type stylesType = {
  backgroundShape : React.CSSProperties,
  containerGap : React.CSSProperties,
  separatorShow : React.CSSProperties,
}
  // above 1090 wide
  // below 1090 narrow
  // below 640 slim
function App() {
  const system = navigator.userAgent
  const containerRef = useRef<HTMLDivElement>(null!)
  const separatorRef = useRef<HTMLDivElement>(null!)
  const separatorDimensionsRef = useRef<DOMRect>(null!)
  const [containerPosition, setContainerPosition] = useState<React.CSSProperties>({})
  const [styles,setStyles] = useState<stylesType>({
    backgroundShape:{},
    containerGap:{},
    separatorShow: window.innerWidth < 1090 ? {} : {display:'none'}
  })
  const [windowState, setWindowState] = useState<windowForm>({
    width : window.innerWidth,
    height : window.innerHeight 
  })

  const adjustContainerPosition = () => { 
    let containerDimensions = containerRef.current.getBoundingClientRect()
    let containerTop = containerDimensions.top
    let containerHeight = containerDimensions.height
    
    if(containerTop < 0){
      setContainerPosition({position:'absolute',top:'23px'})
    } else if(containerHeight <= windowState.height && windowState.width > 640) {
      setContainerPosition({})
    }
  }

  useEffect(()=>{
    if (system.includes('Mobile')){
      adjustContainerPosition()
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
    let stylesCopy = {...styles}
    let polygon
    let separatorTop
    let separatorBottom
    
    if (system.includes('Mobile') && containerPosition.top){
      let dimensionsAreSet = separatorDimensionsRef.current
      if(!dimensionsAreSet){
        separatorDimensionsRef.current = separatorRef.current.getBoundingClientRect()
      }
      separatorTop = separatorDimensionsRef.current.top
      separatorBottom = separatorDimensionsRef.current.bottom
    } else {
      let separatorDimensions = separatorRef.current.getBoundingClientRect()
      separatorTop = separatorDimensions.top
      separatorBottom = separatorDimensions.bottom
    }
    if (windowState.width <= 1090){
      // can reduce rerender intensity by using flag that the below code has been done.
      // also reduce rerender by using flag to prevent setStyles firing when not needed
      // may be hard because scaling below 640px
      // may also increase performance by using getelement().style. = instead of relying on state
      
      //current bug of background disappearing after going narrow -> maximize window -> narrow
      // i think caused by this code running when separator still display:none
      polygon = `polygon( 0 0, 102vw 0, 102vw ${separatorTop}px, 0 ${separatorBottom}px )`
      stylesCopy.separatorShow = {display:'block'}
      stylesCopy.containerGap = {gap:'0px'}
    } else {
      stylesCopy.separatorShow = {display:'none'}
      stylesCopy.containerGap = {gap:'30px',height:'455px'}
      polygon = 'polygon( 0 0, 102vw 0, 102vw 80%, 0 110% )'
    }
    stylesCopy.backgroundShape = {clipPath: polygon}
    setStyles(stylesCopy)
    
  },[windowState,containerPosition])// took out separator ref from array
  

  //putting the shadow inline fixes an obscure graphical glitch
  const backgroundContainerStyle = {
    filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.6)',
  }
  const backgroundStyle = {
    ...styles.backgroundShape,
  } 
  const containerStyle = {
    ...containerPosition,
    ...styles.containerGap,
  }
  const appHeight : React.CSSProperties = {}
  if (system.includes('Mobile')){
    appHeight.height = window.innerHeight
  } else {
    appHeight.minHeight = '100vh'
  }
  console.log(windowState,styles.backgroundShape)
  return (
      <div id='app' style={appHeight}> 
        <div id='main-container' style={containerStyle} ref={containerRef}> 
          <Intro windowWidth={windowState.width}/>
          <div id='separator' style={styles.separatorShow} ref={separatorRef}></div> 
          <ProjectList/>
        </div>
        <div id='triangle-container' style={backgroundContainerStyle}>
          <div id='triangle' style={backgroundStyle}></div>
        </div>
      </div>
  )
}

export default App
