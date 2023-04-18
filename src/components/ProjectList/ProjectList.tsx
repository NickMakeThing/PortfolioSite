import { useState, useRef, useEffect} from 'react'
import ProjectItem from '../ProjectItem/ProjectItem'
import blogThumbnail from '../../assets/blog_thumb.png'
import devopsThumb from '../../assets/devops_thumb.png'
import lightbulbThumb from '../../assets/lightbulb_thumb.png'

import './ProjectList.css'

function ProjectList() {
  const [expandedItem,setExpandedItem] = useState<string | null>(null)
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({})
  const about = {
    blog:'About section goes here.',
    lightbulb:'About section goes here.',
    devops:'About section goes here.',
    portfolio:'About section goes here.',
  }

  const clickHandle = (name : string) =>{
    if (expandedItem){
      setExpandedItem(null)
      setContainerStyle({})
    } else {
      setExpandedItem(name)
      setContainerStyle({gap:'0px', gridTemplateColumns: '0px 210px'})
    }
  }

  return (
    <div id='project-list'>
        <div id='project-container' style={containerStyle}>
            <ProjectItem name='Blog Site' 
              video='#' 
              repo='#' 
              about={about.blog} 
              thumbnail={blogThumbnail} 
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              key='1'
            />
            <ProjectItem name='Lightbulb Controller' 
              video='#' 
              repo='#' 
              about={about.lightbulb} 
              thumbnail={lightbulbThumb}
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              key='2'
            />
            <ProjectItem name='CI with Kubernetes/Jenkins' 
              video='#' 
              repo='#' 
              about={about.devops} 
              thumbnail={devopsThumb}
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              key='3'
            />
            {/* <ProjectItem name='Portfolio Site' 
              video='#' 
              repo='#' 
              about={about.portfolio} 
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
            /> */}
        </div>
    </div>
  )
}

export default ProjectList