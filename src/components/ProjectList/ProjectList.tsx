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
    blog:'A simple React/Django blog website. The site has list and detail views, which can be switched between without page reloads. It has a search feature that searches by title. The site primarily uses AJAX to deliver content.',
    lightbulb:'This is a fullstack application, which provides remote control and automation of a smart light. The colour picker in this project is notable as it is not an imported component.',
    devops:'This project uses Jenkins, Docker and Kubernetes to automate deployments for when changes in code are made. A simple webpage was built and used to test the pipeline.',
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
              video='https://streamable.com/ax8xlc' 
              repo='https://github.com/NickMakeThing/CrudBlog' 
              about={about.blog} 
              thumbnail={blogThumbnail} 
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              techStack={['react','django','postgres','AWSs3']}
              key='1'
            />
            <ProjectItem name='Lightbulb Controller' 
              video='https://streamable.com/b3h1hy' 
              repo='https://github.com/NickMakeThing/LightController' 
              about={about.lightbulb} 
              thumbnail={lightbulbThumb}
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              techStack={['vue','django']}
              key='2'
            />
            <ProjectItem name='CI with Kubernetes/Jenkins' 
              video='https://streamable.com/oku2gb' 
              repo='https://github.com/NickMakeThing/DevOps-SimpleBlog' 
              about={about.devops} 
              thumbnail={devopsThumb}
              expandedItem={expandedItem}
              clickHandle={clickHandle}
              techStack={['docker','kubernetes','jenkins','bash','githubActions']}
              key='3'
            />
        </div>
    </div>
  )
}

export default ProjectList