import { useState, useEffect, useRef } from 'react'
import IntroLink from '../IntroLink/IntroLink'
import TechIcon from '../TechIcon/TechIcon'
import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import './Intro.css'

type windowForm = 'wide'|'narrow'
function Intro() {
    // could make this way shorter by just setting state to the width in useEffect
    // and then a single if statement that decides the content
    const [windowState, setWindowState] = useState<windowForm>(
        window.innerWidth > 1090 ? 'wide' : 'narrow'
    )
    const textBasedOnScreenWidth = () => {
        if (windowState == 'narrow') {
            return 'scrolling down and clicking the images'
        } else {
            return 'clicking the images on the right'
        }
    }
    // using ref so event listener can see state updates
    const windowStateRef = useRef(windowState)
    const setStateForListener = (state : windowForm) => {
        windowStateRef.current = state
        setWindowState(state)  
    }
    const adjustContent = (windowWidth : number) =>{ 
        if (windowWidth <= 1090 && windowStateRef.current != 'narrow'){
            setStateForListener('narrow')
        } else if (windowWidth > 1090 && windowStateRef.current != 'wide'){
            setStateForListener('wide')      
        }
    }
    useEffect(()=>{
        adjustContent(window.innerWidth,)
        window.addEventListener('resize',()=>adjustContent(window.innerWidth));
        return () => {
          window.removeEventListener('resize',()=>adjustContent(window.innerWidth));
        };
        
    },[])
    var a = navigator.userAgent.split(';')
    console.log(a)
    return (
        <div id='intro'> 
            <h1 id='intro-heading'>
                Nick's Web Development Portfolio
                {/* {window.innerWidth} */}
            </h1>
            {/* {navigator.userAgent} */}
            <div id='intro-details'>
                <p id='description'>
                    Learn about my personal projects by {textBasedOnScreenWidth()}. Listed below this paragraph are some tools that my skillset includes. More skills and project details can be found in my resume.
                </p>
                <div id='skill-set'>
                    <TechIcon name='python' label={true} />
                    <TechIcon name='typescript' label={true} />
                    <TechIcon name='react' label={true} />
                    <TechIcon name='vue' label={true} />
                    <TechIcon name='nginx' label={true} />
                    <TechIcon name='postgres' label={true} />
                    <TechIcon name='django' label={true} />
                    <TechIcon name='bash' label={true} />
                </div>
                <div id='intro-links'>
                    <IntroLink type={'Github'} icon={faGithub} link={'https://github.com/NickMakeThing'}/>
                    <IntroLink type={'Resume'} icon={faClipboard} link={'https://healthstrategy.s3.ap-southeast-2.amazonaws.com/Nick_Segal_Resume.pdf'}/>
                </div>
            </div>
        </div>
    )
}

export default Intro