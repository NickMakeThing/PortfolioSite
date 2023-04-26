import { useState } from 'react'
import './TechIcon.css'
import icons from '../getTechIcons'

type propTypes = {
    name: string,
    label?: boolean,
} 

function TechIcon(props: propTypes) {
    const imgStyle : React.CSSProperties = {}
    const djangoStyle : React.CSSProperties = props.name=='django' ? {position:'relative',left:'-1px', top:'1px'} : {}
    const fixName = (name:string) => {
        if(props.label){
            return name[0].toUpperCase() + name.slice(1) 
        }
    }
    return (
        <div className='tech-icon'>
            <div className='icon-circle'>
                <img src={icons[props.name]} height='30' style={{...imgStyle, ...djangoStyle}}/>
            </div>
            {fixName(props.name)}
        </div>
    )
}

export default TechIcon
