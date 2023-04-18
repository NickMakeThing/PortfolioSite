import { useState, useEffect, useRef } from 'react'
import ProjectItemLink from '../ProjectItemLink/ProjectItemLink'
import './ProjectItem.css'

type propTypes = { //use context or put in file in same folder and import
  name : string,
  repo : string,
  video : string,
  about : string,
  thumbnail ?: string,
  expandedItem : string | null,
  clickHandle : (name: string) => void,
}
/*
todo:
  bug: about section opacity transition simple does not happen, but opacity does change instantly

  make about section appear after small delay

  make it so clicking anywhere else outside of the items minimizes them back to normal
  
  make it so right column item is pushed to the side instead of going under when clicking on left
*/

function ProjectItem(props: propTypes) {
  const [nameOpacity, setNameOpacity] = useState<React.CSSProperties>({opacity:0})
  const nameStyle : React.CSSProperties = {...nameOpacity}
  const itemStyle : React.CSSProperties = {}
  const aboutStyle : React.CSSProperties = {}
  const backgroundStyle : React.CSSProperties = {}
  const thumbnailRef = useRef<HTMLImageElement>(null!)
  const aboutRef = useRef<HTMLImageElement>(null!)

  const hoverHandle = (opacity : number) => {
    if (!itemStyle.height){
      setNameOpacity({opacity:opacity})
    }
  }

  useEffect(()=>{
    if (props.expandedItem == props.name){
      setTimeout(()=>{ 
        //may want to make it so the blur does not go away here since text is a bit hard to read
        thumbnailRef.current.style.filter = 'blur(0px)'
      },100)
      setTimeout(()=>{ 
        aboutRef.current.style.display = 'block'
      },500)
    } else {
        thumbnailRef.current.style.filter = ''
        aboutRef.current.style.display = ''
    }
  },[props.expandedItem])

  if (props.expandedItem){
    if (props.expandedItem == props.name){
      itemStyle.width = '450px'
      itemStyle.height = '450px'
      itemStyle.zIndex = 100;
      nameStyle.transitionDelay = '0.3s'
      nameStyle.height = '70%'
      nameStyle.opacity = 1
      aboutStyle.opacity = 1
    } else {
      itemStyle.width = '0px'
      itemStyle.height = '0px'
    }
  }

  return (
    <div className='project-item' style={itemStyle}>
        <img 
          className='project-thumbnail' 
          src={props.thumbnail} 
          onClick={() => props.clickHandle(props.name)}
          onMouseOver={()=>{hoverHandle(1)}}
          onMouseOut={()=>{hoverHandle(0)}}
          style={backgroundStyle}
          ref={thumbnailRef}
        /> 
        <div className='project-name' style={nameStyle}>
          {props.name}
          <div className='project-about' style={aboutStyle} ref={aboutRef}>
            {props.about}
          </div>
        </div>
        <div className='project-links'>
          <ProjectItemLink type={'github'} link={props.repo}/>
          <ProjectItemLink type={'video'} link={props.video}/>
          <ProjectItemLink type={'website'} link={props.video}/>
          {/* about button */}
        </div>
        {/* about section */}
    </div>
  )
}

export default ProjectItem