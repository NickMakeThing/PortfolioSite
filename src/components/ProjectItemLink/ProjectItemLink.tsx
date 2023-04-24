import { useState } from 'react'
import './ProjectItemLink.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEarthAmericas, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'

type propTypes = {
  type: 'github' | 'video' | 'website',
  link: string
  scaleLinks: boolean
}

type linkStyles = {
  name: React.CSSProperties,
  containerExpand: boolean,
}
/*
todo:
  make .link-name margin double when props.scaleLinks == true
*/
function ProjectItemLink(props : propTypes) {
  const [linkStyles,setLinkStyles] = useState<linkStyles>({
    name:{},
    containerExpand:false
  })

  const mouseOverHandle = ()=>{
    //find the shorthand for doing this
    const linkStylesCopy = {...linkStyles}
    const fontSize = props.scaleLinks ? '210%' : ''
    const marginLeft = props.scaleLinks ? '7px' : ''
    linkStylesCopy.name = {visibility:'visible',fontSize,marginLeft} 
    linkStylesCopy.containerExpand = true
    setLinkStyles(linkStylesCopy)
  }
  const mouseLeaveHandle = ()=>{
    const linkStylesCopy = {...linkStyles}
    linkStylesCopy.name = {}
    linkStylesCopy.containerExpand = false
    setLinkStyles(linkStylesCopy)
  }
  
  const getLinkDimensions = (expandedWidth : string) => {
    const containerStyle : React.CSSProperties = {width:'25px',height:'25px'}
    if (props.scaleLinks) {
      containerStyle.width = '50px'
      containerStyle.height = '50px'
    }
    if (linkStyles.containerExpand) {
      containerStyle.width = expandedWidth
    }
    return containerStyle
  }

  const iconStyle = () => {
    const iconStyle : React.CSSProperties = {
      transition:'height 0.3s, width 0.3s', 
      width:'25px', 
      height:'25px',
      fontSize:'',
    }
    if (props.scaleLinks){
      iconStyle.width = '50px'
      iconStyle.height = '50px'
    }
    return iconStyle
  }

  switch(props.type){
    case 'github':
      var icon = faGithub
      var containerStyle = getLinkDimensions('36%')
      break;
    case 'video':
      var icon = faPlayCircle //need to replace
      var containerStyle = getLinkDimensions('33%')
      break;
    case 'website':
      var icon = faEarthAmericas
      var containerStyle = getLinkDimensions('41%')
  }

  return (
    <div className='project-item-link' 
      style={containerStyle}
      onMouseOver={mouseOverHandle}
      onMouseLeave={mouseLeaveHandle}>
        <FontAwesomeIcon icon={icon} size='lg' style={iconStyle()}/> 
        <span className='link-name' style={linkStyles.name}>
          {props.type}
        </span> 
         {/* code, demo, link */}

    </div>
    
  )
}

export default ProjectItemLink