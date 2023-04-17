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
  setExpandedItem : React.Dispatch<React.SetStateAction<string | null>>
}
/*
todo:
  + when window is large, the expand animations do some wonkey things because the divs go back to first line when they shrink
      also theres the gap on theleft is still there on any one thats clicked except for the first
*/
function ProjectItem(props: propTypes) {
  const [nameOpacity, setNameOpacity] = useState<React.CSSProperties>({opacity:0})
  const nameStyle : React.CSSProperties = {...nameOpacity, width:'', height:'',transitionDelay:''}
  const itemStyle : React.CSSProperties = {width:'',height:''}
  const aboutStyle : React.CSSProperties = {display:'none'} // try making this state and see if it causes extra render
  const backgroundStyle : React.CSSProperties = {filter:''}
  const thumbnailRef = useRef<HTMLImageElement>(null!)
  const clickHandle = () =>{
    if (props.expandedItem){
      props.setExpandedItem(null)
    } else {
      props.setExpandedItem(props.name)
    }
  }
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
    } else {
        thumbnailRef.current.style.filter = ''
    }
  },[props.expandedItem])

  if (props.expandedItem){
    if (props.expandedItem == props.name){
      aboutStyle.display = 'block'
      itemStyle.width = '450px'
      itemStyle.height = '450px'
      nameStyle.transitionDelay = '0.3s'
      // nameStyle.width = '70%'
      nameStyle.height = '70%'
      nameStyle.opacity = 1
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
          onClick={clickHandle}
          onMouseOver={()=>{hoverHandle(1)}}
          onMouseOut={()=>{hoverHandle(0)}}
          style={backgroundStyle}
          ref={thumbnailRef}
        /> 
        <div className='project-name' style={nameStyle}>
          {props.name}
          <div className='project-about' style={aboutStyle}>
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