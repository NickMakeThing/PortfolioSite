import { useState } from 'react'
import './ProjectItemLink.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'

type propTypes = {
  type: 'github' | 'video' | 'website',
  link: string
}

function ProjectItemLink(props : propTypes) {
  
  const containerStyle = {background:''} //replace with nchild in css
  const iconStyle = {color:''}
  switch(props.type){
    case 'github':
      containerStyle.background = 'white'
      iconStyle.color = 'black'
      var icon = faGithub
      break;
    case 'video':
      containerStyle.background = 'black'//'#89cff0'
      iconStyle.color = 'white'
      var icon = faPlayCircle //need to replace
      break;
    case 'website':
      containerStyle.background = 'white'
      iconStyle.color = 'black'
      var icon = faEarthAmericas
  }

  return (
    <div className='project-item-link' style={containerStyle}>
         <FontAwesomeIcon icon={icon} size='lg' style={iconStyle} />
    </div>
    
  )
}

export default ProjectItemLink