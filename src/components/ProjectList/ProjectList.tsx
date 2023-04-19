import { useState, useRef, useEffect} from 'react'
import ProjectItem from '../ProjectItem/ProjectItem'
import blogThumbnail from '../../assets/blog_thumb.png'
import devopsThumb from '../../assets/devops_thumb.png'
import lightbulbThumb from '../../assets/lightbulb_thumb.png'

import './ProjectList.css'

function ProjectList() {
  const [expandedItem,setExpandedItem] = useState<string | null>(null)
  const [containerStyle, setContainerStyle] = useState<React.CSSProperties>({})
  /*
  todo:
    add more details in the about sections
  */
  const about = {
    blog:'A simple React/Django blog website. This repo is for the frontend of the site. The site has list and detail views, which the user can switch between without reloading the page. It has a search feature that searches for blog posts by title content. The site primarily uses Ajax for fetching blog data. While this project includes code for both frontend and backend, the focus was mostly on the frontend.',
    lightbulb:'This is a Vue/Django project that enables a user to remotely control the colour of a Genio smart light. The color picker on the frontend is not an imported component and was coded by myself using the JavaScript and the Vue framework.',
    devops:'This project uses Jenkins, Docker and Kubernetes to automate deployments for when changes in code are made. A simple webpage was built and used to test the pipeline.',
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
              repo='https://github.com/NickMakeThing/LightController' 
              about={about.blog} 
              thumbnail={blogThumbnail} 
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              key='1'
            />
            <ProjectItem name='Lightbulb Controller' 
              video='#' 
              repo='https://github.com/NickMakeThing/HealthStrategyFront' 
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