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
  add blur or something behind the text without bluring all of the thumbnail

  remove static height of about section and make it only as big as the amount of text requires
    otherwise center the text without ruining the transition
  
  bug: about section opacity transition simple does not happen, but opacity does change instantly

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
  const nameRef = useRef<HTMLImageElement>(null!)
  const aboutRef = useRef<HTMLImageElement>(null!)
  var scaleLinks = false

  const hoverHandle = (opacity : number) => {
    if (!itemStyle.height){
      setNameOpacity({opacity:opacity})
    }
  }

  useEffect(()=>{
    if (props.expandedItem == props.name){
      setTimeout(()=>{ 
        thumbnailRef.current.style.filter = 'blur(0px)'
      },100)
    } else {
        thumbnailRef.current.style.filter = ''
    }
  },[props.expandedItem])

  
  if (props.expandedItem){
    if (props.expandedItem == props.name){
      scaleLinks = true
      itemStyle.width = '450px'
      itemStyle.height = '450px'
      itemStyle.zIndex = 100;
      nameStyle.transitionDelay = '0.3s'
      nameStyle.height = '50%'
      nameStyle.opacity = 1
      nameStyle.backdropFilter='blur(10px)'
      aboutStyle.marginTop = '10px'
      aboutStyle.opacity = 1
    } else {
      itemStyle.width = '0px'
      itemStyle.height = '0px'
    }
  } else {
    aboutStyle.transitionDelay = '0s'
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
        <div className='project-name' style={nameStyle} ref={nameRef}>
          {props.name}
          <span className='project-about' style={aboutStyle} ref={aboutRef}>
            {props.about}
          </span>
        </div>
        <div className='project-links'>
          <ProjectItemLink type={'github'} link={props.repo} scaleLinks={scaleLinks}/>
          <ProjectItemLink type={'video'} link={props.video} scaleLinks={scaleLinks}/>
          <ProjectItemLink type={'website'} link={props.video} scaleLinks={scaleLinks}/>
          {/* about button */}
        </div>
        {/* about section */}
    </div>
  )
}

export default ProjectItem