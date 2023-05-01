import React from 'react'
import { windowForm } from './App'

type adjustContainerTypes = (
    windowState : windowForm,
    containerRef : {
        current : HTMLDivElement
    },
    setContainerPosition : React.Dispatch<React.SetStateAction<React.CSSProperties>>
) => void

export const adjustContainerPosition : adjustContainerTypes = (windowState,containerRef,setContainerPosition) => { 
    let containerDimensions = containerRef.current.getBoundingClientRect()
    let containerTop = containerDimensions.top
    let containerHeight = containerDimensions.height
    
    if(containerTop < 0){
      setContainerPosition({position:'absolute',top:'23px'})
    } else if(containerHeight <= windowState.height && windowState.width > 640) {
      setContainerPosition({})
    }
  }

type adjustBackgroundTypes = ( 
    system : string,
    containerPosition : React.CSSProperties,
    separatorDimensionsRef : React.MutableRefObject<DOMRect>,
    separatorRef : React.MutableRefObject<HTMLDivElement>,
    windowState : windowForm
) => void

// makes grey slash background go down to separator div after adjustContainerPosition() has run
// uses document.getElement instead of state to improve performance
// uses ts instead of css for more control
export const adjustBackground : adjustBackgroundTypes = (system, containerPosition, separatorDimensionsRef, separatorRef, windowState) => {
    let separatorTop
    let separatorBottom
    if (system.includes('Mobile') && containerPosition.top){
      let dimensionsAreSet = separatorDimensionsRef.current
      if(!dimensionsAreSet){
        separatorDimensionsRef.current = separatorRef.current.getBoundingClientRect()
      }
      // background still a bit off in opera, despite fix
      let operaFix = system.includes('OPR') ? 10 : 0
      separatorTop = separatorDimensionsRef.current.top + operaFix
      separatorBottom = separatorDimensionsRef.current.bottom + operaFix
    } else {
      let separatorDimensions = separatorRef.current.getBoundingClientRect()
      separatorTop = separatorDimensions.top
      separatorBottom = separatorDimensions.bottom
    }
    
    if (windowState.width <= 1090){
      let polygon = `polygon( 0 0, 102vw 0, 102vw ${separatorTop}px, 0 ${separatorBottom}px )`
      document.getElementById('triangle')!.style.clipPath = polygon 
    } else {
      document.getElementById('triangle')!.style.clipPath = ''
    }
}