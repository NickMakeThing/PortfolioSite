import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './IntroLink.css'

type propTypes = {
    type: string,
    link: string,
    icon: any, // need to change
} 
function IntroLink(props: propTypes) {
    const clickHandle = () => {
        window.open(props.link)
    }
    let isResumeIcon = props.icon.iconName == 'clipboard'
    const resumeStyle : React.CSSProperties =  isResumeIcon ? {position:'relative', top:'-1px'} : {} 
    const iconStyle : React.CSSProperties = {marginRight:'5px', ...resumeStyle}
    return (
            <div className='intro-link' onClick={clickHandle}> 
                <FontAwesomeIcon icon={props.icon} size='lg' color='rgba(49,51,56,1)' style={iconStyle}/> 
                <span>{props.type}</span>
            </div>
    )
}

export default IntroLink

