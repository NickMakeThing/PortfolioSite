import { useState, useRef, useEffect} from 'react'
import ProjectItem from '../ProjectItem/ProjectItem'
import blogThumbnail from '../../assets/blog_thumb.png'
import devopsThumb from '../../assets/devops_thumb.png'
import lightbulbThumb from '../../assets/lightbulb_thumb.png'

import './ProjectList.css'

function ProjectList() {
  const [expandedItem,setExpandedItem] = useState<string | null>(null)
  const [containerDimensions,setContainerDimensions] = useState<DOMRect | null>(null)
  const containerElement = useRef<HTMLImageElement>(null!)

  useEffect(()=>{
    setContainerDimensions(containerElement.current.getBoundingClientRect())
    //i dont like how this means an extra render is required to render the items
  },[])  

  const about = {
    blog:'',
    lightbulb:'',
    devops:'',
    portfolio:'',
  }

  return (
    <div id='project-list'>
        <div id='project-container' ref={containerElement}>
          {containerDimensions ? 
            [<ProjectItem name='Blog Site' 
              video='#' 
              repo='#' 
              about={about.blog} 
              thumbnail={blogThumbnail} 
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              containerDimensions={containerDimensions}
              key='1'
            />,
            <ProjectItem name='Lightbulb Controller' 
              video='#' 
              repo='#' 
              about={about.lightbulb} 
              thumbnail={lightbulbThumb}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              containerDimensions={containerDimensions}
              key='2'
            />,
            <ProjectItem name='CI with Kubernetes/Jenkins' 
              video='#' 
              repo='#' 
              about={about.devops} 
              thumbnail={devopsThumb}
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              containerDimensions={containerDimensions}
              key='3'
            />]
          : null}
            {/* <ProjectItem name='Portfolio Site' 
              video='#' 
              repo='#' 
              about={about.portfolio} 
              expandedItem={expandedItem}
              setExpandedItem={setExpandedItem}
              containerDimensions={containerDimensions}
            /> */}
        </div>
    </div>
  )
}

export default ProjectList