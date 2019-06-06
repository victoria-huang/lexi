import React from 'react'
import { FaGithub, FaLinkedin, FaEnvelopeSquare } from 'react-icons/fa'

const Footer = () => (
    <div 
        className='footer flex' 
        style={{ 
            alignItems: 'center', 
            justifyContent: 'space-between' 
        }}
    >
        <span>lexi, &#169; 2019</span>
        <span>
            created by &nbsp;
            <a href="https://victoriahuang.me" target="_blank" rel="noopener noreferrer">
                victoria huang
            </a>
        </span>
        <span className='flex'>
            <a href="https://github.com/victoria-huang/lexi" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1vh' }}>
                <FaGithub size={ 15 } />
            </a>
            <a href="https://www.linkedin.com/in/huang-victoria/" target="_blank" rel="noopener noreferrer" style={{ marginRight: '1vh' }}>
                <FaLinkedin size={ 15 } />
            </a>
            <a href="mailto:hello@victoriahuang.me">
                <FaEnvelopeSquare size={ 15 } />
            </a>
        </span>
    </div>
)

export default Footer