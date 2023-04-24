import { useState } from 'react'
import './TechIcon.css'

type propTypes = {
    name: string,
    image: string,
} 

function TechIcon(props: propTypes) {
    const imgStyle : React.CSSProperties = {}
    const djangoStyle : React.CSSProperties = props.name=='django' ? {position:'relative',left:'-1px', top:'1px'} : {}
    
    const fixName = (name:string) => {
        return name[0].toUpperCase() + name.slice(1) 
    }
    return (
        <div className='tech-icon'>
            <div className='icon-circle'>
                <img src={props.image} height='30' style={{...imgStyle, ...djangoStyle}}/>
            </div>
            {fixName(props.name)}
        </div>
    )
}

export default TechIcon
