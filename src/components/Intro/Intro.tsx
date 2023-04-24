import { useState } from 'react'
import IntroLink from '../IntroLink/IntroLink'
import TechIcon from '../TechIcon/TechIcon'

import pythonImg from '../../assets/python.svg'
import reactImg from '../../assets/react.svg'
import typescriptImg from '../../assets/typescript.svg'
import vueImg from '../../assets/vue.svg'
import nginxImg from '../../assets/nginx.svg'
import postgresImg from '../../assets/postgres.svg'
import djangoImg from '../../assets/django.svg'
import bashImg from '../../assets/bash.svg'

import { faClipboard } from '@fortawesome/free-regular-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'


import './Intro.css'



function Intro() {
  return (
    <div id='intro'> 
        <h1 id='intro-heading'>
            Nick's Web Development Portfolio
        </h1>
        <div id='intro-details'>
            <p id='description'>
                Learn about my personal projects by clicking the images on the right. Listed below this paragraph are some tools that my skillset includes. More skills and project details can be found in my resume.
            </p>
            <div id='skill-set'>
                <TechIcon image={pythonImg} name='python' />
                <TechIcon image={typescriptImg} name='typescript' />
                <TechIcon image={reactImg} name='react' />
                <TechIcon image={vueImg} name='vue' />
                <TechIcon image={nginxImg} name='nginx' />
                <TechIcon image={postgresImg} name='postgres' />
                <TechIcon image={djangoImg} name='django' />
                <TechIcon image={bashImg} name='bash' />
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