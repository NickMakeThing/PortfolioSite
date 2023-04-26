import { useState, useEffect, useRef } from 'react'
import ProjectItemLink from '../ProjectItemLink/ProjectItemLink'
import './ProjectItem.css'
import TechIcon from '../TechIcon/TechIcon'

type propTypes = { //use context or put in file in same folder and import
  name : string,
  repo : string,
  video : string,
  website ?: string,
  about : string,
  thumbnail ?: string,
  expandedItem : string | null,
  clickHandle : (name: string) => void,
  techStack : string[],
}
/*
todo:

  make it so clicking anywhere else outside of the items minimizes them back to normal
  
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

  const createIconArray = () => {
    return props.techStack.map(iconName => {
      let id : string = iconName + Math.random() 
      return <TechIcon name={iconName} key={id}/>
    })
  }

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
            <div className='project-stack'>
              {createIconArray()}
            </div>
          </span>
        </div>
        <div className='project-links'>
          <ProjectItemLink type={'github'} link={props.repo} scaleLinks={scaleLinks}/>
          <ProjectItemLink type={'video'} link={props.video} scaleLinks={scaleLinks}/>
          {props.website ? <ProjectItemLink type={'website'} link={props.website} scaleLinks={scaleLinks}/> : ''}
        </div>
        
    </div>
  )
}

export default ProjectItem